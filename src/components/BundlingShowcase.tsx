import React, { useState } from 'react';
import { Tag, Check, Sparkles, Layers, Plus } from 'lucide-react';
import { formatRupiah, RECOMMENDED_BUNDLES, INITIAL_PRODUCTS, calculateBundlingDiscount } from '../data/initialProducts';

interface BundlingShowcaseProps {
  onAddBundle: (productIds: number[], title: string) => void;
}

export const BundlingShowcase: React.FC<BundlingShowcaseProps> = ({ onAddBundle }) => {
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [selectedCustomIds, setSelectedCustomIds] = useState<number[]>([11, 2, 6]);

  const toggleCustomId = (id: number) => {
    setSelectedCustomIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const customCartItems = INITIAL_PRODUCTS.filter((p) => selectedCustomIds.includes(p.id)).map(
    (p) => ({ id: p.id, price: p.price, qty: 1 })
  );
  const customCalc = calculateBundlingDiscount(customCartItems);

  return (
    <div className="mb-6 space-y-3">
      {/* Title & Custom Bundle Toggle */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#E9899F] text-white flex items-center justify-center text-base shadow-xs">
            🌺
          </div>
          <div>
            <h3 className="font-brand text-base sm:text-lg text-[#D9574F] font-bold leading-tight flex items-center gap-1.5 flex-wrap">
              <span>Paket Bundling Pilihan Guru & Madrasah</span>
              <span className="text-[10px] bg-[#8FA477] text-white px-2 py-0.5 rounded-full font-bold">
                {RECOMMENDED_BUNDLES.length} Paket Hemat • Diskon s/d Rp 50rb
              </span>
            </h3>
            <p className="text-[11px] text-stone-500">
              Kombinasi aplikasi dan modul paling dibutuhkan dengan harga paket otomatis & akses instan
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowCustomBuilder((prev) => !prev)}
          className={`cursor-pointer text-xs font-bold px-3 py-1.5 rounded-xl border-2 transition flex items-center gap-1.5 ${
            showCustomBuilder
              ? 'bg-[#8FA477] text-white border-[#8FA477]'
              : 'bg-white text-[#4d5e3c] border-[#8FA477]/50 hover:border-[#8FA477]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{showCustomBuilder ? 'Tutup Rakitan Paket' : '✨ Rakit Paket Sendiri'}</span>
        </button>
      </div>

      {/* Custom Mix & Match Bundle Builder */}
      {showCustomBuilder && (
        <div className="bg-white rounded-2xl p-4 border-2 border-[#8FA477] shadow-sm space-y-3">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <h4 className="font-brand font-bold text-sm sm:text-base text-[#4d5e3c] flex items-center gap-1.5">
                <span>🎨 Rakit Paket Bundling Sesuai Kebutuhanmu</span>
                <span className="text-[10px] bg-[#F8EBD8] text-[#D9574F] px-2 py-0.5 rounded-lg border border-[#E9899F]/40">
                  Pilih 2 hemat 5% • Pilih 3 hemat 10% • Pilih 4+ hemat 15%
                </span>
              </h4>
              <p className="text-[11px] text-stone-500">
                Centang minimal 2 produk di bawah ini untuk mendapatkan potongan harga otomatis:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
            {INITIAL_PRODUCTS.map((product) => {
              const isChecked = selectedCustomIds.includes(product.id);
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => toggleCustomId(product.id)}
                  className={`cursor-pointer text-left p-2 rounded-xl border transition flex items-center gap-2 ${
                    isChecked
                      ? 'bg-[#FAF2E6] border-[#D9574F] text-stone-800 shadow-2xs'
                      : 'bg-stone-50/70 border-stone-200 text-stone-600 hover:bg-stone-100/70'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                      isChecked
                        ? 'bg-[#D9574F] border-[#D9574F] text-white'
                        : 'bg-white border-stone-300'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold truncate">{product.name}</p>
                    <p className="text-[10px] text-[#D9574F] font-semibold">
                      {formatRupiah(product.price)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[11px] text-stone-500">
                {selectedCustomIds.length} produk dipilih
                {customCalc.discountAmount > 0 && (
                  <strong className="text-emerald-700 ml-1.5">
                    • Hemat {formatRupiah(customCalc.discountAmount)} ({customCalc.discountPercent}%)
                  </strong>
                )}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-brand font-bold text-base sm:text-lg text-[#D9574F]">
                  {formatRupiah(customCalc.total)}
                </span>
                {customCalc.discountAmount > 0 && (
                  <span className="text-xs text-stone-400 line-through">
                    {formatRupiah(customCalc.subtotal)}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              disabled={selectedCustomIds.length === 0}
              onClick={() =>
                onAddBundle(
                  selectedCustomIds,
                  `Paket Custom (${selectedCustomIds.length} Produk)`
                )
              }
              className="cursor-pointer disabled:opacity-40 bg-[#4d5e3c] hover:bg-[#3d4b2f] text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ambil Paket Custom ({selectedCustomIds.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Curated Bundle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {RECOMMENDED_BUNDLES.map((bundle) => {
          const isPkkmBundle = bundle.id === 'bundle-pkkm-edusuite';
          const isNewFeatured = bundle.id === 'bundle-rplumi-edusuite-lkpd';
          return (
            <div
              key={bundle.id}
              className={`bg-white rounded-2xl p-4 border-2 transition-all flex flex-col justify-between shadow-xs relative group ${
                isNewFeatured
                  ? 'md:col-span-2 border-[#D9574F] ring-2 ring-[#E9899F]/30'
                  : 'border-[#E9899F]/30 hover:border-[#D9574F]'
              }`}
            >
              <div>
                {/* Tag Badge */}
                <div className="flex justify-between items-start mb-2">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg border flex items-center gap-1 ${
                      isNewFeatured
                        ? 'bg-[#D9574F] text-white border-[#D9574F]'
                        : 'bg-[#F8EBD8] text-[#D9574F] border-[#E9899F]/40'
                    }`}
                  >
                    <Tag className={`w-3 h-3 ${isNewFeatured ? 'text-white' : 'text-[#D9574F]'}`} />
                    <span>{bundle.tag}</span>
                  </span>
                  <span className="text-2xl select-none">{bundle.emoji}</span>
                </div>

                {/* Title & Description */}
                <div className="space-y-1 mb-2.5">
                  <h4 className="font-brand font-bold text-base text-stone-800 leading-tight">
                    {bundle.title}
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {bundle.description}
                  </p>
                </div>

                {/* Items Included List */}
                <div className="bg-[#FAF2E6]/60 rounded-xl p-2.5 mb-3 border border-[#E9899F]/20 space-y-1 text-[11px]">
                  {bundle.itemsIncluded.map((itemName, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-stone-700 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{itemName}</span>
                    </div>
                  ))}
                  {bundle.highlightBadge && (
                    <div
                      className={`flex items-center gap-1.5 font-bold text-[10px] px-2 py-0.5 rounded-md border mt-1 ${
                        isPkkmBundle
                          ? 'text-purple-700 bg-purple-50 border-purple-200'
                          : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                      }`}
                    >
                      <Sparkles
                        className={`w-3 h-3 shrink-0 ${
                          isPkkmBundle ? 'text-purple-600' : 'text-emerald-600'
                        }`}
                      />
                      <span>{bundle.highlightBadge}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Add Button */}
              <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-emerald-700 font-bold block leading-none">
                    Hemat {formatRupiah(bundle.savingAmount)}
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="font-brand font-bold text-base sm:text-lg text-[#D9574F]">
                      {formatRupiah(bundle.bundlePrice)}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      {formatRupiah(bundle.normalPrice)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onAddBundle(bundle.productIds, bundle.title)}
                  className="cursor-pointer bg-[#D9574F] hover:bg-[#c34c44] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-transform active:scale-95 flex items-center gap-1.5 shadow-xs"
                >
                  <span>+ Ambil Paket</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


