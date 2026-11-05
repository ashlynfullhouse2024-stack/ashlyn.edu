import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plus, 
  Edit3, 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Check, 
  Trash2, 
  HelpCircle, 
  Sparkles, 
  Info,
  Key,
  UserCheck
} from 'lucide-react';
import { Product } from '../types';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit: Product | null;
  onSave: (product: Omit<Product, 'id'>, editId?: number) => void;
}

const PRESET_ASSETS = [
  { name: 'PKKM Bikin Stres', url: '/assets/aistudio/01_pkkm-bikin-stres.webp' },
  { name: 'Aplikasi RPP Guru', url: '/assets/aistudio/02_aplikasi-pembuat-rpp-guru.webp' },
  { name: 'Miniest Study Notes', url: '/assets/aistudio/03_study-notes.webp' },
  { name: 'LKPD Gamification AI', url: '/assets/aistudio/04_lkpd-gamification-ai.webp' },
  { name: 'Asisten Guru Pintar', url: '/assets/aistudio/05_asisten-guru-pintar-guru-mapel-wali-kelas-guru-ekskul-harus-coba.webp' },
  { name: 'Prompt LKPD Sekali Beli', url: '/assets/aistudio/06_prompt-lkpd-sekali-beli-untuk-selamanya.webp' },
  { name: 'Aplikasi Guru Piket', url: '/assets/aistudio/07_aplikasi-guru-piket.webp' },
  { name: 'Inklusi Guru BK', url: '/assets/aistudio/08_inklusi-studio-untuk-guru-bk.webp' },
  { name: 'Template Canva Teacher Dashboard', url: '/assets/aistudio/09_template-canva-untuk-guru-teacher-dashboard-canva-template-administrasi-.webp' },
  { name: 'Prompt Generator RPP All-In', url: '/assets/aistudio/10_prompt-generator-rpp-all-in-semua-jenjang.webp' },
  { name: 'Prompt AI RPP SMP', url: '/assets/aistudio/11_prompt-ai-rpp-kbc-pm-smp-only.webp' },
  { name: 'Jurnal Harian Guru', url: '/assets/aistudio/12_template-jurnal-guru-editable-canva-administrasi-guru-siap-pakai.webp' },
  { name: 'Teacher Planner Blue', url: '/assets/aistudio/13_teacher-planner-tema-blue-aesthetic.webp' },
  { name: 'Teacher Planner Pink', url: '/assets/aistudio/14_pdf-files-teacher-planner.webp' },
  { name: 'Prompt Cover Aesthetic', url: '/assets/aistudio/15_prompt-generator-untuk-cover-aesthetic.webp' },
  { name: 'Poster Karakter & Akhlak', url: '/assets/aistudio/16_poster-seri-1-karakter-akhlak.webp' },
  { name: 'Poster Kebiasaan Belajar', url: '/assets/aistudio/17_paket-poster-edukasi-kebiasaan-belajar-seri-2.webp' },
  { name: 'Foto Momen Si Kecil AI', url: '/assets/aistudio/18_abadikan-momen-si-kecil-dengan-ai.webp' },
  { name: 'AI Prompt Konten Kreator', url: '/assets/aistudio/19_ai-prompt-bundle-untuk-konten-kreator.webp' },
  { name: 'Prompt Stiker Bayi Gemesss', url: '/assets/aistudio/20_prompt-stiker-bayi-gemesss.webp' },
  { name: 'Materi Greetings & Introductions', url: '/assets/aistudio/21_materi-ajar-greetings-introduction-leave-takings.webp' },
  { name: 'Alphabet Workbook', url: '/assets/aistudio/23_alphabet-workbook.webp' },
  { name: 'Subject, To Be & Pronouns', url: '/assets/aistudio/24_subject-to-be-pronouns.webp' }
];

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
    accessLink: '',
    accessUsername: '',
    accessPassword: '',
    accessNote: ''
  });

  const [imageUploadMethod, setImageUploadMethod] = useState<'upload' | 'preset' | 'url'>('upload');
  const [isCompressing, setIsCompressing] = useState(false);
  const [showUploadGuide, setShowUploadGuide] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        accessLink: productToEdit.accessLink || '',
        accessUsername: productToEdit.accessCredentials?.username || '',
        accessPassword: productToEdit.accessCredentials?.password || '',
        accessNote: productToEdit.accessNote || productToEdit.accessCredentials?.notes || ''
      });
      // Detect if existing image is a web URL or preset
      if (productToEdit.image.startsWith('data:image')) {
        setImageUploadMethod('upload');
      } else if (productToEdit.image.startsWith('/assets')) {
        setImageUploadMethod('preset');
      } else {
        setImageUploadMethod('url');
      }
    } else {
      setFormData({
        name: '',
        category: 'Aplikasi & Administrasi',
        price: 50000,
        originalPrice: 75000,
        isFree: false,
        rating: 5.0,
        reviews: 1,
        image: '/assets/aistudio/01_pkkm-bikin-stres.webp',
        description: '',
        badge: 'Produk Baru',
        curriculum: 'Kurikulum Merdeka',
        gradeLevel: 'Fase A & B (SD)',
        inStock: true,
        accessLink: '',
        accessUsername: '',
        accessPassword: '',
        accessNote: ''
      });
      setImageUploadMethod('upload');
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  // Process and compress image to base64 Data URL
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Harap pilih file gambar (JPG, PNG, WebP, dll)');
      return;
    }

    setIsCompressing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Resize canvas to max 720px width/height for fast storage
        const canvas = document.createElement('canvas');
        const maxDim = 720;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Export as compressed WebP or JPEG
          const dataUrl = canvas.toDataURL('image/webp', 0.82);
          setFormData((prev) => ({ ...prev, image: dataUrl }));
        }
        setIsCompressing(false);
      };
      img.onerror = () => {
        setIsCompressing(false);
        alert('Gagal memuat gambar');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Silakan upload atau pilih gambar produk terlebih dahulu.');
      return;
    }
    const finalPrice = formData.isFree ? 0 : Number(formData.price);
    const finalOriginalPrice = Number(formData.originalPrice) > 0 ? Number(formData.originalPrice) : undefined;
    const hasCreds = formData.accessUsername.trim() || formData.accessPassword.trim();

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
      accessLink: formData.accessLink.trim() || undefined,
      accessCredentials: hasCreds ? {
        username: formData.accessUsername.trim() || undefined,
        password: formData.accessPassword.trim() || undefined
      } : undefined,
      accessNote: formData.accessNote.trim() || undefined
    }, productToEdit?.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          {/* Backdrop with motion */}
          <motion.div 
            key="admin-product-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            key="admin-product-panel"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative bg-white w-full max-w-xl rounded-t-3xl md:rounded-3xl p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto border-2 border-[#E9899F]/30 shadow-2xl z-10 custom-scrollbar"
          >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D9574F] text-white flex items-center justify-center shadow-xs">
              {productToEdit ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-brand text-base sm:text-lg text-[#D9574F] font-bold leading-tight">
                {productToEdit ? 'Edit Produk (Mode Admin)' : 'Tambah Produk Baru (Mode Admin)'}
              </h3>
              <p className="text-[11px] text-stone-500">
                Kelola data modul & upload gambar produk langsung dari perangkat
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-stone-400 hover:text-stone-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Panduan Singkat Cara Upload Gambar */}
        <div className="bg-[#FAF2E6] border border-[#E9899F]/30 rounded-2xl p-3 text-xs text-stone-700">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#D9574F] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D9574F]" />
              <span>Panduan: Cara Upload Gambar Produk Secara Langsung</span>
            </span>
            <button
              type="button"
              onClick={() => setShowUploadGuide(!showUploadGuide)}
              className="cursor-pointer text-[11px] text-[#8FA477] font-bold hover:underline flex items-center gap-0.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showUploadGuide ? 'Tutup Panduan' : 'Lihat Cara'}</span>
            </button>
          </div>

          {showUploadGuide && (
            <div className="mt-2.5 pt-2 border-t border-[#E9899F]/20 space-y-1.5 text-[11px] text-stone-600 leading-relaxed">
              <p>
                <strong>1. Upload dari Galeri/Kamera:</strong> Pilih tab <em>"Upload dari Perangkat"</em>, klik tombol <strong>"Pilih File Gambar"</strong> atau drag file foto dari komputer/HP Anda. Gambar langsung otomatis dikompresi agar ringan dan tidak memenuhi memori.
              </p>
              <p>
                <strong>2. Pilih Preset Ashlyn:</strong> Pilih tab <em>"Pilih Preset"</em> untuk memakai gambar ilustrasi lucu yang sudah tersedia.
              </p>
              <p>
                <strong>3. Gunakan Link URL:</strong> Pilih tab <em>"Input URL"</em> jika ingin menempelkan link foto dari Canva, CDN, Google Drive, atau Unsplash.
              </p>
            </div>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-stone-700 font-bold mb-1">
              Nama Produk / Judul Modul *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Modul Ajar Gamifikasi & Canva Template"
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
                Badge Promosi (Opsional)
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

          {/* Pricing Row */}
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
                Harga Coret / Asli (Rp)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={formData.originalPrice || ''}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                placeholder="Contoh: 100000"
                className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition"
              />
            </div>
          </div>

          {/* ===================== SECTION: FOTO PRODUK DENGAN FITUR UPLOAD LANGSUNG ===================== */}
          <div className="bg-stone-50 rounded-2xl p-3 sm:p-4 border-2 border-[#E9899F]/30 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="text-stone-800 font-bold flex items-center gap-1.5 text-xs">
                <ImageIcon className="w-4 h-4 text-[#D9574F]" />
                <span>Foto Produk * (Bisa Upload Langsung)</span>
              </label>

              {/* Toggle Metode Upload */}
              <div className="flex bg-white rounded-xl p-0.5 border border-stone-200 text-[11px]">
                <button
                  type="button"
                  onClick={() => setImageUploadMethod('upload')}
                  className={`cursor-pointer px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                    imageUploadMethod === 'upload'
                      ? 'bg-[#D9574F] text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload Langsung</span>
                </button>
                <button
                  type="button"
                  onClick={() => setImageUploadMethod('preset')}
                  className={`cursor-pointer px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                    imageUploadMethod === 'preset'
                      ? 'bg-[#8FA477] text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Pilih Preset</span>
                </button>
                <button
                  type="button"
                  onClick={() => setImageUploadMethod('url')}
                  className={`cursor-pointer px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                    imageUploadMethod === 'url'
                      ? 'bg-[#3b3533] text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>Link URL</span>
                </button>
              </div>
            </div>

            {/* Preview Box & Current Image */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-2 border-[#E9899F]/40 overflow-hidden relative shrink-0 shadow-inner flex items-center justify-center">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[10px] text-stone-400 text-center px-1">
                    Belum ada foto
                  </span>
                )}
                {isCompressing && (
                  <div className="absolute inset-0 bg-stone-900/60 flex items-center justify-center text-white text-[10px] font-bold">
                    Memproses...
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-1 text-[11px]">
                <p className="font-bold text-stone-700">Preview Tampilan di Web:</p>
                <p className="text-stone-500 line-clamp-1">
                  {formData.image ? (
                    formData.image.startsWith('data:image') 
                      ? '✓ Foto tersimpan langsung dari perangkat Anda'
                      : formData.image
                  ) : (
                    'Pilih atau upload gambar untuk produk ini.'
                  )}
                </p>
                {formData.image && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="cursor-pointer text-red-500 hover:text-red-700 font-bold inline-flex items-center gap-1 text-[10px] pt-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Hapus Foto</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mode 1: DIRECT FILE UPLOADER (HP / Laptop) */}
            {imageUploadMethod === 'upload' && (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-[#D9574F]/50 hover:border-[#D9574F] bg-white hover:bg-[#F8EBD8]/30 rounded-2xl p-4 text-center transition space-y-2 group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-full bg-[#D9574F]/10 group-hover:bg-[#D9574F]/20 text-[#D9574F] flex items-center justify-center mx-auto transition">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-xs text-stone-800">
                    Klik untuk Pilih File Foto dari HP / Laptop
                  </p>
                  <p className="text-[10px] text-stone-500">
                    Atau seret & taruh file gambar ke kotak ini (JPG, PNG, WebP)
                  </p>
                </div>
                <div className="inline-block bg-[#D9574F] text-white font-bold text-[11px] px-3 py-1 rounded-xl shadow-xs group-hover:scale-105 transition">
                  📁 Buka Galeri / File
                </div>
              </div>
            )}

            {/* Mode 2: PRESET PICKER */}
            {imageUploadMethod === 'preset' && (
              <div className="space-y-2">
                <p className="text-[11px] text-stone-600 font-medium">
                  Pilih salah satu gambar modul ilustrasi Ashlyn Edu:
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-44 overflow-y-auto p-1 bg-white rounded-xl border border-stone-200 custom-scrollbar">
                  {PRESET_ASSETS.map((asset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: asset.url })}
                      className={`cursor-pointer rounded-xl overflow-hidden border-2 transition relative aspect-square group ${
                        formData.image === asset.url
                          ? 'border-[#D9574F] ring-2 ring-[#D9574F]/40'
                          : 'border-stone-200 hover:border-[#8FA477]'
                      }`}
                      title={asset.name}
                    >
                      <img
                        src={asset.url}
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                      {formData.image === asset.url && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D9574F] text-white flex items-center justify-center text-[9px]">
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mode 3: DIRECT URL INPUT */}
            {imageUploadMethod === 'url' && (
              <div className="space-y-1.5">
                <input
                  type="url"
                  value={formData.image.startsWith('data:') ? '' : formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/... atau link gambar Canva"
                  className="w-full bg-white border-2 border-stone-200 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition"
                />
                <p className="text-[10px] text-stone-500">
                  Tempelkan URL langsung gambar produk yang dapat diakses publik.
                </p>
              </div>
            )}
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
              Tautan disimpan agar Admin mudah mengirimkan link materi ke pembeli di WhatsApp setelah pembayaran.
            </p>
          </div>

          {/* Section Kredensial Privat (Khusus Aplikasi Privat / PKKM) */}
          <div className="bg-[#FAF2E6]/80 p-3 rounded-2xl border border-[#E9899F]/30 space-y-2.5">
            <div className="flex items-center gap-1.5 text-stone-800 font-bold text-xs">
              <Key className="w-3.5 h-3.5 text-[#D9574F]" />
              <span>Akses Login Khusus / Akun Privat (Opsional, misal PKKM)</span>
            </div>
            <p className="text-[10px] text-stone-500">
              Jika produk memerlukan akun login khusus (username & password), masukkan di sini agar otomatis disertakan di pesan balasan WhatsApp pembeli.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-stone-600 font-semibold text-[10px] mb-0.5">
                  Username Akun
                </label>
                <input
                  type="text"
                  value={formData.accessUsername}
                  onChange={(e) => setFormData({ ...formData, accessUsername: e.target.value })}
                  placeholder="Contoh: guru_hebat"
                  className="w-full bg-white border border-[#E9899F]/30 focus:border-[#D9574F] rounded-lg px-2.5 py-1.5 text-stone-800 outline-none font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block text-stone-600 font-semibold text-[10px] mb-0.5">
                  Password Akun
                </label>
                <input
                  type="text"
                  value={formData.accessPassword}
                  onChange={(e) => setFormData({ ...formData, accessPassword: e.target.value })}
                  placeholder="Contoh: pkkm2026"
                  className="w-full bg-white border border-[#E9899F]/30 focus:border-[#D9574F] rounded-lg px-2.5 py-1.5 text-stone-800 outline-none font-mono text-[11px]"
                />
              </div>
            </div>
            <div>
              <label className="block text-stone-600 font-semibold text-[10px] mb-0.5">
                Petunjuk Tambahan Akses Privat
              </label>
              <input
                type="text"
                value={formData.accessNote}
                onChange={(e) => setFormData({ ...formData, accessNote: e.target.value })}
                placeholder="Contoh: Masukkan username dan password di atas pada halaman login aplikasi."
                className="w-full bg-white border border-[#E9899F]/30 focus:border-[#D9574F] rounded-lg px-2.5 py-1.5 text-stone-800 outline-none text-[11px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1">
              Deskripsi Singkat Produk *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Jelaskan isi modul atau kelebihan produk..."
              className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none transition resize-none"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2.5 rounded-xl border-2 border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isCompressing}
              className="cursor-pointer flex-1 py-2.5 rounded-xl bg-[#D9574F] hover:bg-[#c34c44] text-white font-bold retro-box transition disabled:opacity-50"
            >
              {productToEdit ? 'Simpan Perubahan' : 'Tambahkan Produk Baru 🌸'}
            </button>
          </div>
        </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
