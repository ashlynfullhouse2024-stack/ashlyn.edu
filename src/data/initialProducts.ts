import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "PKKM Bikin Stres???",
    category: "Aplikasi & Administrasi",
    price: 149000,
    originalPrice: 199000,
    rating: 5.0,
    reviews: 148,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    description: "Bantu siapkan berkas PKKM dengan lebih praktis dan mudah disesuaikan.",
    badge: "Diskon Spesial",
    curriculum: "Administrasi Kepala Sekolah",
    inStock: true
  },
  {
    id: 2,
    name: "Aplikasi Pembuat RPP Guru",
    category: "Aplikasi & Administrasi",
    price: 99000,
    originalPrice: 199000,
    rating: 4.9,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    description: "Buat RPP dengan bantuan AI menggunakan API Key pribadi.",
    badge: "Best Seller",
    curriculum: "Kurikulum Merdeka",
    inStock: true
  },
  {
    id: 3,
    name: "Study Notes",
    category: "Materi Ajar & LKPD",
    price: 25000,
    rating: 4.8,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    description: "Susun materi belajar menjadi catatan, peta konsep, ringkasan, atau slide.",
    curriculum: "Literasi Belajar",
    inStock: true
  },
  {
    id: 4,
    name: "LKPD Gamification AI",
    category: "Prompt AI Edukasi",
    price: 49000,
    originalPrice: 200000,
    rating: 5.0,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    description: "Rancang LKPD interaktif dengan pendekatan gamifikasi dan bantuan AI.",
    badge: "Hemat 75%",
    curriculum: "Active Learning",
    inStock: true
  },
  {
    id: 5,
    name: "Asisten Guru Pintar: Guru Mapel, Wali Kelas, Guru Ekskul harus coba!!",
    category: "Aplikasi & Administrasi",
    price: 99000,
    originalPrice: 150000,
    rating: 4.9,
    reviews: 175,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    description: "Asisten digital untuk mendukung tugas guru mata pelajaran, wali kelas, dan pembina ekskul.",
    badge: "Wajib Coba",
    curriculum: "Manajemen Sekolah",
    inStock: true
  },
  {
    id: 6,
    name: "Prompt LKPD sekali beli untuk selamanya",
    category: "Prompt AI Edukasi",
    price: 45000,
    rating: 4.9,
    reviews: 190,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
    description: "Kumpulan prompt untuk membantu menyusun LKPD kapan saja.",
    badge: "Sekali Beli",
    curriculum: "AI Education",
    inStock: true
  },
  {
    id: 7,
    name: "Aplikasi Guru Piket",
    category: "Aplikasi & Administrasi",
    price: 45000,
    originalPrice: 99000,
    rating: 4.8,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    description: "Bantu kelola kegiatan dan administrasi piket guru.",
    curriculum: "Tata Tertib Sekolah",
    inStock: true
  },
  {
    id: 8,
    name: "Inklusi Studio untuk Guru BK",
    category: "Aplikasi & Administrasi",
    price: 45000,
    originalPrice: 99000,
    rating: 4.9,
    reviews: 82,
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80",
    description: "Perangkat bantu untuk mendukung layanan BK dan kebutuhan pendidikan inklusif.",
    curriculum: "Bimbingan Konseling",
    inStock: true
  },
  {
    id: 9,
    name: "Template Canva untuk Guru",
    category: "Template Canva",
    price: 25000,
    rating: 4.9,
    reviews: 150,
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=600&q=80",
    description: "Template Canva praktis untuk membantu menyiapkan kebutuhan mengajar.",
    badge: "Canva Siap Pakai",
    curriculum: "Canva Template",
    inStock: true
  },
  {
    id: 10,
    name: "Teacher Dashboard Canva Template | Administrasi Guru Aesthetic Pastel",
    category: "Template Canva",
    price: 30000,
    originalPrice: 50000,
    rating: 5.0,
    reviews: 260,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80",
    description: "Dashboard administrasi guru dengan desain pastel yang rapi dan menarik.",
    badge: "Aesthetic",
    curriculum: "Canva Template",
    inStock: true
  },
  {
    id: 11,
    name: "Prompt Generator RPP All-In (Semua Jenjang)",
    category: "Prompt AI Edukasi",
    price: 55000,
    originalPrice: 99000,
    rating: 4.9,
    reviews: 140,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
    description: "Prompt untuk membantu menyusun RPP berbagai jenjang.",
    badge: "Semua Jenjang",
    curriculum: "Kurikulum Merdeka",
    inStock: true
  },
  {
    id: 12,
    name: "Prompt AI RPP KBC+PM (SMP only)",
    category: "Prompt AI Edukasi",
    price: 30000,
    originalPrice: 100000,
    rating: 4.8,
    reviews: 70,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    description: "Prompt AI untuk membantu membuat RPP KBC+PM khusus jenjang SMP.",
    curriculum: "SMP / MTs",
    inStock: true
  },
  {
    id: 13,
    name: "Template Jurnal Guru Editable Canva | Administrasi Guru Siap Pakai",
    category: "Template Canva",
    price: 15000,
    rating: 4.8,
    reviews: 115,
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
    description: "Jurnal guru siap edit di Canva untuk membantu merapikan administrasi.",
    curriculum: "Canva Template",
    inStock: true
  },
  {
    id: 14,
    name: "Teacher Planner Tema Blue Aesthetic",
    category: "Aplikasi & Administrasi",
    price: 15000,
    rating: 4.7,
    reviews: 90,
    image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80",
    description: "Planner guru bertema biru untuk merencanakan kegiatan mengajar.",
    curriculum: "Perencanaan Mengajar",
    inStock: true
  },
  {
    id: 15,
    name: "(PDF Files) Teacher Planner",
    category: "Aplikasi & Administrasi",
    price: 10000,
    originalPrice: 20000,
    rating: 4.7,
    reviews: 130,
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
    description: "Teacher planner versi PDF untuk membantu mengatur jadwal dan tugas.",
    curriculum: "Printable PDF",
    inStock: true
  },
  {
    id: 16,
    name: "Prompt Generator untuk Cover Aesthetic",
    category: "Prompt AI Edukasi",
    price: 20000,
    originalPrice: 45000,
    rating: 4.9,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    description: "Buat ide prompt untuk menghasilkan cover yang estetik.",
    curriculum: "Desain Sampul",
    inStock: true
  },
  {
    id: 17,
    name: "Poster Seri 1 – Karakter & Akhlak",
    category: "Materi Ajar & LKPD",
    price: 10000,
    rating: 5.0,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80",
    description: "Poster edukasi tentang karakter dan akhlak untuk mendukung pembelajaran.",
    curriculum: "Pendidikan Karakter",
    inStock: true
  },
  {
    id: 18,
    name: "PAKET POSTER EDUKASI KEBIASAAN BELAJAR – SERI 2",
    category: "Materi Ajar & LKPD",
    price: 10000,
    rating: 4.9,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    description: "Poster edukasi untuk mengenalkan dan membangun kebiasaan belajar.",
    curriculum: "Budaya Belajar",
    inStock: true
  },
  {
    id: 19,
    name: "Abadikan momen si kecil dengan AI",
    category: "Prompt AI Edukasi",
    price: 30000,
    rating: 4.8,
    reviews: 55,
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80",
    description: "Gunakan prompt AI untuk membuat visual kenangan si kecil.",
    curriculum: "Portofolio Anak",
    inStock: true
  },
  {
    id: 20,
    name: "AI Prompt Bundle untuk Konten Kreator",
    category: "Prompt AI Edukasi",
    price: 15000,
    originalPrice: 45000,
    rating: 4.9,
    reviews: 140,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    description: "Kumpulan prompt AI untuk membantu merancang ide dan konten kreatif.",
    curriculum: "Konten Edukasi",
    inStock: true
  },
  {
    id: 21,
    name: "Prompt Stiker Bayi Gemesss",
    category: "Free Resources",
    price: 0,
    rating: 5.0,
    reviews: 420,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80",
    description: "Prompt untuk membuat stiker bayi yang lucu dengan AI.",
    badge: "Gratis",
    curriculum: "Freebie",
    inStock: true
  },
  {
    id: 22,
    name: "Materi Ajar: Greetings, Introduction, Leave Takings",
    category: "Free Resources",
    price: 0,
    rating: 5.0,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
    description: "Materi bahasa Inggris tentang sapaan, perkenalan, dan ungkapan perpisahan.",
    badge: "Gratis",
    curriculum: "Bahasa Inggris",
    inStock: true
  },
  {
    id: 23,
    name: "Aplikasi Pembelajaran Interaktif: Simple Past Tense by Anispurwaningsih",
    category: "Materi Ajar & LKPD",
    price: 5000,
    rating: 4.9,
    reviews: 110,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
    description: "Media interaktif untuk belajar materi Simple Past Tense.",
    badge: "Karya Guru",
    curriculum: "Bahasa Inggris",
    inStock: true
  },
  {
    id: 24,
    name: "Alphabet Workbook",
    category: "Materi Ajar & LKPD",
    price: 15000,
    originalPrice: 20000,
    rating: 4.8,
    reviews: 75,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    description: "Lembar aktivitas untuk mengenal dan berlatih alfabet.",
    curriculum: "Literasi Awal",
    inStock: true
  },
  {
    id: 25,
    name: "Subject, To Be & Pronouns",
    category: "Materi Ajar & LKPD",
    price: 20000,
    rating: 4.8,
    reviews: 80,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    description: "Materi latihan bahasa Inggris tentang subject, to be, dan pronouns.",
    curriculum: "English Grammar",
    inStock: true
  },
  {
    id: 26,
    name: "Tracing Huruf",
    category: "Materi Ajar & LKPD",
    price: 15000,
    rating: 4.9,
    reviews: 90,
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=600&q=80",
    description: "Aktivitas menebalkan huruf untuk membantu latihan menulis.",
    curriculum: "Motorik Halus PAUD",
    inStock: true
  },
  {
    id: 27,
    name: "Narrative Text: Imaginative Story",
    category: "Materi Ajar & LKPD",
    price: 10000,
    rating: 4.8,
    reviews: 65,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    description: "Materi belajar teks naratif melalui cerita imajinatif.",
    curriculum: "Bahasa Inggris",
    inStock: true
  },
  {
    id: 28,
    name: "(Lengkap dengan AppsScript) Absen Digital & Jurnal Mengajar",
    category: "Aplikasi & Administrasi",
    price: 55000,
    rating: 5.0,
    reviews: 180,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    description: "Perangkat digital untuk mencatat kehadiran dan jurnal mengajar.",
    badge: "AppsScript",
    curriculum: "Administrasi Digital",
    inStock: true
  },
  {
    id: 29,
    name: "TEMPLATE CANVA – REVIEW MATERI ASTS BAHASA INGGRIS KELAS 7",
    category: "Template Canva",
    price: 20000,
    rating: 4.9,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    description: "Template Canva untuk mengulas materi ASTS Bahasa Inggris kelas 7.",
    curriculum: "Bahasa Inggris Kelas 7",
    inStock: true
  },
  {
    id: 30,
    name: "++2500 Bank Video Siap Pakai",
    category: "Materi Ajar & LKPD",
    price: 25000,
    originalPrice: 35000,
    rating: 4.9,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
    description: "Kumpulan lebih dari 2.500 video siap pakai untuk berbagai kebutuhan konten.",
    badge: "2500+ Video",
    curriculum: "Media Digital",
    inStock: true
  },
  {
    id: 31,
    name: "Canva Sharing",
    category: "Template Canva",
    price: 20000,
    originalPrice: 25000,
    rating: 4.8,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=600&q=80",
    description: "Akses berbagi Canva untuk mendukung kebutuhan desain.",
    curriculum: "Canva Template",
    inStock: true
  },
  {
    id: 32,
    name: "Thanking & Apologizing interactive Materials",
    category: "Materi Ajar & LKPD",
    price: 5000,
    rating: 4.7,
    reviews: 60,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
    description: "Materi interaktif bahasa Inggris tentang ungkapan berterima kasih dan meminta maaf.",
    curriculum: "Bahasa Inggris",
    inStock: true
  },
  {
    id: 33,
    name: "Absen Digital & Jurnal Mengajar (Hanya di Canva Website)",
    category: "Template Canva",
    price: 30000,
    originalPrice: 40000,
    rating: 4.9,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    description: "Template Canva Website untuk mencatat absensi dan jurnal mengajar.",
    curriculum: "Canva Website",
    inStock: true
  },
  {
    id: 34,
    name: "Jurnal Guru Bulanan",
    category: "Aplikasi & Administrasi",
    price: 15000,
    rating: 4.8,
    reviews: 90,
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
    description: "Template jurnal bulanan untuk mencatat kegiatan mengajar.",
    curriculum: "Administrasi Guru",
    inStock: true
  },
  {
    id: 35,
    name: "Twibbon Back to School",
    category: "Template Canva",
    price: 15000,
    rating: 4.8,
    reviews: 130,
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80",
    description: "Twibbon bertema kembali ke sekolah untuk dibagikan secara digital.",
    curriculum: "Canva Template",
    inStock: true
  }
];

export const CATEGORIES = [
  'Semua',
  'Aplikasi & Administrasi',
  'Template Canva',
  'Prompt AI Edukasi',
  'Materi Ajar & LKPD',
  'Free Resources'
] as const;

export function formatRupiah(amount: number): string {
  if (amount === 0) return 'Gratis';
  return 'Rp ' + amount.toLocaleString('id-ID');
}

export const DEFAULT_STORE_SETTINGS = {
  whatsappNumber: '081234567890',
  storeName: 'Ashlyn Edu',
  instagramHandle: 'ashlyn.edu',
  shopeeUrl: 'https://shopee.co.id/ashlyn.edu',
  bankAccounts: [
    { bankName: 'BCA', accountNumber: '1234567890', accountHolder: 'Ashlyn Edu' },
    { bankName: 'Mandiri', accountNumber: '1370001234567', accountHolder: 'Ashlyn Edu' },
    { bankName: 'BRI', accountNumber: '012301098765501', accountHolder: 'Ashlyn Edu' },
    { bankName: 'DANA / E-Wallet', accountNumber: '081234567890', accountHolder: 'Ashlyn Edu' }
  ],
  greetingTemplate: 'Halo Admin Ashlyn Edu (ashlyn.edu) 🌸\nSaya ingin memesan perlengkapan kelas & modul berikut:',
  footerTemplate: 'Mohon dibantu konfirmasi pesanan dan proses pengirimannya ya kak. Terima kasih banyak! 🌸',
  includeBankInWa: true
};

export const RECOMMENDED_BUNDLES: {
  id: string;
  title: string;
  tag: string;
  description: string;
  productIds: number[];
  bundlePrice: number;
  normalPrice: number;
  savingAmount: number;
  emoji: string;
}[] = [
  {
    id: 'bundle-guru-ai',
    title: 'Paket Komplit Guru AI',
    tag: 'Paling Laris 🔥',
    description: 'RPP Generator All-In + LKPD Gamification AI + Asisten Guru Pintar',
    productIds: [11, 4, 5],
    normalPrice: 203000,
    bundlePrice: 165000,
    savingAmount: 38000,
    emoji: '🤖'
  },
  {
    id: 'bundle-canva-aesthetic',
    title: 'Paket Canva Administrasi Pastel',
    tag: 'Hemat Rp 15rb 🌸',
    description: 'Teacher Dashboard Canva + Jurnal Guru Editable + Twibbon Back to School',
    productIds: [10, 13, 35],
    normalPrice: 60000,
    bundlePrice: 45000,
    savingAmount: 15000,
    emoji: '🎨'
  },
  {
    id: 'bundle-literasi-bahasa',
    title: 'Paket Literasi & Bahasa Inggris',
    tag: 'Diskon Spesial 📚',
    description: 'Alphabet Workbook + Tracing Huruf + Subject To Be & Pronouns',
    productIds: [24, 26, 25],
    normalPrice: 50000,
    bundlePrice: 39000,
    savingAmount: 11000,
    emoji: '✏️'
  }
];

export function calculateBundlingDiscount(cart: { price: number; qty?: number }[]): {
  subtotal: number;
  discountAmount: number;
  discountPercent: number;
  discountLabel: string;
  nextTierMessage: string;
  total: number;
} {
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const totalPaidItems = cart
    .filter((item) => item.price > 0)
    .reduce((sum, item) => sum + (item.qty || 1), 0);

  let discountPercent = 0;
  let discountLabel = '';
  let nextTierMessage = '';

  if (totalPaidItems === 0) {
    nextTierMessage = '';
  } else if (totalPaidItems === 1) {
    nextTierMessage = 'Beli 1 produk lagi untuk dapat Diskon Bundling 5%! 🍓';
  } else if (totalPaidItems === 2) {
    discountPercent = 5;
    discountLabel = 'Diskon Bundling 2 Produk (5%)';
    nextTierMessage = 'Tambah 1 lagi untuk naik ke Diskon Bundling 10%! 🎉';
  } else if (totalPaidItems === 3) {
    discountPercent = 10;
    discountLabel = 'Diskon Bundling 3 Produk (10%)';
    nextTierMessage = 'Tambah 1 lagi untuk Diskon Maksimal 15%! 🔥';
  } else if (totalPaidItems >= 4) {
    discountPercent = 15;
    discountLabel = 'Diskon Bundling Super Hemat (15%)';
    nextTierMessage = 'Selamat! Kamu dapat Diskon Bundling maksimal 15%! 🥳';
  }

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);

  return {
    subtotal,
    discountAmount,
    discountPercent,
    discountLabel,
    nextTierMessage,
    total
  };
}

export function cleanWaPhone(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (cleaned.startsWith('8')) {
    cleaned = '62' + cleaned;
  }
  return cleaned || '6281234567890';
}

export function generateWaOrderText(
  order: {
    orderId?: string;
    date?: string;
    items: { name: string; qty?: number; price: number }[];
    subtotalAmount?: number;
    discountAmount?: number;
    discountLabel?: string;
    totalAmount: number;
    customer: {
      name: string;
      phone: string;
      email?: string;
      paymentMethod: string;
      notes?: string;
      isQuestionOnly?: boolean;
      questionText?: string;
    };
  },
  settings = DEFAULT_STORE_SETTINGS
): string {
  const storeTitle = (settings.storeName || 'ASHLYN EDU').toUpperCase();

  // Mode 1: Tanya Produk / Konsultasi
  if (order.customer.isQuestionOnly) {
    let text = `💬 TANYA PRODUK: ${storeTitle} 💬\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Nama: ${order.customer.name}\n`;
    text += `WhatsApp: ${order.customer.phone}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Produk yang Ditanyakan:\n`;
    order.items.forEach((item, index) => {
      text += `${index + 1}. ${item.name}\n`;
    });
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Pertanyaan:\n`;
    text += `${order.customer.questionText || order.customer.notes || 'Halo Admin! Saya mau tanya-tanya dulu tentang detail dan cara akses produk ini ya.'}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Halo Admin ${settings.storeName}! Mohon infonya ya kak. Terima kasih! 🌸✨`;
    return text;
  }

  // Mode 2: Order Baru (Digital Product)
  let text = `🍓 ORDER BARU: ${storeTitle} 🍓\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Nama: ${order.customer.name}\n`;
  text += `WhatsApp: ${order.customer.phone}\n`;
  if (order.customer.email) {
    text += `Email Akses: ${order.customer.email}\n`;
  }
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Rincian Pesanan:\n`;

  order.items.forEach((item, index) => {
    const qty = item.qty || 1;
    const itemTotal = item.price === 0 ? 'Gratis' : formatRupiah(item.price * qty);
    text += `${index + 1}. ${item.name} (${qty}x) - ${itemTotal}\n`;
  });

  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  if (order.discountAmount && order.discountAmount > 0) {
    const sub = order.subtotalAmount || order.totalAmount + order.discountAmount;
    text += `Subtotal: ${formatRupiah(sub)}\n`;
    text += `${order.discountLabel || 'Diskon Bundling'}: -${formatRupiah(order.discountAmount)}\n`;
    text += `TOTAL BAYAR: ${formatRupiah(order.totalAmount)}\n`;
  } else {
    text += `TOTAL: ${formatRupiah(order.totalAmount)}\n`;
  }
  text += `Metode Bayar: ${order.customer.paymentMethod}\n`;
  if (order.customer.notes) {
    text += `Catatan: ${order.customer.notes}\n`;
  }
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Halo Admin ${settings.storeName}! Saya mau konfirmasi pembayaran untuk pesanan di atas ya. Terima kasih! 🍓✨`;

  return text;
}
