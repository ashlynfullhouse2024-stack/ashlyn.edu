import React from 'react';
import { Tag, Check, Sparkles } from 'lucide-react';
import { formatRupiah, RECOMMENDED_BUNDLES } from '../data/initialProducts';

interface BundlingShowcaseProps {
  onAddBundle: (productIds: number[], title: string) => void;
}

export const BundlingShowcase: React.FC<BundlingShowcaseProps> = ({ onAddBundle }) => {
  return (
    <div className="mb-6 space-y-3">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#E9899F] text-white flex items-center justify-center text-base shadow-xs">
            🍓
          </div>
          <div>
            <h3 className="font-brand text-base sm:text-lg text-[#D9574F] font-bold leading-tight flex items-center gap-1.5">
              Paket Bundling Pilihan Guru & Madrasah
              <span className="text-[10px] bg-[#8FA477] text-white px-2 py-0.5 rounded-full font-bold">
                Hemat s/d Rp 49rb
              </span>
            </h3>
            <p className="text-[11px] text-stone-500">
              Kombinasi aplikasi dan modul paling dibutuhkan dengan diskon otomatis & akses instan
            </p>
          </div>
        </div>
      </div>

      {/* 2 Bundle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {RECOMMENDED_BUNDLES.map((bundle) => {
          const isPkkmBundle = bundle.id === 'bundle-pkkm-edusuite';
          return (
            <div
              key={bundle.id}
              className="bg-white rounded-2xl p-4 border-2 border-[#E9899F]/30 hover:border-[#D9574F] transition-all flex flex-col justify-between shadow-xs relative group"
            >
              <div>
                {/* Tag Badge */}
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold bg-[#F8EBD8] text-[#D9574F] px-2.5 py-0.5 rounded-lg border border-[#E9899F]/40 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-[#D9574F]" />
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
                  {bundle.id === 'bundle-edusuite-lkpd' ? (
                    <>
                      <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Aplikasi Pembuat RPP Guru (EduSuite AI)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Prompt LKPD sekali beli untuk selamanya (LKPD AI)</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Generator Bukti Fisik PKKM 2026 AI</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-purple-700 font-bold text-[10px] bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                        <Sparkles className="w-3 h-3 text-purple-600 shrink-0" />
                        <span>Termasuk 1 Akun Lisensi Privat (Username & Password)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Aplikasi Pembuat RPP Guru (EduSuite AI)</span>
                      </div>
                    </>
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

