# Ashlyn Edu – Web Order

Katalog & pemesanan produk edukasi (React + Vite + Tailwind). Checkout membuka WhatsApp admin dengan pesan pesanan yang sudah terisi.

## Jalankan
```
npm install
npm run dev
```

## Pengaturan penting
1. **Password admin** – `npm run hash-password -- "passwordBaru"`, salin hasilnya ke `.env.local` sebagai `VITE_ADMIN_PASSWORD_HASH`.
2. **Nomor WhatsApp & rekening** – masuk Mode Admin → *Fitur Pesan WA*, ganti data contoh dengan data asli.
3. **Deploy** – push ke `main`; workflow GitHub Pages akan build otomatis. Set variabel repo `VITE_BASE` ke `/nama-repo/` jika tidak memakai domain sendiri.

## Batasan
Aplikasi ini tanpa server: produk, pesanan, dan pengaturan tersimpan di `localStorage` browser masing-masing. Riwayat pesanan hanya mencatat pesanan dari browser tersebut; verifikasi admin hanya penghalang ringan, bukan keamanan sungguhan.


## Integrasi Google Sheets (pesanan otomatis)

1. Siapkan Google Sheets dari file `Pengirim_Pesan_Customer.xlsx` dan pastikan nama tab `Kirim Pesan`.
2. Pasang kode Apps Script dari file `Code (2).gs` yang disediakan terpisah. Ganti nilai `TOKEN` di Apps Script dengan token rahasia Anda.
3. Deploy Apps Script sebagai **Web app**, Execute as **Me**, akses **Anyone**, lalu salin URL `/exec`.
4. Buka `src/lib/googleSheets.ts` dan isi `GOOGLE_SHEETS_WEB_APP_URL` dengan URL `/exec` serta `GOOGLE_SHEETS_TOKEN` dengan token yang sama.
5. Build dan deploy ulang website.

Catatan:
- Integrasi mengirim pesanan normal ke kolom C pada tab `Kirim Pesan`. Baris status pembayaran/kirim diatur oleh Apps Script.
- Mode "Tanya Dulu ke Admin" tidak dicatat sebagai order.
- Browser `no-cors` tidak mengizinkan website membaca konfirmasi sukses dari Apps Script. Karena itu, WhatsApp tetap dibuka meskipun status pengiriman ke sheet tidak dapat dikonfirmasi di layar.
- Pesan order kini selalu menggunakan label `TOTAL BAYAR:` agar sesuai dengan parser di spreadsheet, termasuk order tanpa diskon.
- URL Web App dan token harus diisi sebelum build. Jangan bagikan token ke pihak lain. Token di frontend dapat dilihat pengunjung website, sehingga ini hanya penghalang spam dasar, bukan autentikasi kuat.
