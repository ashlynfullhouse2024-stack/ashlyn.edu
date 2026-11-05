import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  FileText, 
  MessageSquare, 
  Trash2, 
  Download, 
  Search, 
  FileSpreadsheet, 
  ExternalLink, 
  Check, 
  Copy, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Send, 
  Clock, 
  Link as LinkIcon,
  Eye
} from 'lucide-react';
import { CompletedOrder, OrderStatus, Product, StoreSettings } from '../types';
import { 
  formatRupiah, 
  cleanWaPhone, 
  generateAccessFulfillmentMessage, 
  generateOrderStatusUpdateMessage,
  generatePendingReminderMessage, 
  isOrderPendingOver24Hours,
  getOrderAgeText,
  DEFAULT_STORE_SETTINGS
} from '../data/initialProducts';

const STATUSES: OrderStatus[] = ['Menunggu Konfirmasi', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orders: CompletedOrder[];
  onChangeStatus: (orderId: string, status: OrderStatus) => void;
  onDelete: (orderId: string) => void;
  onOpenInvoice: (order: CompletedOrder) => void;
  products?: Product[];
  settings?: StoreSettings;
  onUpdateOrder?: (order: CompletedOrder) => void;
}

export const OrdersModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  orders, 
  onChangeStatus, 
  onDelete, 
  onOpenInvoice,
  products = [],
  settings = DEFAULT_STORE_SETTINGS
}) => {
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Semua' | OrderStatus>('Semua');
  const [showSheetsGuide, setShowSheetsGuide] = useState(false);
  const [previewOrder, setPreviewOrder] = useState<CompletedOrder | null>(null);
  const [previewMode, setPreviewMode] = useState<'access' | 'status'>('access');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sheetsUrl, setSheetsUrl] = useState(() => {
    return (typeof localStorage !== 'undefined' && localStorage.getItem('ashlyn_google_sheets_url')) || '';
  });
  const [sheetsToken, setSheetsToken] = useState(() => {
    return (typeof localStorage !== 'undefined' && localStorage.getItem('ashlyn_google_sheets_token')) || '';
  });
  const [savedSheetsConfig, setSavedSheetsConfig] = useState(false);

  // Map product names / IDs to access links
  const productAccessMap = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      if (p.accessLink) {
        map.set(p.name.trim().toLowerCase(), p.accessLink);
        map.set(String(p.id), p.accessLink);
      }
    });
    return map;
  }, [products]);

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

  const exportCsv = () => {
    const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const rows = [['ID', 'Tanggal', 'Nama', 'WhatsApp', 'Email', 'Jenis', 'Status', 'Item', 'Link Akses', 'Total']];
    orders.forEach((o) => {
      const links = o.items
        .map((i) => {
          const l = i.accessLink || productAccessMap.get(i.name.trim().toLowerCase()) || '';
          return l ? `${i.name}: ${l}` : '';
        })
        .filter(Boolean)
        .join('; ');

      rows.push([
        o.orderId, o.date, o.customer.name, o.customer.phone, o.customer.email || '-',
        o.isQuestionOnly ? 'Pertanyaan' : 'Pesanan', o.status,
        o.items.map((i) => `${i.name} x${i.qty}`).join('; '),
        links || '-',
        String(o.totalAmount)
      ]);
    });
    const csv = '\uFEFF' + rows.map((r) => r.map(esc).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = `pesanan-ashlyn-edu-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const copyAccessMessage = (order: CompletedOrder) => {
    const msg = generateAccessFulfillmentMessage(order, products, settings);
    navigator.clipboard.writeText(msg);
    setCopiedId(order.orderId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
          {/* Backdrop with motion */}
          <motion.div 
            key="orders-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            key="orders-panel"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative z-10 bg-white w-full max-w-3xl max-h-[92vh] rounded-3xl border-2 border-[#E9899F]/30 shadow-2xl flex flex-col overflow-hidden"
          >
        
        {/* Header */}
        <div className="p-4 border-b border-[#E9899F]/20 flex items-start justify-between gap-2 bg-[#FAF2E6]/60">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-brand text-lg font-bold text-[#D9574F]">Riwayat Pesanan & Akses Digital</h3>
              <span className="text-[10px] font-bold bg-[#E9899F]/30 text-[#D9574F] px-2 py-0.5 rounded-full">
                Auto-Link Siap
              </span>
            </div>
            <p className="text-[11px] text-stone-600 mt-0.5">
              {orders.length} pesanan • Total Omzet {formatRupiah(revenue)} • Kirim link akses instan saat pembayaran terkonfirmasi
            </p>
          </div>
          <button onClick={onClose} className="cursor-pointer p-1.5 rounded-full hover:bg-stone-100" aria-label="Tutup">
            <X className="w-4 h-4 text-stone-500" />
          </button>
        </div>

        {/* Toolbar Pencarian & Filter */}
        <div className="p-3 flex flex-wrap gap-2 text-xs border-b border-stone-100 bg-white">
          <div className="relative flex-1 min-w-[160px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
            <input 
              value={q} 
              onChange={(e) => setQ(e.target.value)} 
              placeholder="Cari ID, nama pemesan, atau nomor WA..."
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-200 outline-none focus:border-[#E9899F]" 
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value as 'Semua' | OrderStatus)}
            className="px-2.5 py-2 rounded-xl border border-stone-200 bg-white font-medium cursor-pointer"
          >
            <option>Semua</option>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button 
            onClick={exportCsv} 
            disabled={orders.length === 0}
            className="cursor-pointer px-3 py-2 rounded-xl bg-[#8FA477] hover:bg-[#7e9267] text-white font-bold flex items-center gap-1.5 disabled:opacity-40 transition"
            title="Download CSV lengkap dengan Link Akses untuk dibuka di Google Sheets atau Excel"
          >
            <Download className="w-3.5 h-3.5" /> CSV + Link
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
          <div className="bg-emerald-50/80 border-b border-emerald-200 p-3 sm:p-4 text-xs space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                  <span>Koneksi Google Sheets & Pengiriman Akses</span>
                </h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Setiap pesanan otomatis tercatat di Google Sheets lengkap dengan nomor WhatsApp dan tautan produk.
                </p>
              </div>
              <a
                href="https://sheets.new"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-white text-emerald-800 border border-emerald-300 rounded-lg font-bold text-[11px] flex items-center gap-1 shadow-2xs hover:bg-emerald-100 shrink-0"
              >
                <span>Buka Google Sheets</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <div className="bg-white p-3 rounded-2xl border border-emerald-200 space-y-1.5 shadow-2xs">
                <span className="font-bold text-emerald-800 text-xs block">
                  1. Download CSV Instan
                </span>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Klik tombol <strong>CSV + Link</strong> di atas, lalu import ke Google Sheets Anda. Kolom link akses produk otomatis terisi sesuai dengan apa yang dibeli pelanggan.
                </p>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-emerald-200 space-y-2 shadow-2xs">
                <span className="font-bold text-emerald-800 text-xs block">
                  2. Webhook Otomatis (Apps Script)
                </span>
                <input
                  type="url"
                  value={sheetsUrl}
                  onChange={(e) => setSheetsUrl(e.target.value)}
                  placeholder="URL Web App Google Sheets (/exec)"
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
                    File: <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-700 font-mono">docs/Code.gs</code>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List of Orders */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 custom-scrollbar bg-stone-50/50">
          {shown.length === 0 && (
            <div className="text-center py-12 space-y-2">
              <p className="text-sm font-bold text-stone-600">Belum ada pesanan yang cocok.</p>
              <p className="text-xs text-stone-400">Pesanan baru dari web akan otomatis muncul di sini secara real-time.</p>
            </div>
          )}

          {shown.map((o) => {
            const fulfillmentMsg = generateAccessFulfillmentMessage(o, products, settings);
            const pendingMsg = generatePendingReminderMessage(o, settings);
            const customerPhone = cleanWaPhone(o.customer.phone);
            const isPendingOver24h = isOrderPendingOver24Hours(o);
            const ageText = getOrderAgeText(o);

            // Collect direct links for ordered items
            const orderLinks: { name: string; link: string }[] = [];
            o.items.forEach((item) => {
              const link = item.accessLink || productAccessMap.get(item.name.trim().toLowerCase()) || '';
              if (link) {
                orderLinks.push({ name: item.name, link });
              }
            });

            return (
              <div 
                key={o.orderId} 
                className={`bg-white border rounded-2xl p-3.5 sm:p-4 text-xs space-y-3 shadow-2xs transition hover:border-[#E9899F]/50 ${
                  isPendingOver24h ? 'border-amber-300 ring-1 ring-amber-200' : 'border-stone-200'
                }`}
              >
                {/* Header row */}
                <div className="flex justify-between items-start gap-2 flex-wrap">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-brand font-bold text-stone-900 text-sm">#{o.orderId}</span>
                      {o.isQuestionOnly && (
                        <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">
                          💬 Pertanyaan
                        </span>
                      )}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        o.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                        o.status === 'Diproses' || o.status === 'Dikirim' ? 'bg-blue-100 text-blue-800' :
                        o.status === 'Dibatalkan' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {o.status}
                      </span>
                      {isPendingOver24h && (
                        <span className="text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs animate-pulse">
                          <Clock className="w-3 h-3" />
                          <span>Perlu Follow-up ({ageText})</span>
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1.5 flex-wrap">
                      <span>{o.date}</span>
                      <span>•</span>
                      <strong className="text-stone-700">{o.customer.name}</strong>
                      <span>•</span>
                      <span className="font-mono">{o.customer.phone}</span>
                      {o.customer.email && (
                        <>
                          <span>•</span>
                          <span className="text-stone-600">{o.customer.email}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-brand font-bold text-[#D9574F] text-base">
                      {formatRupiah(o.totalAmount)}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      {o.customer.paymentMethod}
                    </div>
                  </div>
                </div>

                {/* Items & Access Links */}
                <div className="bg-[#FAF2E6]/60 p-2.5 rounded-xl border border-[#E9899F]/20 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-stone-700">
                    <span>Item Dipesan:</span>
                    {o.items.length > 1 && (
                      <span className="text-[10px] bg-[#E9899F]/20 text-[#D9574F] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        🎁 Paket Bundling ({o.items.length} Item)
                      </span>
                    )}
                  </div>
                  {o.items.length > 1 && (
                    <div className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5 font-medium">
                      <span>✓</span>
                      <span>Paket Bundling: Seluruh {o.items.length} link materi akan otomatis terkirim sekaligus ke WhatsApp pembeli.</span>
                    </div>
                  )}
                  <div className="space-y-1">
                    {o.items.map((i, idx) => {
                      const link = i.accessLink || productAccessMap.get(i.name.trim().toLowerCase());
                      return (
                        <div key={idx} className="flex items-center justify-between gap-2 text-[11px]">
                          <span className="text-stone-800 font-medium">
                            • {i.name} <strong className="text-stone-500">×{i.qty}</strong>
                          </span>
                          {link ? (
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-200 flex items-center gap-1 font-semibold shrink-0"
                              title="Buka link materi / aplikasi produk ini"
                            >
                              <LinkIcon className="w-3 h-3 text-emerald-600" />
                              <span>Link Akses</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ) : (
                            <span className="text-[10px] text-stone-400 italic">
                              Link via chat
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-stone-100">
                  {/* Status Dropdown */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-stone-500 font-medium">Status:</span>
                    <select 
                      value={o.status} 
                      onChange={(e) => onChangeStatus(o.orderId, e.target.value as OrderStatus)}
                      className="px-2 py-1 rounded-lg border border-stone-200 text-[11px] font-bold bg-white cursor-pointer"
                    >
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Tombol Kirim Status ke WhatsApp */}
                  <a
                    href={`https://wa.me/${customerPhone}?text=${encodeURIComponent(
                      generateOrderStatusUpdateMessage(o, o.status, products, settings)
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer px-2.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-1.5 text-[11px] font-bold shadow-xs active:scale-95 transition"
                    title={`Kirim update status '${o.status}' ke WhatsApp pelanggan`}
                  >
                    <Send className="w-3 h-3" />
                    <span>Kirim Status</span>
                  </a>

                  {/* Tombol Utama: Kirim Link Akses WA Otomatis */}
                  <a 
                    href={`https://wa.me/${customerPhone}?text=${encodeURIComponent(fulfillmentMsg)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cursor-pointer px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center gap-1.5 text-[11px] font-bold shadow-xs active:scale-95 transition"
                    title="Kirim pesan konfirmasi pembayaran + Link akses materi produk langsung ke WhatsApp pelanggan"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-white text-[#25D366]" />
                    <span>Kirim Link Akses WA</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>

                  {/* Tombol Salin Pesan Akses */}
                  <button 
                    onClick={() => copyAccessMessage(o)}
                    className="cursor-pointer px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1 text-[11px] font-semibold transition"
                    title="Salin teks pesan akses ke clipboard"
                  >
                    {copiedId === o.orderId ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-stone-500" />
                        <span>Salin Teks</span>
                      </>
                    )}
                  </button>

                  {/* Tombol Preview Pesan */}
                  <button
                    onClick={() => setPreviewOrder(o)}
                    className="cursor-pointer px-2 py-1.5 rounded-xl text-stone-600 hover:bg-stone-100 flex items-center gap-1 text-[11px]"
                    title="Lihat isi teks balasan yang akan dikirim"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Pratinjau</span>
                  </button>

                  {/* Tombol Follow Up untuk Pending >24h */}
                  {isPendingOver24h && (
                    <a 
                      href={`https://wa.me/${customerPhone}?text=${encodeURIComponent(pendingMsg)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1 text-[11px] font-bold shadow-2xs"
                      title="Kirim pengingat transfer sopan ke WhatsApp pembeli"
                    >
                      <Clock className="w-3 h-3" />
                      <span>Ingatkan Transfer</span>
                    </a>
                  )}

                  {/* Invoice */}
                  <button 
                    onClick={() => onOpenInvoice(o)} 
                    className="cursor-pointer px-2.5 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 flex items-center gap-1 text-[11px] font-semibold text-stone-700"
                  >
                    <FileText className="w-3 h-3 text-stone-500" />
                    <span>Invoice</span>
                  </button>

                  {/* Delete Button */}
                  <button 
                    onClick={() => window.confirm(`Hapus catatan pesanan ${o.orderId}?`) && onDelete(o.orderId)}
                    className="cursor-pointer ml-auto p-1.5 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 transition" 
                    aria-label="Hapus pesanan"
                    title="Hapus dari catatan browser"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Modal Pratinjau Teks Balasan WA */}
      <AnimatePresence>
        {previewOrder && (() => {
          const isBundle = previewOrder.items.length > 1;
          const currentMsg = previewMode === 'access'
            ? generateAccessFulfillmentMessage(previewOrder, products, settings)
            : generateOrderStatusUpdateMessage(previewOrder, previewOrder.status, products, settings);

          return (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-3">
              <motion.div
                key="preview-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setPreviewOrder(null)}
                className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
              />
              <motion.div
                key="preview-panel"
                initial={{ opacity: 0, scale: 0.95, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 14 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative z-10 bg-white rounded-3xl p-5 max-w-lg w-full space-y-3 shadow-2xl border-2 border-[#E9899F]/30"
              >
                <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                  <h4 className="font-brand font-bold text-[#D9574F] text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D9574F]" />
                    <span>Pratinjau Pesan WhatsApp</span>
                  </h4>
                  <button 
                    onClick={() => setPreviewOrder(null)}
                    className="cursor-pointer p-1 rounded-full hover:bg-stone-100 text-stone-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Tabs Switcher: Link Akses vs Status Update */}
                <div className="grid grid-cols-2 gap-1.5 bg-stone-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('access')}
                    className={`cursor-pointer py-1.5 px-2 rounded-lg transition text-center flex items-center justify-center gap-1.5 ${
                      previewMode === 'access'
                        ? 'bg-white text-[#D9574F] shadow-2xs font-extrabold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>🔑 Link Akses</span>
                    {isBundle && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
                        {previewOrder.items.length} Link
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('status')}
                    className={`cursor-pointer py-1.5 px-2 rounded-lg transition text-center flex items-center justify-center gap-1.5 ${
                      previewMode === 'status'
                        ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>📢 Update Status ({previewOrder.status})</span>
                  </button>
                </div>

                {previewMode === 'access' && isBundle && (
                  <div className="text-[11px] text-emerald-900 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                    <span className="text-sm">🎁</span>
                    <span><strong>Paket Bundling:</strong> Semua {previewOrder.items.length} link materi digabung otomatis menjadi satu format balasan yang rapi dan siap kirim.</span>
                  </div>
                )}

                <pre className="text-[11px] text-stone-800 font-mono whitespace-pre-wrap bg-[#FAF2E6] p-3 rounded-2xl border border-[#E9899F]/30 max-h-64 overflow-y-auto leading-relaxed custom-scrollbar">
                  {currentMsg}
                </pre>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentMsg);
                      setCopiedId(previewOrder.orderId);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="cursor-pointer px-3 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 font-bold text-xs text-stone-700 flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedId === previewOrder.orderId ? '✓ Tersalin!' : 'Salin Teks'}</span>
                  </button>

                  <a
                    href={`https://wa.me/${cleanWaPhone(previewOrder.customer.phone)}?text=${encodeURIComponent(currentMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim ke WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};
