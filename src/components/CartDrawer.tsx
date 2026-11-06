import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight,
  Sparkles,
  Tag,
  Check
} from 'lucide-react';
import { CartItem } from '../types';
import { formatRupiah, calculateBundlingDiscount, RECOMMENDED_BUNDLES } from '../data/initialProducts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
  onProceedCheckout: () => void;
  onAddBundle?: (productIds: number[]) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onProceedCheckout,
  onAddBundle
}) => {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const discountData = calculateBundlingDiscount(cart);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop with motion */}
          <motion.div 
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            key="cart-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative bg-white w-full max-w-md h-full flex flex-col p-4 sm:p-5 border-l-2 border-[#E9899F]/30 shadow-2xl z-10"
          >
        {/* Header Lilnami Style */}
        <div className="flex justify-between items-center border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <h3 className="font-brand text-lg text-[#D9574F] font-bold">
              Keranjang Belanja
            </h3>
            <span className="text-xs bg-[#E9899F] text-white px-2 py-0.5 rounded-full font-bold">
              {totalItems}
            </span>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="cursor-pointer text-stone-400 hover:text-stone-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bundling Discount Notification */}
        {cart.length > 0 && (
          <div className="bg-gradient-to-r from-[#F8EBD8] to-[#fffae6] border-2 border-[#EFC653]/60 rounded-2xl p-2.5 my-2.5 text-xs text-stone-700 shadow-2xs">
            <div className="flex items-start gap-2">
              <div className="p-1 rounded-lg bg-[#EFC653]/40 text-[#714f08] shrink-0 mt-0.5">
                <Tag className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                {discountData.discountAmount > 0 ? (
                  <div>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <span>🎉</span>
                      <span>{discountData.discountLabel}</span>
                    </span>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      Hemat <strong>{formatRupiah(discountData.discountAmount)}</strong>! {discountData.nextTierMessage}
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="font-bold text-[#D9574F] flex items-center gap-1">
                      <span>🌷</span>
                      <span>Promo Diskon Bundling</span>
                    </span>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      {discountData.nextTierMessage || 'Beli 2 produk hemat 5%, 3 produk hemat 10%, 4+ hemat 15%!'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Item List */}
        <div className="flex-grow overflow-y-auto py-2 space-y-2.5 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 space-y-2">
              <div className="text-4xl">🛍️</div>
              <p className="font-brand text-base text-[#D9574F] font-bold">
                Keranjangmu masih kosong!
              </p>
              <p className="text-xs text-stone-400 max-w-xs">
                Yuk pilih modul atau produk digital favoritmu. Dapatkan diskon bundling hemat hingga 15%!
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-4 py-2 bg-[#D9574F] text-white font-bold text-xs rounded-xl active:scale-95 transition"
              >
                Mulai Belanja 🌸
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white p-3 rounded-2xl border-2 border-[#E9899F]/20 flex items-center gap-3 transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 bg-[#F8EBD8]"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-stone-800 truncate">
                      {item.name}
                    </h4>
                    <span className="font-brand font-bold text-[#D9574F] text-xs block mt-0.5">
                      {formatRupiah(item.price)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 mt-1.5">
                      <div className="flex items-center space-x-1 bg-[#F8EBD8] px-1.5 py-0.5 rounded-lg border border-[#E9899F]/30">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-4 h-4 rounded bg-white text-stone-700 flex items-center justify-center text-[10px] cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-stone-800">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-4 h-4 rounded bg-white text-stone-700 flex items-center justify-center text-[10px] cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-300 hover:text-red-500 p-1 ml-auto transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Rekomendasi Bundling Cepat jika cart sedikit */}
              {cart.length <= 2 && onAddBundle && (
                <div className="mt-4 bg-[#8FA477]/10 border border-[#8FA477]/30 rounded-2xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#4d5e3c] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#8FA477]" />
                      <span>Ide Bundling Hemat 🌼</span>
                    </span>
                    <span className="text-[10px] bg-[#8FA477] text-white px-2 py-0.2 rounded-full font-bold">
                      Lebih Hemat
                    </span>
                  </div>
                  {(() => {
                    const cartIds = new Set(cart.map((c) => c.id));
                    const incompleteBundles = RECOMMENDED_BUNDLES.filter(
                      (b) => !b.productIds.every((pid) => cartIds.has(pid))
                    );
                    const bundleSuggest =
                      incompleteBundles.find((b) =>
                        b.productIds.some((pid) => cartIds.has(pid))
                      ) ||
                      incompleteBundles[0] ||
                      RECOMMENDED_BUNDLES[0];
                    return (
                      <div className="text-[11px] text-stone-600">
                        <strong className="text-stone-800 block">{bundleSuggest.title}</strong>
                        <p className="text-[10px] text-stone-500 line-clamp-1">{bundleSuggest.description}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="font-brand font-bold text-[#D9574F] text-xs">
                            {formatRupiah(bundleSuggest.bundlePrice)}{' '}
                            <span className="text-[10px] text-stone-400 line-through">
                              {formatRupiah(bundleSuggest.normalPrice)}
                            </span>
                          </span>
                          <button
                            type="button"
                            onClick={() => onAddBundle(bundleSuggest.productIds)}
                            className="cursor-pointer text-[10px] font-bold bg-[#8FA477] hover:bg-[#7b9165] text-white px-2.5 py-1 rounded-lg transition"
                          >
                            + Tambah Paket
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="pt-3 border-t border-stone-200 space-y-2.5">
            {/* Subtotal & Discount Breakdown */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center text-stone-600">
                <span>Subtotal ({totalItems} item):</span>
                <span>{formatRupiah(discountData.subtotal)}</span>
              </div>

              {discountData.discountAmount > 0 && (
                <div className="flex justify-between items-center text-emerald-700 font-bold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{discountData.discountLabel}:</span>
                  </span>
                  <span>- {formatRupiah(discountData.discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-1 border-t border-stone-100">
                <span className="font-bold text-stone-800">Total Pembayaran:</span>
                <span className="font-brand font-bold text-[#D9574F] text-base sm:text-lg">
                  {formatRupiah(discountData.total)}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClearCart}
                className="px-3 py-2.5 border-2 border-stone-200 text-stone-400 hover:text-red-500 rounded-xl cursor-pointer"
                title="Kosongkan"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={onProceedCheckout}
                className="cursor-pointer flex-1 py-3 px-4 rounded-2xl bg-[#D9574F] hover:bg-[#c34c44] text-white text-xs sm:text-sm font-bold active:scale-95 transition flex items-center justify-center gap-1.5 retro-box"
              >
                <span>Lanjut ke Formulir Pesanan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
