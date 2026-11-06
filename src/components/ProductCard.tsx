import React, { useState } from 'react';
import { Star, Plus, Check, Edit3, Trash2, Camera, Tag, X } from 'lucide-react';
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

const PRODUCTS_STORAGE_KEY = 'ashlyn_edu_products_v4_images';

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdmin,
  onAddToCart,
  onViewProduct,
  onEditProduct,
  onDeleteProduct
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isPriceEditorOpen, setIsPriceEditorOpen] = useState(false);
  const [price, setPrice] = useState(String(product.price));
  const [originalPrice, setOriginalPrice] = useState(String(product.originalPrice || ''));
  const [isFree, setIsFree] = useState(product.price === 0);
  const [priceError, setPriceError] = useState('');

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

  const openPriceEditor = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPrice(String(product.price));
    setOriginalPrice(String(product.originalPrice || ''));
    setIsFree(product.price === 0);
    setPriceError('');
    setIsPriceEditorOpen(true);
  };

  const savePrice = (e: React.FormEvent) => {
    e.preventDefault();
    const nextPrice = isFree ? 0 : Number(price);
    const nextOriginalPrice = originalPrice.trim() ? Number(originalPrice) : undefined;
    if (!Number.isFinite(nextPrice) || nextPrice < 0 || (nextOriginalPrice !== undefined && (!Number.isFinite(nextOriginalPrice) || nextOriginalPrice < 0))) {
      setPriceError('Masukkan harga yang valid (minimal Rp 0).');
      return;
    }

    try {
      const savedProducts = JSON.parse(localStorage.getItem(PRODUCTS_STORAGE_KEY) || '[]') as Product[];
      const products = savedProducts.length ? savedProducts : [product];
      const updatedProducts = products.map((item) => item.id === product.id
        ? { ...item, price: nextPrice, originalPrice: nextOriginalPrice || undefined }
        : item);
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));
      setIsPriceEditorOpen(false);
      // App state is initialized from localStorage, so reload to show the saved price everywhere.
      window.location.reload();
    } catch {
      setPriceError('Harga gagal disimpan. Coba muat ulang halaman lalu ulangi.');
    }
  };

  return (
    <div
      onClick={() => onViewProduct(product)}
      className="bg-white rounded-3xl border-2 border-[#E9899F]/30 p-3 sm:p-3.5 flex flex-col justify-between retro-box transition hover:-translate-y-0.5 cursor-pointer relative group"
    >
      {isAdmin && (
        <div onClick={(e) => e.stopPropagation()} className="absolute top-2 right-2 flex items-center gap-1 z-20">
          <button
            type="button"
            onClick={handleEditClick}
            className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-2 py-1 flex items-center gap-1 text-[10px] font-bold shadow-md transition hover:scale-105"
            title="Edit detail produk dan link akses"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit Produk/Link</span>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDeleteProduct(product.id); }}
            className="cursor-pointer w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center shadow-md transition hover:scale-105"
            title="Hapus Produk"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}

      <div>
        <div className="w-full aspect-square bg-[#F8EBD8]/60 rounded-2xl flex items-center justify-center overflow-hidden mb-2.5 border border-[#E9899F]/20 select-none relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
          {isAdmin && (
            <button
              type="button"
              onClick={handleEditClick}
              className="absolute inset-x-2 bottom-2 bg-stone-900/80 hover:bg-[#D9574F] text-white text-[10px] font-bold py-1.5 px-2 rounded-xl backdrop-blur-xs flex items-center justify-center gap-1.5 transition"
              title="Edit detail produk, foto, dan link"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Edit Produk / Link</span>
            </button>
          )}
          {product.badge && <span className="absolute top-2 left-2 bg-[#EFC653] text-[#714f08] font-bold text-[9px] px-2 py-0.5 rounded-full shadow-2xs">{product.badge}</span>}
        </div>

        <div className="flex justify-between items-center mb-1 text-[10px]">
          <span className="text-[#8FA477] font-bold block uppercase tracking-wider truncate mr-1">{product.category}</span>
          <span className="text-amber-600 font-semibold flex items-center gap-0.5 shrink-0"><Star className="w-3 h-3 fill-current" /> {product.rating}</span>
        </div>
        <h4 className="font-bold text-xs sm:text-sm line-clamp-1 mb-1 text-stone-800 leading-snug">{product.name}</h4>
        <p className="text-[10px] text-stone-500 line-clamp-2 leading-relaxed">{product.description}</p>
      </div>

      <div className="pt-2 border-t border-stone-100 mt-2.5">
        <span className="text-[9px] text-stone-400 block leading-none">Harga</span>
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className={`font-brand font-bold text-xs sm:text-sm block ${product.price === 0 ? 'text-emerald-600' : 'text-[#D9574F]'}`}>{formatRupiah(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && <span className="text-[10px] text-stone-400 line-through">{formatRupiah(product.originalPrice)}</span>}
        </div>
        {isAdmin && (
          <button type="button" onClick={openPriceEditor} className="cursor-pointer w-full mt-2 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center gap-1.5 transition">
            <Tag className="w-3 h-3" /> Edit Harga
          </button>
        )}
        <button
          type="button"
          onClick={handleAdd}
          className={`cursor-pointer w-full mt-2 py-2 rounded-xl text-white text-[11px] font-bold active:scale-95 transition flex items-center justify-center gap-1 ${isAdded ? 'bg-emerald-600' : 'bg-[#D9574F] hover:bg-[#c34c44]'}`}
        >
          {isAdded ? <><Check className="w-3.5 h-3.5" /><span>Masuk Keranjang!</span></> : <><Plus className="w-3.5 h-3.5" /><span>Pilih / Pesan</span><span>🌸</span></>}
        </button>
      </div>

      {isPriceEditorOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-stone-900/50 p-4" onClick={(e) => { e.stopPropagation(); setIsPriceEditorOpen(false); }}>
          <form onSubmit={savePrice} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-3xl border-2 border-[#E9899F]/40 bg-white p-5 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div><h3 className="font-brand text-base font-bold text-[#D9574F]">Edit Harga</h3><p className="mt-1 text-xs text-stone-500 line-clamp-2">{product.name}</p></div>
              <button type="button" onClick={() => setIsPriceEditorOpen(false)} className="cursor-pointer rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700" aria-label="Tutup"><X className="h-5 w-5" /></button>
            </div>
            <label className="flex items-center gap-2 text-xs font-bold text-emerald-700"><input type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} className="accent-emerald-600" /> Produk gratis</label>
            <div><label className="mb-1 block text-xs font-bold text-stone-700">Harga Jual (Rp)</label><input type="number" min="0" step="1000" required={!isFree} disabled={isFree} value={isFree ? 0 : price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-xl border-2 border-[#E9899F]/30 px-3 py-2 text-sm outline-none focus:border-[#D9574F] disabled:bg-stone-100" /></div>
            <div><label className="mb-1 block text-xs font-bold text-stone-700">Harga Coret / Asli (Rp, opsional)</label><input type="number" min="0" step="1000" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="Kosongkan jika tidak ada" className="w-full rounded-xl border-2 border-[#E9899F]/30 px-3 py-2 text-sm outline-none focus:border-[#D9574F]" /></div>
            {priceError && <p role="alert" className="text-xs font-semibold text-red-600">{priceError}</p>}
            <div className="flex gap-2"><button type="button" onClick={() => setIsPriceEditorOpen(false)} className="cursor-pointer rounded-xl border-2 border-stone-200 px-4 py-2 text-xs font-bold text-stone-600">Batal</button><button type="submit" className="cursor-pointer flex-1 rounded-xl bg-[#D9574F] px-4 py-2 text-xs font-bold text-white hover:bg-[#c34c44]">Simpan Harga</button></div>
          </form>
        </div>
      )}
    </div>
  );
};
