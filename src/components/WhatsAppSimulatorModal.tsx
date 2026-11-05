import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  Settings, 
  Eye, 
  PhoneCall, 
  ExternalLink,
  CreditCard,
  Building2,
  CheckCheck,
  Plus,
  Trash2,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { StoreSettings, BankAccount } from '../types';
import { cleanWaPhone, generateWaOrderText, formatRupiah } from '../data/initialProducts';

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
  const [activeTab, setActiveTab] = useState<'preview' | 'settings'>('preview');
  const [previewType, setPreviewType] = useState<'order' | 'inquiry'>('order');
  const [currentSettings, setCurrentSettings] = useState<StoreSettings>(settings);
  const [copied, setCopied] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  // Sync internal state if prop updates
  React.useEffect(() => {
    setCurrentSettings(settings);
  }, [settings]);

  if (!isOpen) return null;

  // Sample order matching user request
  const sampleOrder = {
    orderId: 'ASH-9041',
    date: 'Hari ini',
    items: [
      { name: 'Capcut Private (7 hari)', qty: 1, price: 10000 }
    ],
    totalAmount: 10000,
    customer: {
      name: 'Anis',
      phone: '082213283648',
      paymentMethod: 'QRIS / Bank BCA Only',
      isQuestionOnly: previewType === 'inquiry',
      questionText: 'Halo kak, akun Capcut Private ini bisa dipakai di berapa device ya? Terima kasih!'
    }
  };

  const formattedMessage = generateWaOrderText(sampleOrder, currentSettings);
  const cleanedTargetPhone = cleanWaPhone(currentSettings.whatsappNumber);
  const testWaUrl = `https://wa.me/${cleanedTargetPhone}?text=${encodeURIComponent(formattedMessage)}`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveSettings(currentSettings);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  };

  const handleAddBank = () => {
    const newBank: BankAccount = {
      bankName: 'BSI',
      accountNumber: '7123456789',
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

      <div className="relative bg-[#F8EBD8] w-full max-w-2xl rounded-3xl border-2 border-[#E9899F]/40 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Header */}
        <div className="bg-white px-4 py-3 border-b-2 border-[#E9899F]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#25D366] text-white flex items-center justify-center text-lg shadow-sm">
              <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
            </div>
            <div>
              <h3 className="font-brand text-base sm:text-lg text-[#D9574F] font-bold leading-tight">
                Fitur Pesan WhatsApp & Pengaturan Order
              </h3>
              <p className="text-[11px] text-stone-500">
                Lihat rincian pesan yang masuk ke WA & edit data toko
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

        {/* Tab Navigation */}
        <div className="bg-[#FAF2E6] px-4 pt-2.5 border-b border-[#E9899F]/20 flex gap-2">
          <button
            onClick={() => setActiveTab('preview')}
            className={`cursor-pointer px-4 py-2 rounded-t-xl text-xs font-bold transition flex items-center gap-1.5 border-t-2 border-x-2 ${
              activeTab === 'preview'
                ? 'bg-white border-[#E9899F]/40 text-[#D9574F] -mb-[1px]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Simulasi Chat WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`cursor-pointer px-4 py-2 rounded-t-xl text-xs font-bold transition flex items-center gap-1.5 border-t-2 border-x-2 ${
              activeTab === 'settings'
                ? 'bg-white border-[#E9899F]/40 text-[#D9574F] -mb-[1px]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Edit Nomor WA & Rekening Bank</span>
            {savedFeedback && (
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded-full font-bold">
                Tersimpan
              </span>
            )}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {activeTab === 'preview' ? (
            <div className="space-y-3">
              {/* Toggle Format Order vs Tanya Dulu */}
              <div className="max-w-md mx-auto grid grid-cols-2 gap-2 bg-white/70 p-1 rounded-2xl border border-[#E9899F]/30">
                <button
                  type="button"
                  onClick={() => setPreviewType('order')}
                  className={`cursor-pointer py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                    previewType === 'order'
                      ? 'bg-[#D9574F] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>🍓</span>
                  <span>Pesan Order Baru</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewType('inquiry')}
                  className={`cursor-pointer py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                    previewType === 'inquiry'
                      ? 'bg-[#8FA477] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>💬</span>
                  <span>Pesan Tanya Dulu</span>
                </button>
              </div>

              {/* WhatsApp Phone Mockup */}
              <div className="max-w-md mx-auto rounded-3xl overflow-hidden border-4 border-stone-800 shadow-xl bg-[#efeae2]">
                {/* WA Top Bar */}
                <div className="bg-[#075E54] text-white px-3.5 py-2.5 flex items-center justify-between select-none">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-sm font-bold">
                      🌸
                    </div>
                    <div>
                      <h4 className="text-xs font-bold leading-tight">
                        {currentSettings.storeName}
                      </h4>
                      <p className="text-[9px] text-emerald-200 leading-none">
                        online • WhatsApp Business
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-white/90">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span className="text-xs">⋮</span>
                  </div>
                </div>

                {/* Date separator */}
                <div className="py-2 text-center">
                  <span className="bg-white/80 text-stone-600 text-[10px] font-semibold px-2.5 py-0.5 rounded-md shadow-2xs">
                    HARI INI
                  </span>
                </div>

                {/* Chat Bubble Area */}
                <div className="p-3">
                  <div className="bg-[#e7ffdb] rounded-2xl rounded-tr-xs p-3.5 shadow-sm text-stone-800 max-w-[95%] ml-auto border border-[#b2e2a0]/40 space-y-2">
                    <div className="text-[11px] leading-relaxed whitespace-pre-wrap font-sans text-stone-800">
                      {formattedMessage}
                    </div>

                    <div className="flex items-center justify-end gap-1 text-[9px] text-stone-500 pt-1">
                      <span>10:35</span>
                      <CheckCheck className="w-3 h-3 text-[#34B7F1]" />
                    </div>
                  </div>
                </div>

                {/* WA Input Bar Fake */}
                <div className="bg-[#f0f2f5] p-2 flex items-center gap-2 border-t border-stone-200">
                  <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[10px] text-stone-400">
                    Ketik pesan...
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#128C7E] flex items-center justify-center text-white">
                    <Send className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Action Buttons for Testing */}
              <div className="max-w-md mx-auto space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={testWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Test Kirim ke WA Asli</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={handleCopyText}
                    className="cursor-pointer py-2.5 px-3 rounded-xl bg-white border-2 border-[#E9899F]/40 hover:bg-[#F8EBD8]/50 text-stone-700 text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#D9574F]" />
                        <span>Salin Format Pesan</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-white/80 border border-[#E9899F]/30 rounded-2xl p-3 text-[11px] text-stone-600 space-y-1">
                  <div className="font-bold text-[#D9574F] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tujuan WhatsApp Sekarang:</span>
                  </div>
                  <p>
                    Nomor: <strong className="font-mono text-stone-800">{currentSettings.whatsappNumber}</strong> (Terkonversi jadi <span className="font-mono text-emerald-700">+{cleanedTargetPhone}</span>)
                  </p>
                  <p className="text-[10px] text-stone-500">
                    Ingin menggunakan nomor WhatsApp Anda sendiri? Buka tab <strong>"Edit Nomor WA & Rekening Bank"</strong> di atas.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Settings Tab */
            <div className="max-w-lg mx-auto space-y-4 text-xs">
              {/* WhatsApp Target Phone */}
              <div className="bg-white rounded-2xl p-4 border-2 border-[#E9899F]/30 space-y-2">
                <label className="font-bold text-stone-800 flex items-center gap-1.5 text-xs">
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Nomor WhatsApp Toko (Penerima Pesanan) *</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentSettings.whatsappNumber}
                    onChange={(e) =>
                      setCurrentSettings({ ...currentSettings, whatsappNumber: e.target.value })
                    }
                    placeholder="Contoh: 081234567890 atau 6281234567890"
                    className="flex-1 bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#E9899F]/40 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none font-mono"
                  />
                </div>
                <p className="text-[10px] text-stone-500">
                  Format bebas (bisa diawali 08... atau 628...). Sistem akan otomatis memformat menjadi tautan resmi WhatsApp <code>wa.me/628...</code>.
                </p>
              </div>

              {/* Bank Accounts Section */}
              <div className="bg-white rounded-2xl p-4 border-2 border-[#8FA477]/40 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-stone-800 flex items-center gap-1.5 text-xs">
                    <CreditCard className="w-4 h-4 text-[#8FA477]" />
                    <span>Daftar Rekening Bank & E-Wallet</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddBank}
                    className="cursor-pointer text-[11px] bg-[#8FA477] hover:bg-[#7b9165] text-white px-2.5 py-1 rounded-lg font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Tambah Rekening</span>
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
                          value={bank.bankName}
                          onChange={(e) => handleUpdateBank(index, 'bankName', e.target.value)}
                          placeholder="Bank (BCA/BRI)"
                          className="w-full bg-white border border-stone-200 rounded-lg px-2 py-1 text-xs font-bold"
                        />
                      </div>
                      <div className="col-span-5">
                        <input
                          type="text"
                          value={bank.accountNumber}
                          onChange={(e) => handleUpdateBank(index, 'accountNumber', e.target.value)}
                          placeholder="Nomor Rekening"
                          className="w-full bg-white border border-stone-200 rounded-lg px-2 py-1 text-xs font-mono"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
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
                          className="text-stone-400 hover:text-red-500 p-1"
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
                    Sertakan instruksi nomor rekening otomatis dalam format pesan WhatsApp
                  </label>
                </div>
              </div>

              {/* Greeting & Closing Template */}
              <div className="bg-white rounded-2xl p-4 border-2 border-[#E9899F]/30 space-y-3">
                <label className="font-bold text-stone-800 block text-xs">
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

                <label className="font-bold text-stone-800 block text-xs">
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

              {/* Shopee & Link Info */}
              <div className="bg-white rounded-2xl p-4 border-2 border-[#EFC653]/60 space-y-2">
                <label className="font-bold text-stone-800 block text-xs">
                  Link Toko Shopee ("Beli dari Shopee")
                </label>
                <input
                  type="url"
                  value={currentSettings.shopeeUrl}
                  onChange={(e) =>
                    setCurrentSettings({ ...currentSettings, shopeeUrl: e.target.value })
                  }
                  placeholder="https://shopee.co.id/ashlyn.edu"
                  className="w-full bg-[#F8EBD8]/30 focus:bg-white border-2 border-[#EFC653]/50 focus:border-[#D9574F] rounded-xl px-3 py-2 text-stone-800 outline-none"
                />
              </div>

              {/* Save Button */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className="px-4 py-2.5 rounded-xl border-2 border-stone-200 text-stone-600 font-bold"
                >
                  Lihat Hasil
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="cursor-pointer flex-1 py-2.5 rounded-xl bg-[#D9574F] hover:bg-[#c34c44] text-white font-bold retro-box transition flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Perubahan Pengaturan 🌸</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="bg-stone-100 px-4 py-2 text-[10px] text-stone-500 border-t border-stone-200 flex items-center justify-between">
          <span>Ashlyn Edu Web Order System</span>
          <span>Siap kirim ke WhatsApp pembeli & admin</span>
        </div>
      </div>
    </div>
  );
};
