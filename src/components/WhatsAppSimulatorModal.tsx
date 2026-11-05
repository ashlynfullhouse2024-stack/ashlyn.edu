import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  CreditCard, 
  Plus, 
  Trash2, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { StoreSettings, BankAccount } from '../types';
import { cleanWaPhone, generateWaOrderText } from '../data/initialProducts';

interface WhatsAppSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: StoreSettings;
  onSaveSettings: (settings: StoreSettings) => void;
}

export const WhatsAppSimulatorModal: React.FC<WhatsAppSimulatorModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings
}) => {
  const [currentSettings, setCurrentSettings] = useState<StoreSettings>(settings);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  React.useEffect(() => {
    setCurrentSettings(settings);
  }, [settings]);

  if (!isOpen) return null;

  const sampleOrder = {
    orderId: 'ASH-2026-9041',
    date: 'Hari ini',
    items: [
      { name: 'Modul Ajar Tematik Kreatif', qty: 1, price: 50000 }
    ],
    totalAmount: 50000,
    customer: {
      name: 'Ibu Rahmawati',
      phone: '081234567890',
      paymentMethod: 'Transfer Bank (BCA)',
      isQuestionOnly: false
    }
  };

  const sampleFormattedMessage = generateWaOrderText(sampleOrder, currentSettings);
  const cleanedTargetPhone = cleanWaPhone(currentSettings.whatsappNumber);

  const handleCopyText = () => {
    navigator.clipboard.writeText(sampleFormattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(currentSettings);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  };

  const handleAddBank = () => {
    const newBank: BankAccount = {
      bankName: 'BCA',
      accountNumber: '',
      accountHolder: currentSettings.storeName
    };
    setCurrentSettings({
      ...currentSettings,
      bankAccounts: [...currentSettings.bankAccounts, newBank]
    });
  };

  const handleUpdateBank = (index: number, field: keyof BankAccount, value: string) => {
    const updated = [...currentSettings.bankAccounts];
    updated[index] = { ...updated[index], [field]: value };
    setCurrentSettings({ ...currentSettings, bankAccounts: updated });
  };

  const handleRemoveBank = (index: number) => {
    const updated = currentSettings.bankAccounts.filter((_, i) => i !== index);
    setCurrentSettings({ ...currentSettings, bankAccounts: updated });
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#F8EBD8] w-full max-w-xl rounded-3xl border-2 border-[#E9899F]/40 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-white px-4 py-3 border-b-2 border-[#E9899F]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#25D366] text-white flex items-center justify-center text-lg shadow-sm">
              <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
            </div>
            <div>
              <h3 className="font-brand text-base sm:text-lg text-[#D9574F] font-bold leading-tight">
                Pengaturan WhatsApp & Rekening Toko (Mode Admin)
              </h3>
              <p className="text-[11px] text-stone-500">
                Atur nomor WhatsApp admin penerima pesanan dan daftar rekening pembayaran
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer text-stone-400 hover:text-stone-700 p-1.5 rounded-xl hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Direct Admin Settings, NO confusing tabs */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3.5 text-xs">
          {/* 1. WhatsApp Target Phone */}
          <div className="bg-white rounded-2xl p-4 border-2 border-[#E9899F]/30 space-y-2">
            <label className="font-bold text-stone-800 flex items-center gap-1.5 text-xs">
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Nomor WhatsApp Toko (Penerima Pesanan Customer) *</span>
            </label>
            <input
              type="text"
              required
              value={currentSettings.whatsappNumber}
              onChange={(e) =>
                setCurrentSettings({ ...currentSettings, whatsappNumber: e.target.value })
              }
              placeholder="Contoh: 087895131563"
              className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/40 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none font-mono text-sm"
            />
            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-0.5">
              <span>Tautan link yang dibentuk sistem:</span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                wa.me/{cleanedTargetPhone}
              </span>
            </div>
          </div>

          {/* 2. Bank Accounts Section */}
          <div className="bg-white rounded-2xl p-4 border-2 border-[#8FA477]/40 space-y-3">
            <div className="flex justify-between items-center">
              <label className="font-bold text-stone-800 flex items-center gap-1.5 text-xs">
                <CreditCard className="w-4 h-4 text-[#8FA477]" />
                <span>Daftar Rekening Bank & E-Wallet Pembayaran</span>
              </label>
              <button
                type="button"
                onClick={handleAddBank}
                className="cursor-pointer text-[11px] bg-[#8FA477] hover:bg-[#7b9165] text-white px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 shadow-xs"
              >
                <Plus className="w-3 h-3" />
                <span>+ Tambah Bank</span>
              </button>
            </div>

            <div className="space-y-2">
              {currentSettings.bankAccounts.map((bank, index) => (
                <div
                  key={index}
                  className="bg-[#F8EBD8]/40 border border-[#8FA477]/30 rounded-xl p-2.5 grid grid-cols-12 gap-2 items-center"
                >
                  <div className="col-span-3">
                    <input
                      type="text"
                      required
                      value={bank.bankName}
                      onChange={(e) => handleUpdateBank(index, 'bankName', e.target.value)}
                      placeholder="Bank / E-Wallet (BCA/BRI)"
                      className="w-full bg-white border border-stone-200 rounded-lg px-2 py-1 text-xs font-bold"
                    />
                  </div>
                  <div className="col-span-5">
                    <input
                      type="text"
                      required
                      value={bank.accountNumber}
                      onChange={(e) => handleUpdateBank(index, 'accountNumber', e.target.value)}
                      placeholder="Nomor Rekening"
                      className="w-full bg-white border border-stone-200 rounded-lg px-2 py-1 text-xs font-mono"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      required
                      value={bank.accountHolder}
                      onChange={(e) => handleUpdateBank(index, 'accountHolder', e.target.value)}
                      placeholder="Atas Nama"
                      className="w-full bg-white border border-stone-200 rounded-lg px-2 py-1 text-xs"
                    />
                  </div>
                  <div className="col-span-1 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveBank(index)}
                      className="cursor-pointer text-stone-400 hover:text-red-500 p-1"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-1 flex items-center gap-2">
              <input
                type="checkbox"
                id="includeBankToggle"
                checked={currentSettings.includeBankInWa}
                onChange={(e) =>
                  setCurrentSettings({ ...currentSettings, includeBankInWa: e.target.checked })
                }
                className="accent-[#8FA477] cursor-pointer"
              />
              <label htmlFor="includeBankToggle" className="text-[11px] text-stone-700 cursor-pointer">
                Sertakan daftar nomor rekening otomatis dalam format pesan WhatsApp pesanan
              </label>
            </div>
          </div>

          {/* 3. Greeting & Closing Template */}
          <div className="bg-white rounded-2xl p-4 border-2 border-[#E9899F]/30 space-y-3">
            <div>
              <label className="font-bold text-stone-800 block text-xs mb-1">
                Salam Pembuka Chat WA
              </label>
              <textarea
                rows={2}
                value={currentSettings.greetingTemplate}
                onChange={(e) =>
                  setCurrentSettings({ ...currentSettings, greetingTemplate: e.target.value })
                }
                className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none resize-none font-sans"
              />
            </div>

            <div>
              <label className="font-bold text-stone-800 block text-xs mb-1">
                Pesan Penutup Chat WA
              </label>
              <textarea
                rows={2}
                value={currentSettings.footerTemplate}
                onChange={(e) =>
                  setCurrentSettings({ ...currentSettings, footerTemplate: e.target.value })
                }
                className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/30 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none resize-none font-sans"
              />
            </div>
          </div>

          {/* 4. Collapsible Preview of Format Pesan */}
          <div className="bg-white/80 rounded-2xl border border-[#E9899F]/30 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="cursor-pointer w-full p-3 flex items-center justify-between text-xs font-bold text-stone-700 hover:bg-[#F8EBD8]/40 transition"
            >
              <span className="flex items-center gap-1.5 text-[#D9574F]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Lihat Contoh Format Teks yang Dikirim Customer ke WA</span>
              </span>
              {showPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showPreview && (
              <div className="p-3 pt-0 space-y-2 border-t border-[#E9899F]/20">
                <pre className="text-[11px] text-stone-700 font-mono whitespace-pre-wrap bg-[#F8EBD8]/40 p-3 rounded-xl border border-[#E9899F]/20 leading-relaxed max-h-48 overflow-y-auto custom-scrollbar">
                  {sampleFormattedMessage}
                </pre>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="cursor-pointer text-[11px] font-bold text-[#D9574F] flex items-center gap-1 hover:underline"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin Contoh Format</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2.5 rounded-xl border-2 border-stone-200 text-stone-600 font-bold hover:bg-stone-50"
            >
              Tutup
            </button>
            <button
              type="submit"
              className="cursor-pointer flex-1 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold retro-box transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Pengaturan WA & Bank 🌸</span>
            </button>
          </div>

          {savedFeedback && (
            <p className="text-center text-xs font-bold text-emerald-700 bg-emerald-50 py-1.5 rounded-xl border border-emerald-200 animate-fade-in">
              ✓ Pengaturan WhatsApp & Rekening berhasil diperbarui!
            </p>
          )}
        </form>

        {/* Footer info bar */}
        <div className="bg-stone-100 px-4 py-2 text-[10px] text-stone-500 border-t border-stone-200 flex items-center justify-between">
          <span>Ashlyn Edu Admin Console</span>
          <span>Tersimpan di browser lokal</span>
        </div>
      </div>
    </div>
  );
};
