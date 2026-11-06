import React from 'react';

interface HeroBannerProps {
  onExploreCatalog: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreCatalog }) => {
  return (
    <div className="bg-gradient-to-r from-[#E9899F]/20 via-white/85 to-[#EFC653]/20 rounded-3xl p-4 sm:p-5 border-2 border-[#E9899F]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 retro-box mb-5">
      <div className="space-y-1.5 max-w-lg">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] bg-white text-[#D9574F] font-bold px-2.5 py-0.5 rounded-full border border-[#D9574F]/20">
            <span>🌷</span>
            <span>Produk Digital Siap Akses • Format Order Simpel</span>
          </span>
        </div>
        <h2 className="font-brand text-lg sm:text-xl md:text-2xl text-[#D9574F] font-bold leading-tight">
          Modul Ajar & Media Belajar Kreatif! 🌸
        </h2>
        <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed">
          Pilih modul atau perlengkapan kelas yang kamu butuhkan, lalu pesan langsung via WhatsApp admin secara otomatis.
        </p>
      </div>

      <div className="hidden sm:block text-4xl sm:text-5xl md:text-6xl select-none pl-3 shrink-0">
        🌸
      </div>
    </div>
  );
};
