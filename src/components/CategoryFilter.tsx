import React from 'react';
import { ProductCategory, Product } from '../types';

interface CategoryFilterProps {
  categories: readonly string[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  products: Product[];
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  products,
  sortBy,
  onSortChange
}) => {
  const getCount = (cat: string) => {
    if (cat === 'Semua') return products.length;
    return products.filter(p => p.category === cat).length;
  };

  const getEmoji = (cat: string) => {
    switch (cat) {
      case 'Aplikasi & Administrasi':
        return '💻';
      case 'Template Canva':
        return '🎨';
      case 'Prompt AI Edukasi':
        return '🤖';
      case 'Materi Ajar & LKPD':
        return '📚';
      case 'Free Resources':
        return '🎁';
      default:
        return '🌸';
    }
  };

  return (
    <div className="space-y-3 mb-5">
      {/* Category Pills Lilnami Style */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          const count = getCount(cat);

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat as ProductCategory)}
              className={`cursor-pointer whitespace-nowrap px-3.5 py-1.5 rounded-2xl text-xs font-bold border-2 transition active:scale-95 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#D9574F] text-white border-[#D9574F] retro-box'
                  : 'bg-white text-stone-700 border-[#E9899F]/30 hover:border-[#D9574F]'
              }`}
            >
              <span>{getEmoji(cat)}</span>
              <span>{cat === 'Semua' ? 'Semua Produk' : cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-[#E9899F]/20 text-[#D9574F]'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Title & Sort Bar */}
      <div className="flex items-center justify-between pt-1">
        <h3 className="font-brand text-sm sm:text-base text-[#D9574F] flex items-center gap-1.5 font-bold">
          <span>Katalog Produk</span>
          <span className="text-[11px] bg-[#E9899F] text-white px-2 py-0.5 rounded-full font-sans font-semibold">
            {selectedCategory === 'Semua' ? products.length : products.filter(p => p.category === selectedCategory).length}
          </span>
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <span className="text-[11px] hidden sm:inline">Urutkan:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-white border-2 border-[#E9899F]/30 rounded-xl px-2.5 py-1 text-xs text-stone-700 font-medium outline-none cursor-pointer focus:border-[#D9574F]"
          >
            <option value="featured">Paling Populer</option>
            <option value="price-low">Harga Termurah</option>
            <option value="price-high">Harga Tertinggi</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="name">Nama A - Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};
