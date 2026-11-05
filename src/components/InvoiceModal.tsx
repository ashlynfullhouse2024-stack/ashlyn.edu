import React from 'react';
import { X, Printer, Download, Flower2, ShieldCheck, Check } from 'lucide-react';
import { CompletedOrder } from '../types';
import { formatRupiah } from '../data/initialProducts';

interface InvoiceModalProps {
  order: CompletedOrder | null;
  onClose: () => void;
}

// Helper to convert number to Indonesian words (Terbilang)
function angkaKeTerbilang(nilai: number): string {
  const bilangan = [
    '', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'
  ];

  if (nilai < 12) return bilangan[nilai];
  if (nilai < 20) return angkaKeTerbilang(nilai - 10) + ' Belas';
  if (nilai < 100) return angkaKeTerbilang(Math.floor(nilai / 10)) + ' Puluh ' + angkaKeTerbilang(nilai % 10);
  if (nilai < 200) return 'Seratus ' + angkaKeTerbilang(nilai - 100);
  if (nilai < 1000) return angkaKeTerbilang(Math.floor(nilai / 100)) + ' Ratus ' + angkaKeTerbilang(nilai % 100);
  if (nilai < 2000) return 'Seribu ' + angkaKeTerbilang(nilai - 1000);
  if (nilai < 1000000) return angkaKeTerbilang(Math.floor(nilai / 1000)) + ' Ribu ' + angkaKeTerbilang(nilai % 1000);
  if (nilai < 1000000000) return angkaKeTerbilang(Math.floor(nilai / 1000000)) + ' Juta ' + angkaKeTerbilang(nilai % 1000000);
  return 'Besar';
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const terbilangText = angkaKeTerbilang(order.totalAmount).trim() + ' Rupiah';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity no-print"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full z-10 overflow-hidden border-2 border-slate-200 flex flex-col max-h-[95vh]">
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="no-print p-4 border-b-2 border-[#E9899F]/30 flex items-center justify-between bg-[#F8EBD8]/60">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#8FA477]" />
            <h3 className="font-brand font-bold text-stone-800 text-sm sm:text-base">
              Faktur Resmi & Kuitansi Pembelian (SPJ Sekolah)
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#D9574F] hover:bg-[#c34c44] text-white rounded-xl text-xs font-bold shadow-xs transition-colors retro-box cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs sm:text-sm custom-scrollbar bg-white">
          {/* Letterhead */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-slate-800 pb-5">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-[#D9574F] text-white flex items-center justify-center text-xl font-brand">
                🌸
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 font-brand">
                  ASHLYN EDU STORE
                </h1>
                <p className="text-xs text-stone-500 font-medium">
                  Penyedia Modul Ajar Tematik & Perlengkapan Belajar Anak
                </p>
                <p className="text-[11px] text-stone-400">
                  ashlyn.edu • WA: +62 878-9513-1563 • email: admin@ashlyn.edu
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block bg-[#F8EBD8] text-[#D9574F] text-xs font-extrabold px-3 py-1 rounded-md mb-1 uppercase tracking-wider border border-[#E9899F]/30">
                Faktur Pembelian
              </span>
              <p className="text-xs font-bold text-stone-800">No. {order.orderId}</p>
              <p className="text-xs text-stone-500">Tanggal: {order.date}</p>
            </div>
          </div>

          {/* Customer Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Diberikan Kepada (Pemesan):
              </span>
              <p className="font-bold text-slate-800 text-sm">{order.customer.name}</p>
              <p className="text-xs text-slate-500 font-mono">{order.customer.phone}</p>
              {order.customer.email && (
                <p className="text-xs text-slate-600">{order.customer.email}</p>
              )}
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Status Pengiriman:
              </span>
              <p className="text-xs text-emerald-700 font-bold">Produk Digital (Akses Langsung via WA)</p>
              <p className="text-xs text-slate-600 mt-1">
                <strong>Metode Bayar:</strong> {order.customer.paymentMethod}
              </p>
            </div>
          </div>

          {/* Table Items */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 text-[11px] font-extrabold text-slate-600 uppercase">
                  <th className="py-2.5 px-2">No</th>
                  <th className="py-2.5 px-2">Nama Barang / Modul Ajar</th>
                  <th className="py-2.5 px-2">Kategori</th>
                  <th className="py-2.5 px-2 text-center">Qty</th>
                  <th className="py-2.5 px-2 text-right">Harga Satuan</th>
                  <th className="py-2.5 px-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {order.items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-2 font-mono text-slate-400">{index + 1}</td>
                    <td className="py-2.5 px-2 font-bold text-slate-800">{item.name}</td>
                    <td className="py-2.5 px-2 text-slate-500">{item.category}</td>
                    <td className="py-2.5 px-2 text-center font-bold">{item.qty}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{formatRupiah(item.price)}</td>
                    <td className="py-2.5 px-2 text-right font-extrabold text-slate-900">
                      {formatRupiah(item.price * item.qty)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-300">
                  <td colSpan={4} className="py-3 px-2 font-semibold text-slate-500 text-right">
                    Total Pembayaran:
                  </td>
                  <td colSpan={2} className="py-3 px-2 text-right font-black text-base text-pink-600">
                    {formatRupiah(order.totalAmount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Terbilang Box */}
          <div className="bg-pink-50/50 border border-pink-200 p-3 rounded-xl text-xs">
            <span className="font-bold text-slate-700">Terbilang: </span>
            <span className="italic font-medium text-pink-800"># {terbilangText} #</span>
          </div>

          {/* Signatures & Stamp */}
          <div className="pt-6 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <p className="text-slate-500 mb-14">Diterima oleh Pihak Sekolah,</p>
              <div className="border-t border-slate-400 w-44 mx-auto pt-1 font-bold text-slate-800">
                ( {order.customer.name} )
              </div>
            </div>

            <div className="relative">
              <p className="text-slate-500 mb-14">Admin Ashlyn Bloom Edu,</p>
              {/* Virtual official stamp */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-2 border-dashed border-pink-500 text-pink-500 flex flex-col items-center justify-center rotate-[-12deg] opacity-70 pointer-events-none text-[8px] font-black uppercase">
                <span>ASHLYN EDU</span>
                <span className="text-[7px]">VERIFIED</span>
                <Check className="w-3.5 h-3.5" />
              </div>
              <div className="border-t border-slate-400 w-44 mx-auto pt-1 font-bold text-slate-800">
                ( Pengelola Toko )
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
