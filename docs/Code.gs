/**
 * =====================================================================
 * GOOGLE APPS SCRIPT - ASHLYN EDU WEB ORDER
 * =====================================================================
 * 
 * CARA MEMASANG:
 * 1. Buka Google Sheets baru di Google Drive Anda (https://sheets.new)
 * 2. Beri nama file: "Ashlyn Edu - Database Pesanan"
 * 3. Ganti nama Sheet1 menjadi: "Kirim Pesan"
 * 4. Buat baris header di baris ke-1:
 *    - Kolom A: Tanggal & Waktu
 *    - Kolom B: Nama Pemesan
 *    - Kolom C: Nomor WhatsApp
 *    - Kolom D: Email
 *    - Kolom E: Rincian Produk
 *    - Kolom F: Total Bayar
 *    - Kolom G: Metode Pembayaran
 *    - Kolom H: Pesan Lengkap (Raw Text)
 *    - Kolom I: Status Pembayaran (Belum Bayar / Lunas)
 *    - Kolom J: Status Kirim Akses (Belum / Terkirim)
 * 5. Buka menu: Extensions (Ekstensi) > Apps Script
 * 6. Hapus semua kode bawaan, lalu paste seluruh kode di file ini.
 * 7. Tentukan TOKEN rahasia Anda pada variabel TOKEN di bawah.
 * 8. Klik tombol "Deploy" (Terapkan) > "New deployment" (Penerapan baru)
 *    - Jenis: Web app (Aplikasi Web)
 *    - Execute as: Me (email Anda)
 *    - Who has access: Anyone (Siapa saja, bahkan anonim)
 * 9. Klik "Deploy", izinkan akses akun Google Anda, lalu salin "Web App URL" (akhiran /exec).
 * 10. Masukkan Web App URL & TOKEN ke file src/lib/googleSheets.ts
 */

const TOKEN = "ASHLYN_EDU_SECRET_TOKEN_2026"; // Ganti dengan token rahasia Anda
const SHEET_NAME = "Kirim Pesan";

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
    
    // Jika tab Kirim Pesan belum ada, buat otomatis
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
        "Status Kirim"
      ]);
      sheet.getRange("A1:J1").setFontWeight("bold").setBackground("#F4ECE1");
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

    // Rincian produk
    let produkList = [];
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
        produkList.push(line.trim());
      }
    }
    const rincianProduk = produkList.length > 0 ? produkList.join("; ") : "-";

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
      "Belum Dikirim"
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Pesanan berhasil dicatat" }))
      .setMimeType(ContentService.MimeType.JSON);

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
