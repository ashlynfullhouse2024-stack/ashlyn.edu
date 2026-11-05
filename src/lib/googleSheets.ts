/**
 * Konfigurasi integrasi Google Sheets.
 * Isi kedua nilai berikut setelah deploy Apps Script sebagai Web App.
 */
export const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyqBjxdSDN-RYGVVoTMz-V7lGUQodAeTJIEbh9yq1ciZPUBxm0U0k9R1WbAzQiWoHlh/exec';
export const GOOGLE_SHEETS_TOKEN = 'ASHLYN_EDU_SECRET_TOKEN_2026';

export function getActiveGoogleSheetsConfig() {
  const customUrl = typeof localStorage !== 'undefined' ? localStorage.getItem('ashlyn_google_sheets_url') || '' : '';
  const customToken = typeof localStorage !== 'undefined' ? localStorage.getItem('ashlyn_google_sheets_token') || '' : '';
  return {
    url: customUrl || GOOGLE_SHEETS_WEB_APP_URL,
    token: customToken || GOOGLE_SHEETS_TOKEN
  };
}

export function sendOrderToGoogleSheets(message: string): void {
  const { url, token } = getActiveGoogleSheetsConfig();

  if (
    !url ||
    !url.startsWith('https://script.google.com/macros/s/') ||
    token.startsWith('TEMPEL_')
  ) {
    console.warn('[Ashlyn Edu] Integrasi Google Sheets belum dikonfigurasi.');
    return;
  }

  // no-cors membuat respons tidak dapat dibaca browser, tetapi POST tetap dikirim.
  // WhatsApp dibuka terpisah agar alur checkout tidak terhambat.
  try {
    void fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ token, pesan: message }),
      keepalive: true
    }).catch((error) => {
      console.error('[Ashlyn Edu] Pengiriman ke Google Sheets gagal:', error);
    });
  } catch (error) {
    console.error('[Ashlyn Edu] Pengiriman ke Google Sheets gagal:', error);
  }
}
