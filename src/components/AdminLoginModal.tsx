import React, { useState } from 'react';
import { X, KeyRound, GraduationCap, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setError(false);
      setPin('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-sm w-full z-10 overflow-hidden border-2 border-[#E9899F]/30 shadow-2xl p-5 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#8FA477]/20 text-[#4d5e3c] flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="font-brand text-base text-[#D9574F] font-bold">
              Mode Guru / Pengelola
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-500 leading-relaxed">
          Masukkan PIN untuk mengelola katalog, mengubah harga, atau menambah materi ajar baru.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              PIN Guru
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#8FA477] absolute left-3 top-2.5" />
              <input
                type="password"
                required
                autoFocus
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="PIN bawaan: 1234"
                className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl pl-9 pr-3 py-2 text-sm tracking-widest text-stone-800 outline-none transition"
              />
            </div>
            {error && (
              <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>PIN salah! Coba ketik: <strong>1234</strong></span>
              </p>
            )}
            <p className="text-[10px] text-stone-400 mt-1">
              * Demo: Masukkan PIN <strong>1234</strong>
            </p>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-[#D9574F] hover:bg-[#c34c44] text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm active:scale-95 transition retro-box"
          >
            Buka Pengelola Katalog 🌸
          </button>
        </form>
      </div>
    </div>
  );
};
