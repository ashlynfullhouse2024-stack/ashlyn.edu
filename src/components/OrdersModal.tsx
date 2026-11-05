import React, { useMemo, useState } from 'react';
import { X, FileText, MessageSquare, Trash2, Download, Search, FileSpreadsheet, ExternalLink, Check, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { CompletedOrder, OrderStatus } from '../types';
import { formatRupiah, cleanWaPhone } from '../data/initialProducts';

const STATUSES: OrderStatus[] = ['Menunggu Konfirmasi', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orders: CompletedOrder[];
  onChangeStatus: (orderId: string, status: OrderStatus) => void;
  onDelete: (orderId: string) => void;
  onOpenInvoice: (order: CompletedOrder) => void;
}

export const OrdersModal: React.FC<Props> = ({ isOpen, onClose, orders, onChangeStatus, onDelete, onOpenInvoice }) => {
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Semua' | OrderStatus>('Semua');
  const [showSheetsGuide, setShowSheetsGuide] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [sheetsUrl, setSheetsUrl] = useState(() => {
    return (typeof localStorage !== 'undefined' && localStorage.getItem('ashlyn_google_sheets_url')) || '';
  });
  const [sheetsToken, setSheetsToken] = useState(() => {
    return (typeof localStorage !== 'undefined' && localStorage.getItem('ashlyn_google_sheets_token')) || '';
  });
  const [savedSheetsConfig, setSavedSheetsConfig] = useState(false);

  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return orders.filter((o) =>
      (statusFilter === 'Semua' || o.status === statusFilter) &&
      (!t || o.orderId.toLowerCase().includes(t) || o.customer.name.toLowerCase().includes(t) || o.customer.phone.includes(t))
    );
  }, [orders, q, statusFilter]);

  const revenue = orders
    .filter((o) => !o.isQuestionOnly && o.status !== 'Dibatalkan')
    .reduce((s, o) => s + o.totalAmount, 0);

  if (!isOpen) return null;

  const exportCsv = () => {
    const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const rows = [['ID', 'Tanggal', 'Nama', 'WhatsApp', 'Jenis', 'Status', 'Item', 'Total']];
    orders.forEach((o) =>
      rows.push([
        o.orderId, o.date, o.customer.name, o.customer.phone,
        o.isQuestionOnly ? 'Pertanyaan' : 'Pesanan', o.status,
        o.items.map((i) => `${i.name} x${i.qty}`).join('; '), String(o.totalAmount)
      ])
    );
    const csv = '\uFEFF' + rows.map((r) => r.map(esc).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = `pesanan-ashlyn-edu-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative z-10 bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl border-2 border-[#E9899F]/30 shadow-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[#E9899F]/20 flex items-start justify-between gap-2">
          <div>
            <h3 className="font-brand text-lg font-bold text-[#D9574F]">Riwayat Pesanan</h3>
            <p className="text-[11px] text-stone-500">
              {orders.length} catatan • Omzet {formatRupiah(revenue)}
            </p>
            <p className="text-[10px] text-amber-700 mt-0.5">
              Hanya mencatat pesanan yang dibuat di browser ini. Pesanan dari perangkat pelanggan tetap masuk lewat WhatsApp.
            </p>
          </div>
          <button onClick={onClose} className="cursor-pointer p-1.5 rounded-full hover:bg-stone-100" aria-label="Tutup">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 flex flex-wrap gap-2 text-xs border-b border-stone-100">
          <div className="relative flex-1 min-w-[160px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari ID, nama, atau nomor"
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-200 outline-none focus:border-[#E9899F]" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'Semua' | OrderStatus)}
            className="px-2 py-2 rounded-xl border border-stone-200">
            <option>Semua</option>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button onClick={exportCsv} disabled={orders.length === 0}
            className="cursor-pointer px-3 py-2 rounded-xl bg-[#8FA477] text-white font-bold flex items-center gap-1.5 disabled:opacity-40"
            title="Download CSV untuk dibuka langsung di Google Sheets atau Excel">
            <Download className="w-3.5 h-3.5" /> CSV
          </button>
          <button
            type="button"
            onClick={() => setShowSheetsGuide(!showSheetsGuide)}
            className={`cursor-pointer px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition ${
              showSheetsGuide ? 'bg-[#0F9D58] text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
            }`}
            title="Panduan & Pengaturan Google Sheets"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Google Sheets</span>
            {showSheetsGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Panel Panduan & Koneksi Google Sheets */}
        {showSheetsGuide && (
          <div className="bg-emerald-50/70 border-b border-emerald-200 p-3 sm:p-4 text-xs space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                  <span>Dua Cara Membuka Data di Google Sheets</span>
                </h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Pilih cara yang paling mudah sesuai kebutuhan Anda:
                </p>
              </div>
              <a
                href="https://sheets.new"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-white text-emerald-800 border border-emerald-300 rounded-lg font-bold text-[11px] flex items-center gap-1 shadow-2xs hover:bg-emerald-100 shrink-0"
              >
                <span>Buka sheets.new</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {/* Opsi 1: Export CSV */}
              <div className="bg-white p-3 rounded-2xl border border-emerald-200/80 space-y-1.5 shadow-2xs">
                <span className="font-bold text-stone-800 text-xs block text-emerald-700">
                  Cara 1: Unduh CSV (Instan & Tanpa Setup)
                </span>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  1. Klik tombol hijau <strong>CSV</strong> di atas.<br/>
                  2. Buka <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-semibold">Google Sheets baru</a>.<br/>
                  3. Klik menu <strong>File &gt; Impor (Import) &gt; Upload</strong>, lalu pilih file CSV yang baru diunduh. Semua data pesanan otomatis terisi ke baris dan kolom spreadsheet!
                </p>
              </div>

              {/* Opsi 2: Webhook Otomatis */}
              <div className="bg-white p-3 rounded-2xl border border-emerald-200/80 space-y-2 shadow-2xs">
                <span className="font-bold text-stone-800 text-xs block text-emerald-700">
                  Cara 2: Sinkron Otomatis Real-time (Webhook)
                </span>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Setiap ada pesanan baru, data otomatis terkirim ke Google Sheets melalui Apps Script Web App.
                </p>

                <div className="space-y-1.5 pt-1">
                  <input
                    type="url"
                    value={sheetsUrl}
                    onChange={(e) => setSheetsUrl(e.target.value)}
                    placeholder="Tempel Web App URL Google Sheets (/exec)"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-[11px] outline-none focus:border-emerald-600 font-mono"
                  />
                  <input
                    type="text"
                    value={sheetsToken}
                    onChange={(e) => setSheetsToken(e.target.value)}
                    placeholder="Token Rahasia (Contoh: ASHLYN_EDU_SECRET_TOKEN_2026)"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-[11px] outline-none focus:border-emerald-600 font-mono"
                  />
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem('ashlyn_google_sheets_url', sheetsUrl.trim());
                        localStorage.setItem('ashlyn_google_sheets_token', sheetsToken.trim());
                        setSavedSheetsConfig(true);
                        setTimeout(() => setSavedSheetsConfig(false), 2000);
                      }}
                      className="cursor-pointer px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px]"
                    >
                      {savedSheetsConfig ? '✓ Tersimpan!' : 'Simpan URL Webhook'}
                    </button>
                    <span className="text-[10px] text-stone-500">
                      Kode Apps Script ada di: <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-700 font-mono">docs/Code.gs</code>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
          {shown.length === 0 && (
            <p className="text-center text-xs text-stone-500 py-10">Belum ada pesanan yang cocok.</p>
          )}
          {shown.map((o) => (
            <div key={o.orderId} className="border border-stone-200 rounded-2xl p-3 text-xs space-y-2">
              <div className="flex justify-between gap-2 flex-wrap">
                <div>
                  <span className="font-bold text-stone-800">{o.orderId}</span>
                  {o.isQuestionOnly && <span className="ml-1.5 text-[10px] bg-sky-100 text-sky-800 px-1.5 rounded-full">Pertanyaan</span>}
                  <div className="text-[11px] text-stone-500">{o.date} • {o.customer.name} • {o.customer.phone}</div>
                </div>
                <div className="font-brand font-bold text-[#D9574F]">{formatRupiah(o.totalAmount)}</div>
              </div>
              <div className="text-[11px] text-stone-600">{o.items.map((i) => `${i.name} ×${i.qty}`).join(', ')}</div>
              <div className="flex items-center gap-2 flex-wrap">
                <select value={o.status} onChange={(e) => onChangeStatus(o.orderId, e.target.value as OrderStatus)}
                  className="px-2 py-1.5 rounded-lg border border-stone-200 text-[11px]">
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
                <button onClick={() => onOpenInvoice(o)} className="cursor-pointer px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center gap-1 text-[11px] font-semibold">
                  <FileText className="w-3 h-3" /> Invoice
                </button>
                <a href={`https://wa.me/${cleanWaPhone(o.customer.phone)}`} target="_blank" rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-[#25D366] text-white flex items-center gap-1 text-[11px] font-semibold">
                  <MessageSquare className="w-3 h-3" /> Chat
                </a>
                <button onClick={() => window.confirm(`Hapus catatan ${o.orderId}?`) && onDelete(o.orderId)}
                  className="cursor-pointer ml-auto p-1.5 rounded-lg text-red-500 hover:bg-red-50" aria-label="Hapus">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
