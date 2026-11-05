import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink, 
  X
} from 'lucide-react';
import { CompletedOrder, StoreSettings } from '../types';
import { formatRupiah, generateWaOrderText, cleanWaPhone, DEFAULT_STORE_SETTINGS } from '../data/initialProducts';

interface OrderSuccessModalProps {
  order: CompletedOrder | null;
  onClose: () => void;
  onOpenInvoice: (order: CompletedOrder) => void;
  settings?: StoreSettings;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onOpenInvoice,
  settings = DEFAULT_STORE_SETTINGS
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (order) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  }, [order]);

  const plainTextMessage = order ? generateWaOrderText(order, settings) : '';
  const targetPhone = cleanWaPhone(settings.whatsappNumber);
  const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(plainTextMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(plainTextMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {order && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop with motion */}
          <motion.div 
            key="success-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            key="success-panel"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative bg-white w-full max-w-md rounded-3xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto border-2 border-[#E9899F]/30 shadow-2xl z-10 custom-scrollbar"
          >
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-14 h-14 bg-[#E9899F]/20 text-[#D9574F] rounded-2xl flex items-center justify-center mx-auto text-2xl border-2 border-[#E9899F]/40 mb-2">
            {order.isQuestionOnly ? '💬' : '🍓'}
          </div>
          <h3 className="font-brand text-xl text-[#D9574F] font-bold">
            {order.isQuestionOnly ? 'Pesan Pertanyaan Siap Dikirim!' : 'Pesanan Siap Dikirim ke WA!'}
          </h3>
          <p className="text-xs text-stone-500">
            {order.isQuestionOnly
              ? 'Tinggal klik tombol di bawah untuk terhubung ke WhatsApp Admin'
              : `Total Tagihan: ${formatRupiah(order.totalAmount)}`}
          </p>
        </div>

        {/* WhatsApp Direct Action Button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold active:scale-95 transition flex items-center justify-center gap-2 shadow-sm text-center"
        >
          <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
          <span>
            {order.isQuestionOnly
              ? 'Buka WhatsApp & Kirim Pertanyaan 💬'
              : 'Buka WhatsApp & Konfirmasi Pembayaran 🍓'}
          </span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* Text Preview Box */}
        <div className="bg-[#F8EBD8]/50 border border-[#E9899F]/30 rounded-2xl p-3 space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-stone-700 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#D9574F]" />
              Format Teks WhatsApp:
            </span>
            <button
              onClick={handleCopy}
              className="text-[11px] font-bold text-[#D9574F] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Salin Teks</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-[10px] sm:text-[11px] text-stone-700 font-mono whitespace-pre-wrap bg-white p-2.5 rounded-xl border border-[#E9899F]/20 max-h-36 overflow-y-auto no-scrollbar">
            {plainTextMessage}
          </pre>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer w-full py-2.5 rounded-xl border-2 border-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-50"
        >
          Selesai & Tutup
        </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
