import React, { useState } from 'react';
import { Star, Plus, Check, Edit3, Trash2, Camera } from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../data/initialProducts';

interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
  onAddToCart: (p: Product) => void;
  onViewProduct: (p: Product) => void;
  onEditProduct: (p: Product) => void;
  onDeleteProduct: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdmin,
  onAddToCart,
  onViewProduct,
  onEditProduct,
  onDeleteProduct
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 900);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditProduct(product);
  };

  return (
    <div 
      onClick={() => onViewProduct(product)}
      className="bg-white rounded-3xl border-2 border-[#E9899F]/30 p-3 sm:p-3.5 flex flex-col justify-between retro-box transition hover:-translate-y-0.5 cursor-pointer relative group"
    >
      {/* Admin Action Badges (Mode Admin) */}
      {isAdmin && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 flex items-center gap-1 z-20"
        >
          <button
            type="button"
            onClick={handleEditClick}
            className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-2 py-1 flex items-center gap-1 text-[10px] font-bold shadow-md transition hover:scale-105"
            title="Edit produk & ganti gambar"
          >
            <Edit3 className="w-3 h-3" />
            <span className="hidden sm:inline">Edit Foto</span>
          </button>
          <button
            type="button"
            onClick={() => onDeleteProduct(product.id)}
            className="cursor-pointer w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center shadow-md transition hover:scale-105"
            title="Hapus Produk"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Product Image Container */}
      <div>
        <div className="w-full aspect-square bg-[#F8EBD8]/60 rounded-2xl flex items-center justify-center overflow-hidden mb-2.5 border border-[#E9899F]/20 select-none relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Quick Edit Overlay for Admin on Image */}
          {isAdmin && (
            <button
              type="button"
              onClick={handleEditClick}
              className="absolute inset-x-2 bottom-2 bg-stone-900/80 hover:bg-[#D9574F] text-white text-[10px] font-bold py-1.5 px-2 rounded-xl backdrop-blur-xs flex items-center justify-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all shadow-md cursor-pointer z-10"
              title="Klik untuk ganti gambar ini"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Ganti Gambar 📷</span>
            </button>
          )}

          {product.badge && (
            <span className="absolute top-2 left-2 bg-[#EFC653] text-[#714f08] font-bold text-[9px] px-2 py-0.5 rounded-full shadow-2xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Category & Rating */}
        <div className="flex justify-between items-center mb-1 text-[10px]">
          <span className="text-[#8FA477] font-bold block uppercase tracking-wider truncate mr-1">
            {product.category}
          </span>
          <span className="text-amber-600 font-semibold flex items-center gap-0.5 shrink-0">
            ★ {product.rating}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-bold text-xs sm:text-sm line-clamp-1 mb-1 text-stone-800 leading-snug">
          {product.name}
        </h4>

        {/* Short description */}
        <p className="text-[10px] text-stone-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Price & Action Button */}
      <div className="pt-2 border-t border-stone-100 mt-2.5">
        <span className="text-[9px] text-stone-400 block leading-none">Harga</span>
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className={`font-brand font-bold text-xs sm:text-sm block ${
            product.price === 0 ? 'text-emerald-600' : 'text-[#D9574F]'
          }`}>
            {formatRupiah(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[10px] text-stone-400 line-through">
              {formatRupiah(product.originalPrice)}
            </span>
          )}
        </div>

        <button 
          type="button" 
          onClick={handleAdd}
          className={`cursor-pointer w-full mt-2 py-2 rounded-xl text-white text-[11px] font-bold active:scale-95 transition flex items-center justify-center gap-1 ${
            isAdded
              ? 'bg-emerald-600'
              : 'bg-[#D9574F] hover:bg-[#c34c44]'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Masuk Keranjang!</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Pilih / Pesan</span>
              <span>🌸</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
