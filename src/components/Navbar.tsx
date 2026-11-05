import React from 'react';
import { 
  ShoppingBag, 
  Search, 
  ShieldCheck, 
  Lock, 
  X
} from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onSelectCategory: (cat: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  isAdmin,
  onToggleAdmin,
  onSelectCategory
}) => {
  return (
    <>
      {/* 1. Header Pengumuman Manis (Lilnami Style) */}
      <div className="bg-[#E9899F] text-white text-[11px] sm:text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-1.5 select-none">
        <span>🌸</span>
        <span>Koleksi Modul Ajar Kreatif & Perlengkapan Kelas Ceria • Ashlyn Edu ୨ৎ</span>
      </div>

      {/* 2. Sticky Navbar Lilnami Aesthetic */}
      <nav className="sticky top-0 bg-[#F8EBD8]/95 backdrop-blur-md border-b-2 border-[#E9899F]/30 z-30 px-3 sm:px-4 py-2.5 sm:py-3 transition-colors">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2.5 sm:gap-3">
          {/* Brand Logo */}
          <div 
            onClick={() => onSelectCategory('Semua')}
            className="flex items-center gap-2 cursor-pointer select-none shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#D9574F] text-white flex items-center justify-center text-lg sm:text-xl font-brand border-2 border-white retro-box">
              🌸
            </div>
            <div>
              <h1 className="font-brand text-base sm:text-lg text-[#D9574F] font-bold leading-tight flex items-center gap-1.5">
                Ashlyn Edu 
                <span className="text-[9px] sm:text-[10px] bg-[#EFC653] text-[#714f08] px-1.5 py-0.5 rounded-full font-bold">
                  Web Order
                </span>
              </h1>
              <p className="text-[10px] sm:text-[11px] text-[#8FA477] font-semibold leading-none">
                by ashlyn.edu
              </p>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center relative flex-1 max-w-sm mx-2">
            <Search className="w-4 h-4 absolute left-3.5 text-[#8FA477] pointer-events-none" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari modul, alat peraga, stiker..." 
              className="w-full pl-9 pr-8 py-2 rounded-2xl bg-white border-2 border-[#E9899F]/40 focus:border-[#D9574F] focus:outline-none text-xs text-stone-700 placeholder-stone-400 retro-box transition"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mode Admin Button */}
            <button
              type="button"
              onClick={onToggleAdmin}
              className={`cursor-pointer text-xs font-bold px-2.5 sm:px-3 py-2 rounded-xl border-2 transition flex items-center gap-1.5 active:scale-95 ${
                isAdmin 
                  ? 'bg-[#8FA477] text-white border-[#8FA477]' 
                  : 'bg-white text-stone-700 border-stone-300 hover:border-[#8FA477] hover:text-[#4d5e3c] retro-box'
              }`}
              title={isAdmin ? "Keluar dari Mode Admin" : "Masuk ke Mode Admin"}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span className="text-[11px] sm:text-xs">Admin (Aktif)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#8FA477]" />
                  <span className="text-[11px] sm:text-xs hidden sm:inline">Mode Admin</span>
                  <span className="text-[11px] sm:hidden">Admin</span>
                </>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="cursor-pointer relative p-2 sm:px-3 sm:py-2 rounded-xl bg-[#D9574F] hover:bg-[#c34c44] text-white retro-box active:scale-95 transition flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="text-xs font-bold font-brand hidden sm:inline">Keranjang</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#EFC653] text-[#714f08] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden px-1 pt-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8FA477] pointer-events-none" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari modul, alat peraga, stiker..." 
              className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-white border-2 border-[#E9899F]/40 focus:border-[#D9574F] text-xs text-stone-700 outline-none placeholder-stone-400"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2 text-stone-400"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
