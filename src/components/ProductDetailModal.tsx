import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShoppingBag, 
  Check, 
  GraduationCap, 
  Sparkles, 
  Plus, 
  Minus,
  Edit3,
  Camera
} from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../data/initialProducts';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, qty: number) => void;
  onBuyNow: (p: Product, qty: number) => void;
  isAdmin?: boolean;
  onEditProduct?: (p: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isAdmin = false,
  onEditProduct
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    onBuyNow(product, quantity);
  };

  const handleEditThisProduct = () => {
    if (onEditProduct && product) {
      onClose();
      onEditProduct(product);
    }
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          {/* Backdrop with motion */}
          <motion.div 
            key="detail-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Modal Dialog with motion */}
          <motion.div
            key="detail-modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative bg-white w-full max-w-lg rounded-t-3xl md:rounded-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto border-2 border-[#E9899F]/30 shadow-2xl z-10 custom-scrollbar"
          >
        {/* Header */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F8EBD8] overflow-hidden flex items-center justify-center border-2 border-[#E9899F]/30 shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] text-[#8FA477] font-bold block uppercase tracking-wider">
                {product.category} {product.badge && `• ${product.badge}`}
              </span>
              <h3 className="font-brand text-base sm:text-lg text-[#D9574F] font-bold leading-tight">
                {product.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {isAdmin && onEditProduct && (
              <button
                type="button"
                onClick={handleEditThisProduct}
                className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs transition"
                title="Edit produk & ganti foto"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="text-[11px]">Edit Foto</span>
              </button>
            )}
            <button 
              type="button" 
              onClick={onClose} 
              className="cursor-pointer text-stone-400 hover:text-stone-700 p-1.5 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Large Image Preview with Admin Edit Shortcut */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-[#F8EBD8]/60 border border-[#E9899F]/20 relative group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[11px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
            <span>★ {product.rating}</span>
            <span className="opacity-80">({product.reviews} ulasan guru)</span>
          </div>

          {isAdmin && onEditProduct && (
            <button
              type="button"
              onClick={handleEditThisProduct}
              className="absolute top-2 right-2 bg-stone-900/80 hover:bg-[#D9574F] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition cursor-pointer backdrop-blur-xs"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Ganti Gambar Produk Ini</span>
            </button>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-stone-600 leading-relaxed">
          {product.description}
        </p>

        {/* Info Tags */}
        <div className="bg-[#F8EBD8]/50 border border-[#E9899F]/30 rounded-2xl p-3 space-y-1.5 text-xs text-stone-600">
          {product.curriculum && (
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#D9574F] shrink-0" />
              <span><strong>Kurikulum:</strong> {product.curriculum}</span>
            </div>
          )}
          {product.gradeLevel && (
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#EFC653] shrink-0" />
              <span><strong>Sasaran Kelas:</strong> {product.gradeLevel}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8FA477] shrink-0" />
            <span>Format digital • Akses file & panduan langsung via WhatsApp</span>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-bold text-stone-700">Jumlah Pesanan:</span>
          <div className="flex items-center space-x-2 bg-[#F8EBD8] px-2 py-1 rounded-xl border border-[#E9899F]/30">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-6 h-6 rounded-lg bg-white text-stone-700 flex items-center justify-center font-bold text-xs shadow-2xs"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-center font-bold text-stone-800 text-xs">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-6 h-6 rounded-lg bg-white text-stone-700 flex items-center justify-center font-bold text-xs shadow-2xs"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-2.5">
          <div className="min-w-24">
            <span className="text-[10px] text-stone-400 block leading-none mb-0.5">Total Harga</span>
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className={`font-brand font-bold text-base sm:text-lg ${
                product.price === 0 ? 'text-emerald-600' : 'text-[#D9574F]'
              }`}>
                {formatRupiah(product.price * quantity)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[10px] text-stone-400 line-through">
                  {formatRupiah(product.originalPrice * quantity)}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`cursor-pointer flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold active:scale-95 transition flex items-center justify-center gap-1.5 border-2 ${
              isAdded
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-[#D9574F] border-[#D9574F] hover:bg-[#F8EBD8]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Masuk Keranjang!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>+ Keranjang</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="cursor-pointer flex-1 py-2.5 px-3 rounded-2xl bg-[#D9574F] hover:bg-[#c34c44] text-white text-xs font-bold active:scale-95 transition flex items-center justify-center gap-1 retro-box"
          >
            <span>Pesan Sekarang</span>
            <span>🌸</span>
          </button>
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
