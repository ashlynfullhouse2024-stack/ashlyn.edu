import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  MessageSquare, 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  ArrowLeft,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { CartItem, OrderCustomerInfo, StoreSettings } from '../types';
import { formatRupiah, calculateBundlingDiscount, DEFAULT_STORE_SETTINGS, formatPaymentMethodName } from '../data/initialProducts';

interface OrderCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToCart: () => void;
  cart: CartItem[];
  settings?: StoreSettings;
  onSubmitOrder: (
    customerInfo: OrderCustomerInfo,
    discountData: ReturnType<typeof calculateBundlingDiscount>
  ) => void;
}

export const OrderCheckoutModal: React.FC<OrderCheckoutModalProps> = ({
  isOpen,
  onClose,
  onBackToCart,
  cart,
  settings = DEFAULT_STORE_SETTINGS,
  onSubmitOrder
}) => {
  const bankOptions =
    settings.bankAccounts && settings.bankAccounts.length > 0
      ? settings.bankAccounts.map((b) => formatPaymentMethodName(b.bankName)).filter(Boolean)
      : ['BCA', 'Mandiri', 'Dana/E-Wallet'];

  const [checkoutMode, setCheckoutMode] = useState<'order' | 'inquiry'>('order');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    paymentMethod: bankOptions[0] || 'BCA',
    notes: '',
    questionText: ''
  });

  React.useEffect(() => {
    if (!bankOptions.includes(formData.paymentMethod)) {
      setFormData((prev) => ({ ...prev, paymentMethod: bankOptions[0] || 'BCA' }));
    }
  }, [bankOptions, formData.paymentMethod]);

  const discountData = calculateBundlingDiscount(cart);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    onSubmitOrder(
      {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        paymentMethod: formatPaymentMethodName(formData.paymentMethod),
        notes: formData.notes.trim() || undefined,
        isQuestionOnly: checkoutMode === 'inquiry',
        questionText: formData.questionText.trim() || undefined
      },
      discountData
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          {/* Backdrop with motion */}
          <motion.div 
            key="checkout-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            key="checkout-panel"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative bg-white w-full max-w-lg rounded-t-3xl md:rounded-3xl p-5 space-y-4 max-h-[92vh] overflow-y-auto border-2 border-[#E9899F]/30 shadow-2xl z-10 custom-scrollbar"
          >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToCart}
              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 cursor-pointer"
              title="Kembali"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h3 className="font-brand text-base sm:text-lg text-[#D9574F] font-bold leading-tight">
                {checkoutMode === 'order' ? 'Konfirmasi Pesanan Digital 🌸' : 'Tanya-Tanya ke Admin 💬'}
              </h3>
              <p className="text-[11px] text-stone-500">
                Akses langsung via WhatsApp • Tanpa ribet alamat fisik
              </p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={onClose} 
            className="cursor-pointer text-stone-400 hover:text-stone-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Langsung Pesan vs Mau Tanya Dulu */}
        <div className="grid grid-cols-2 gap-2 bg-[#F8EBD8]/60 p-1 rounded-2xl border border-[#E9899F]/30">
          <button
            type="button"
            onClick={() => setCheckoutMode('order')}
            className={`cursor-pointer py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              checkoutMode === 'order'
                ? 'bg-[#D9574F] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>🌷</span>
            <span>Langsung Pesan</span>
          </button>

          <button
            type="button"
            onClick={() => setCheckoutMode('inquiry')}
            className={`cursor-pointer py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              checkoutMode === 'inquiry'
                ? 'bg-[#8FA477] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>💬</span>
            <span>Tanya Dulu ke Admin</span>
          </button>
        </div>

        {/* Order Items Preview */}
        <div className="bg-[#F8EBD8]/50 border border-[#E9899F]/30 rounded-2xl p-3 space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold text-stone-800">
            <span>Produk Terpilih ({cart.length} item digital)</span>
            <span className="font-brand text-[#D9574F] text-sm">{formatRupiah(discountData.total)}</span>
          </div>
          <div className="text-[11px] text-stone-600 space-y-0.5 max-h-24 overflow-y-auto no-scrollbar">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="truncate max-w-[240px]">• {item.name} ({item.qty}x)</span>
                <span className="font-medium text-stone-800">{formatRupiah(item.price * item.qty)}</span>
              </div>
            ))}
          </div>

          {/* Discount details if applicable */}
          {discountData.discountAmount > 0 && (
            <div className="pt-1.5 mt-1 border-t border-[#E9899F]/20 flex justify-between items-center text-xs text-emerald-700 font-bold">
              <span>🎉 {discountData.discountLabel}</span>
              <span>- {formatRupiah(discountData.discountAmount)}</span>
            </div>
          )}
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-stone-700 font-bold mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#D9574F]" />
              <span>Nama Lengkap *</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Anis"
              className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#D9574F]" />
              <span>Nomor WhatsApp Aktif *</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Contoh: 082213283648"
              className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition font-mono"
            />
          </div>

          {checkoutMode === 'order' ? (
            <>
              <div>
                <label className="block text-stone-700 font-bold mb-1 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-[#D9574F]" />
                  <span>Metode Pembayaran *</span>
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition cursor-pointer font-medium"
                >
                  {bankOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#D9574F]" />
                  <span>Email Penerima Akses Digital (Opsional)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="emailmu@gmail.com (jika ingin dikirimkan via email juga)"
                  className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  Catatan Tambahan (Opsional)
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Misal: kirim link Canva ke nomor WA ini"
                  className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-stone-700 font-bold mb-1 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-[#8FA477]" />
                <span>Pertanyaan / Hal yang Ingin Ditanyakan</span>
              </label>
              <textarea
                rows={3}
                value={formData.questionText}
                onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
                placeholder="Contoh: Halo kak, untuk modul ini apakah bisa diedit di akun Canva gratis biasa?"
                className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#8FA477]/40 focus:border-[#8FA477] rounded-xl px-3 py-2 text-stone-800 outline-none transition resize-none"
              />
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onBackToCart}
              className="px-3.5 py-2.5 rounded-xl border-2 border-stone-200 text-stone-600 hover:bg-stone-50 font-bold"
            >
              Ubah
            </button>
            <button
              type="submit"
              className={`cursor-pointer flex-1 py-3 px-4 rounded-2xl text-white text-xs sm:text-sm font-bold active:scale-95 transition flex items-center justify-center gap-1.5 retro-box ${
                checkoutMode === 'order'
                  ? 'bg-[#D9574F] hover:bg-[#c34c44]'
                  : 'bg-[#8FA477] hover:bg-[#7b9165]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>
                {checkoutMode === 'order'
                  ? '🌸 Buka WhatsApp & Konfirmasi Pesanan'
                  : '💬 Buka WhatsApp & Tanya Admin'}
              </span>
            </button>
          </div>
        </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
