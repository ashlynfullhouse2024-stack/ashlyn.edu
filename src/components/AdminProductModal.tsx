import React, { useState, useEffect } from 'react';
import { X, Plus, Edit3 } from 'lucide-react';
import { Product } from '../types';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit: Product | null;
  onSave: (product: Omit<Product, 'id'>, editId?: number) => void;
}

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Aplikasi & Administrasi' as Product['category'],
    price: 50000,
    originalPrice: 0,
    isFree: false,
    rating: 5.0,
    reviews: 1,
    image: '',
    description: '',
    badge: '',
    curriculum: 'Kurikulum Merdeka',
    gradeLevel: 'Fase A (Kelas 1-2 SD)',
    inStock: true,
    accessLink: ''
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        category: productToEdit.category,
        price: productToEdit.price,
        originalPrice: productToEdit.originalPrice || 0,
        isFree: productToEdit.price === 0,
        rating: productToEdit.rating,
        reviews: productToEdit.reviews,
        image: productToEdit.image,
        description: productToEdit.description,
        badge: productToEdit.badge || '',
        curriculum: productToEdit.curriculum || 'Kurikulum Merdeka',
        gradeLevel: productToEdit.gradeLevel || 'Semua Tingkat',
        inStock: productToEdit.inStock ?? true,
        accessLink: productToEdit.accessLink || ''
      });
    } else {
      setFormData({
        name: '',
        category: 'Aplikasi & Administrasi',
        price: 75000,
        originalPrice: 100000,
        isFree: false,
        rating: 5.0,
        reviews: 1,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        description: '',
        badge: 'Produk Baru',
        curriculum: 'Kurikulum Merdeka',
        gradeLevel: 'Fase A & B (SD)',
        inStock: true,
        accessLink: ''
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPrice = formData.isFree ? 0 : Number(formData.price);
    const finalOriginalPrice = Number(formData.originalPrice) > 0 ? Number(formData.originalPrice) : undefined;
    onSave({
      name: formData.name,
      category: formData.category,
      price: finalPrice,
      originalPrice: finalOriginalPrice,
      rating: Number(formData.rating),
      reviews: Number(formData.reviews),
      image: formData.image,
      description: formData.description,
      badge: formData.badge || undefined,
      curriculum: formData.curriculum,
      gradeLevel: formData.gradeLevel,
      inStock: formData.inStock,
      accessLink: formData.accessLink || undefined
    }, productToEdit?.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-end md:items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-lg rounded-t-3xl md:rounded-3xl p-5 space-y-4 max-h-[92vh] overflow-y-auto border-2 border-[#E9899F]/30 shadow-2xl z-10 custom-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D9574F] text-white flex items-center justify-center">
              {productToEdit ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
            <h3 className="font-brand text-base sm:text-lg text-[#D9574F] font-bold">
              {productToEdit ? 'Edit Produk' : 'Tambah Produk Baru'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-stone-700 font-bold mb-1">
              Nama Produk / Judul Modul *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Modul Ajar Tematik Kreatif"
              className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-bold mb-1">
                Kategori *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-2.5 py-2 text-stone-800 outline-none transition cursor-pointer font-medium"
              >
                <option value="Aplikasi & Administrasi">Aplikasi & Administrasi</option>
                <option value="Template Canva">Template Canva</option>
                <option value="Prompt AI Edukasi">Prompt AI Edukasi</option>
                <option value="Materi Ajar & LKPD">Materi Ajar & LKPD</option>
                <option value="Free Resources">Free Resources</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">
                Badge / Label Promosi
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Contoh: Best Seller / Diskon 50%"
                className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition"
              />
            </div>
          </div>

          {/* Pricing Row: Price & Original (Pembanding) Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-stone-700 font-bold">
                  Harga Jual (Rp) *
                </label>
                <label className="flex items-center gap-1 text-[10px] text-emerald-700 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={formData.isFree}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isFree: e.target.checked,
                        price: e.target.checked ? 0 : 25000
                      })
                    }
                    className="accent-emerald-600"
                  />
                  <span>Gratis</span>
                </label>
              </div>
              <input
                type="number"
                min="0"
                step="1000"
                required
                disabled={formData.isFree}
                value={formData.isFree ? 0 : formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">
                Harga Pembanding (Coret)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={formData.originalPrice || ''}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                placeholder="Contoh: 199000"
                className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1">
              URL Foto Produk *
            </label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1">
              Link File Modul / Template Canva / GDrive (Opsional)
            </label>
            <input
              type="url"
              value={formData.accessLink}
              onChange={(e) => setFormData({ ...formData, accessLink: e.target.value })}
              placeholder="https://canva.com/... atau https://drive.google.com/..."
              className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition font-mono text-[11px]"
            />
            <p className="text-[10px] text-stone-400 mt-0.5">
              Tautan ini disimpan untuk memudahkan admin saat mengirimkan modul ke guru pemesan via WhatsApp.
            </p>
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1">
              Deskripsi Singkat *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Jelaskan isi modul atau manfaat perlengkapan kelas..."
              className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition resize-none"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border-2 border-stone-200 text-stone-600 font-bold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="cursor-pointer flex-1 py-2.5 rounded-xl bg-[#D9574F] hover:bg-[#c34c44] text-white font-bold retro-box transition"
            >
              {productToEdit ? 'Simpan Perubahan' : 'Tambahkan Produk 🌸'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
