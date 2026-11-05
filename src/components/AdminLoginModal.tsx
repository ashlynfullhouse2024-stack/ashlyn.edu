import React, { useState } from 'react';
import { X, Lock, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';

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
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '080406') {
      setError(false);
      setPassword('');
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
              <ShieldCheck className="w-4 h-4 text-[#8FA477]" />
            </div>
            <h3 className="font-brand text-base text-[#D9574F] font-bold">
              Login Mode Admin
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-500 leading-relaxed">
          Masukkan Password Admin untuk mengelola produk katalog, upload gambar langsung, dan mengatur format pesan WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Password Admin
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8FA477] absolute left-3 top-2.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Masukkan password admin..."
                className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl pl-9 pr-10 py-2 text-sm tracking-wider text-stone-800 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 cursor-pointer"
                title={showPassword ? 'Sembunyikan' : 'Tampilkan'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-[11px] text-red-500 font-semibold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Password salah! Gunakan: <strong>080406</strong></span>
              </p>
            )}
            <div className="mt-2 p-2 bg-[#F8EBD8]/60 rounded-xl border border-[#E9899F]/20 text-[11px] text-stone-600 flex items-center justify-between">
              <span>Password Admin:</span>
              <span className="font-mono font-bold text-[#D9574F] bg-white px-2 py-0.5 rounded-lg border border-[#E9899F]/30">
                080406
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-[#D9574F] hover:bg-[#c34c44] text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm active:scale-95 transition retro-box shadow-md"
          >
            Masuk ke Mode Admin 🌸
          </button>
        </form>
      </div>
    </div>
  );
};
