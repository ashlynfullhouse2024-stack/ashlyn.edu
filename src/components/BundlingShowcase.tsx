import React from 'react';
import { Sparkles, ArrowRight, Check, Tag } from 'lucide-react';
import { BundlePackage } from '../types';
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
              Paket Bundling Lebih Hemat
              <span className="text-[10px] bg-[#8FA477] text-white px-2 py-0.5 rounded-full font-bold">
                Auto Diskon
              </span>
            </h3>
            <p className="text-[11px] text-stone-500">
              Beli paket kumpulan modul sekaligus, langsung hemat hingga Rp 38.000
            </p>
          </div>
        </div>
      </div>

      {/* 3 Bundle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {RECOMMENDED_BUNDLES.map((bundle) => (
          <div
            key={bundle.id}
            className="bg-white rounded-2xl p-3.5 border-2 border-[#E9899F]/30 hover:border-[#D9574F] transition-all flex flex-col justify-between shadow-xs relative group"
          >
            {/* Tag Badge */}
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold bg-[#F8EBD8] text-[#D9574F] px-2 py-0.5 rounded-lg border border-[#E9899F]/40 flex items-center gap-1">
                <Tag className="w-3 h-3 text-[#D9574F]" />
                <span>{bundle.tag}</span>
              </span>
              <span className="text-xl select-none">{bundle.emoji}</span>
            </div>

            {/* Title & Description */}
            <div className="space-y-1 mb-3">
              <h4 className="font-brand font-bold text-sm text-stone-800 leading-tight">
                {bundle.title}
              </h4>
              <p className="text-[11px] text-stone-600 leading-relaxed line-clamp-2">
                {bundle.description}
              </p>
            </div>

            {/* Price & Add Button */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] text-emerald-700 font-bold block leading-none">
                  Hemat {formatRupiah(bundle.savingAmount)}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-brand font-bold text-sm sm:text-base text-[#D9574F]">
                    {formatRupiah(bundle.bundlePrice)}
                  </span>
                  <span className="text-[10px] text-stone-400 line-through">
                    {formatRupiah(bundle.normalPrice)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onAddBundle(bundle.productIds, bundle.title)}
                className="cursor-pointer bg-[#D9574F] hover:bg-[#c34c44] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-transform active:scale-95 flex items-center gap-1 shadow-xs"
              >
                <span>+ Ambil</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
