/**
 * =====================================================================
 * GOOGLE APPS SCRIPT - ASHLYN EDU WEB ORDER & AUTO-FULFILLMENT
 * =====================================================================
 * 
 * FITUR LENGKAP:
 * 1. Menerima pesanan baru otomatis dari web toko ke tab "Kirim Pesan"
 * 2. Memasukkan link akses produk digital ke Kolom K secara otomatis
 * 3. Menghitung usia pesanan & menandai pesanan "Menunggu Pembayaran" > 24 jam
 * 4. Fungsi pengingat otomatis (bisa dipasang Trigger harian / jam)
 * 
 * CARA MEMASANG:
 * 1. Buka Google Sheets baru di Google Drive Anda (https://sheets.new)
 * 2. Beri nama file: "Ashlyn Edu - Database Pesanan"
 * 3. Ganti nama Sheet1 menjadi: "Kirim Pesan"
 * 4. Buka menu: Extensions (Ekstensi) > Apps Script
 * 5. Hapus semua kode bawaan, lalu paste seluruh kode di file ini.
 * 6. Klik tombol "Deploy" (Terapkan) > "New deployment" (Penerapan baru)
 *    - Jenis: Web app (Aplikasi Web)
 *    - Execute as: Me (email Anda)
 *    - Who has access: Anyone (Siapa saja, bahkan anonim)
 * 7. Salin "Web App URL" (akhiran /exec) dan simpan di Mode Admin toko.
 */

const TOKEN = "ASHLYN_EDU_SECRET_TOKEN_2026"; // Ganti jika diperlukan
const SHEET_NAME = "Kirim Pesan";

// Database Link Akses Resmi Produk Digital
const PRODUCT_ACCESS_LINKS = {
  "pkkm bikin stres???": "https://generator-pkkm.pages.dev/",
  "aplikasi pembuat rpp guru": "https://edusuite-ai.pages.dev/",
  "study notes": "https://studynotes-miniest.pages.dev/",
  "lkpd gamification ai": "https://lkpd-gamification.toko-ashlyn.workers.dev/",
  "asisten guru pintar: guru mapel, wali kelas, guru ekskul harus coba!!": "https://asistenguru.toko-ashlyn.workers.dev/",
  "asisten guru pintar": "https://asistenguru.toko-ashlyn.workers.dev/",
  "prompt lkpd sekali beli untuk selamanya": "https://lkpd-ai.pages.dev/",
  "aplikasi guru piket": "https://portalgurupiket.toko-ashlyn.workers.dev/",
  "inklusi studio untuk guru bk": "https://inklusistudio.pages.dev/",
  "prompt generator rpp all-in (semua jenjang)": "https://rpp-newgen.pages.dev/",
  "prompt generator rpp all-in": "https://rpp-newgen.pages.dev/",
  "prompt ai rpp kbc+pm (smp only)": "https://rpp-pmkbc.pages.dev/",
  "prompt ai rpp kbc+pm": "https://rpp-pmkbc.pages.dev/"
};

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No data received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);

    // Validasi token keamanan
    if (data.token !== TOKEN) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Unauthorized token" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const rawMessage = data.pesan || "";
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Jika tab Kirim Pesan belum ada, buat otomatis beserta header
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Tanggal & Waktu",
        "Nama Pemesan",
        "Nomor WhatsApp",
        "Email",
        "Rincian Produk",
        "Total Bayar",
        "Metode Pembayaran",
        "Pesan Lengkap (Raw)",
        "Status Bayar",
        "Status Kirim Akses",
        "Link Akses Produk",
        "Status Pengingat 24 Jam"
      ]);
      sheet.getRange("A1:L1").setFontWeight("bold").setBackground("#F4ECE1");
    }

    // Parsing data dari format teks WhatsApp otomatis
    const now = new Date();
    const formattedDate = Utilities.formatDate(now, "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss");

    let nama = "-";
    let wa = "-";
    let email = "-";
    let total = "-";
    let paymentMethod = "-";

    const namaMatch = rawMessage.match(/Nama:\s*(.+)/i);
    if (namaMatch) nama = namaMatch[1].trim();

    const waMatch = rawMessage.match(/WhatsApp:\s*([0-9+]+)/i);
    if (waMatch) wa = waMatch[1].trim();

    const emailMatch = rawMessage.match(/Email Akses:\s*(.+)/i);
    if (emailMatch) email = emailMatch[1].trim();

    const totalMatch = rawMessage.match(/TOTAL BAYAR:\s*(.+)/i) || rawMessage.match(/TOTAL:\s*(.+)/i);
    if (totalMatch) total = totalMatch[1].trim();

    const payMatch = rawMessage.match(/Metode Bayar:\s*(.+)/i);
    if (payMatch) paymentMethod = payMatch[1].trim();

    // Rincian produk & pencarian Link Akses
    let produkList = [];
    let linkAksesList = [];
    const lines = rawMessage.split("\n");
    let capturingItems = false;
    for (let line of lines) {
      if (line.includes("Rincian Pesanan:")) {
        capturingItems = true;
        continue;
      }
      if (capturingItems && line.startsWith("━")) {
        capturingItems = false;
        break;
      }
      if (capturingItems && line.trim() && /^[0-9]+\./.test(line.trim())) {
        const itemLine = line.trim();
        produkList.push(itemLine);

        // Cari kecocokan link akses
        const cleanedName = itemLine.replace(/^[0-9]+\.\s*/, '').split('(')[0].trim().toLowerCase();
        for (let key in PRODUCT_ACCESS_LINKS) {
          if (cleanedName.includes(key) || key.includes(cleanedName)) {
            linkAksesList.push(itemLine.split('(')[0].trim() + ": " + PRODUCT_ACCESS_LINKS[key]);
            break;
          }
        }
      }
    }
    const rincianProduk = produkList.length > 0 ? produkList.join("; ") : "-";
    const directLinks = linkAksesList.length > 0 ? linkAksesList.join("\n") : "-";

    // Simpan baris baru ke sheet
    sheet.appendRow([
      formattedDate,
      nama,
      wa,
      email,
      rincianProduk,
      total,
      paymentMethod,
      rawMessage,
      "Menunggu Pembayaran",
      "Belum Dikirim",
      directLinks,
      "Normal (< 24 Jam)"
    ]);

    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      message: "Pesanan berhasil dicatat dan link akses telah ditautkan." 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    "Webhook Google Sheets Ashlyn Edu aktif dan siap menerima data pesanan."
  ).setMimeType(ContentService.MimeType.TEXT);
}

/**
 * FUNGSI OTOMATIS: Memeriksa Pesanan Menggantung > 24 Jam
 * 
 * Cara Mengaktifkan Trigger Waktu:
 * 1. Di editor Apps Script, klik ikon jam (Triggers / Pemicu) di panel kiri.
 * 2. Klik "+ Add Trigger" (+ Tambahkan Pemicu)
 * 3. Pilih fungsi: "cekDanTandaiPesananMenggantung24Jam"
 * 4. Pilih event source: "Time-driven" (Berdasarkan waktu)
 * 5. Pilih tipe: "Hour timer" (setiap jam) atau "Day timer" (setiap hari sekali)
 * 6. Klik Simpan. Google Sheets akan otomatis mengecek & menandai pesanan > 24 jam!
 */
function cekDanTandaiPesananMenggantung24Jam() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return;

  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return;

  const data = sheet.getRange(2, 1, lastRow - 1, 12).getValues();
  const now = new Date().getTime();

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const dateStr = row[0]; // Kolom A: Tanggal
    const statusBayar = String(row[8] || "").trim(); // Kolom I: Status Bayar
    const email = String(row[3] || "").trim(); // Kolom D: Email

    if (statusBayar === "Menunggu Pembayaran") {
      // Parse tanggal
      const parsedDate = new Date(dateStr);
      let orderTime = parsedDate.getTime();

      // Jika format tanggal dd/MM/yyyy HH:mm:ss
      if (isNaN(orderTime) && typeof dateStr === "string") {
        const parts = dateStr.split(" ");
        if (parts.length >= 2) {
          const dParts = parts[0].split("/");
          const tParts = parts[1].split(":");
          if (dParts.length === 3 && tParts.length >= 2) {
            orderTime = new Date(dParts[2], dParts[1] - 1, dParts[0], tParts[0], tParts[1]).getTime();
          }
        }
      }

      if (!isNaN(orderTime)) {
        const diffHours = (now - orderTime) / (1000 * 60 * 60);
        if (diffHours >= 24) {
          // Tandai kolom L menjadi PERLU DIINGATKAN (>24 Jam)
          sheet.getRange(i + 2, 12).setValue("⚠️ PERLU DIINGATKAN (>24 Jam)");
          sheet.getRange(i + 2, 1, 1, 12).setBackground("#FFF3CD"); // Highlight kuning lembut
        }
      }
    }
  }
}
