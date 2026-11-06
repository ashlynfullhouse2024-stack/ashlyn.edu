import { CompletedOrder, Product, StoreSettings } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "PKKM Bikin Stres???",
    category: "Aplikasi & Administrasi",
    price: 149000,
    originalPrice: 199000,
    rating: 5.0,
    reviews: 148,
    image: "/assets/aistudio/01_pkkm-bikin-stres.webp",
    description: "Bantu siapkan berkas PKKM dengan lebih praktis dan mudah disesuaikan.",
    badge: "Diskon Spesial",
    curriculum: "Administrasi Kepala Sekolah",
    inStock: true,
    accessLink: "https://generator-pkkm.pages.dev/"
  },
  {
    id: 2,
    name: "Aplikasi Pembuat RPP Guru",
    category: "Aplikasi & Administrasi",
    price: 99000,
    originalPrice: 199000,
    rating: 4.9,
    reviews: 320,
    image: "/assets/aistudio/02_aplikasi-pembuat-rpp-guru.webp",
    description: "Buat RPP dengan bantuan AI menggunakan API Key pribadi.",
    badge: "Best Seller",
    curriculum: "Kurikulum Merdeka",
    inStock: true,
    accessLink: "https://edusuite-ai.pages.dev/"
  },
  {
    id: 3,
    name: "Study Notes",
    category: "Materi Ajar & LKPD",
    price: 25000,
    rating: 4.8,
    reviews: 85,
    image: "/assets/aistudio/03_study-notes.webp",
    description: "Susun materi belajar menjadi catatan, peta konsep, ringkasan, atau slide.",
    curriculum: "Literasi Belajar",
    inStock: true,
    accessLink: "https://studynotes-miniest.pages.dev/"
  },
  {
    id: 4,
    name: "LKPD Gamification AI",
    category: "Prompt AI Edukasi",
    price: 49000,
    originalPrice: 200000,
    rating: 5.0,
    reviews: 210,
    image: "/assets/aistudio/04_lkpd-gamification-ai.webp",
    description: "Rancang LKPD interaktif dengan pendekatan gamifikasi dan bantuan AI.",
    badge: "Hemat 75%",
    curriculum: "Active Learning",
    inStock: true,
    accessLink: "https://lkpd-gamification.toko-ashlyn.workers.dev/"
  },
  {
    id: 5,
    name: "Asisten Guru Pintar: Guru Mapel, Wali Kelas, Guru Ekskul harus coba!!",
    category: "Aplikasi & Administrasi",
    price: 99000,
    originalPrice: 150000,
    rating: 4.9,
    reviews: 175,
    image: "/assets/aistudio/05_asisten-guru-pintar-guru-mapel-wali-kelas-guru-ekskul-harus-coba.webp",
    description: "Asisten digital untuk mendukung tugas guru mata pelajaran, wali kelas, dan pembina ekskul.",
    badge: "Wajib Coba",
    curriculum: "Manajemen Sekolah",
    inStock: true,
    accessLink: "https://asistenguru.toko-ashlyn.workers.dev/"
  },
  {
    id: 6,
    name: "Prompt LKPD sekali beli untuk selamanya",
    category: "Prompt AI Edukasi",
    price: 45000,
    rating: 4.9,
    reviews: 190,
    image: "/assets/aistudio/06_prompt-lkpd-sekali-beli-untuk-selamanya.webp",
    description: "Kumpulan prompt untuk membantu menyusun LKPD kapan saja.",
    badge: "Sekali Beli",
    curriculum: "AI Education",
    inStock: true,
    accessLink: "https://lkpd-ai.pages.dev/"
  },
  {
    id: 7,
    name: "Aplikasi Guru Piket",
    category: "Aplikasi & Administrasi",
    price: 45000,
    originalPrice: 99000,
    rating: 4.8,
    reviews: 95,
    image: "/assets/aistudio/07_aplikasi-guru-piket.webp",
    description: "Bantu kelola kegiatan dan administrasi piket guru.",
    curriculum: "Tata Tertib Sekolah",
    inStock: true,
    accessLink: "https://portalgurupiket.toko-ashlyn.workers.dev/"
  },
  {
    id: 8,
    name: "Inklusi Studio untuk Guru BK",
    category: "Aplikasi & Administrasi",
    price: 45000,
    originalPrice: 99000,
    rating: 4.9,
    reviews: 82,
    image: "/assets/aistudio/08_inklusi-studio-untuk-guru-bk.webp",
    description: "Perangkat bantu untuk mendukung layanan BK dan kebutuhan pendidikan inklusif.",
    curriculum: "Bimbingan Konseling",
    inStock: true,
    accessLink: "https://inklusistudio.pages.dev/"
  },
  {
    id: 11,
    name: "Prompt Generator RPP All-In (Semua Jenjang)",
    category: "Prompt AI Edukasi",
    price: 55000,
    originalPrice: 99000,
    rating: 4.9,
    reviews: 140,
    image: "/assets/aistudio/10_prompt-generator-rpp-all-in-semua-jenjang.webp",
    description: "Prompt untuk membantu menyusun RPP berbagai jenjang.",
    badge: "Semua Jenjang",
    curriculum: "Kurikulum Merdeka",
    inStock: true,
    accessLink: "https://rpp-newgen.pages.dev/"
  },
  {
    id: 12,
    name: "Prompt AI RPP KBC+PM (SMP only)",
    category: "Prompt AI Edukasi",
    price: 30000,
    originalPrice: 100000,
    rating: 4.8,
    reviews: 70,
    image: "/assets/aistudio/11_prompt-ai-rpp-kbc-pm-smp-only.webp",
    description: "Prompt AI untuk membantu membuat RPP KBC+PM khusus jenjang SMP.",
    curriculum: "SMP / MTs",
    inStock: true,
    accessLink: "https://rpp-pmkbc.pages.dev/"
  },
  {
    id: 13,
    name: "Template Jurnal Guru Editable Canva | Administrasi Guru Siap Pakai",
    category: "Template Canva",
    price: 15000,
    rating: 4.8,
    reviews: 115,
    image: "/assets/aistudio/12_template-jurnal-guru-editable-canva-administrasi-guru-siap-pakai.webp",
    description: "Jurnal guru siap edit di Canva untuk membantu merapikan administrasi.",
    curriculum: "Canva Template",
    inStock: true,
    accessLink: "https://canva.link/3lyazu7potpxw37"
  },
  {
    id: 14,
    name: "Teacher Planner Tema Blue Aesthetic",
    category: "Aplikasi & Administrasi",
    price: 15000,
    rating: 4.7,
    reviews: 90,
    image: "/assets/aistudio/13_teacher-planner-tema-blue-aesthetic.webp",
    description: "Planner guru bertema biru untuk merencanakan kegiatan mengajar.",
    curriculum: "Perencanaan Mengajar",
    inStock: true,
    accessLink: "https://canva.link/bbh1dzhoaydc8me"
  },
  {
    id: 16,
    name: "Prompt Generator untuk Cover Aesthetic",
    category: "Prompt AI Edukasi",
    price: 20000,
    originalPrice: 45000,
    rating: 4.9,
    reviews: 88,
    image: "/assets/aistudio/15_prompt-generator-untuk-cover-aesthetic.webp",
    description: "Buat ide prompt untuk menghasilkan cover yang estetik.",
    curriculum: "Desain Sampul",
    inStock: true,
    accessLink: "https://cover-sosmed.pages.dev/"
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
    inStock: true,
    accessLink: "https://canva.link/9nf0tfv0zqvh4uf"
  }
];

export const CATEGORIES = [
  'Semua',
  'Aplikasi & Administrasi',
  'Template Canva',
  'Prompt AI Edukasi',
  'Materi Ajar & LKPD'
] as const;

export function formatRupiah(amount: number): string {
  if (amount === 0) return 'Gratis';
  return 'Rp ' + amount.toLocaleString('id-ID');
}

export const DEFAULT_STORE_SETTINGS = {
  whatsappNumber: '087895131563',
  storeName: 'Ashlyn Edu',
  instagramHandle: 'ashlyn.edu',
  bankAccounts: [
    { bankName: 'BCA', accountNumber: '4970394007', accountHolder: 'Anis Purwaningsih' },
    { bankName: 'Mandiri', accountNumber: '1330025579962', accountHolder: 'Anis Purwaningsih' },
    { bankName: 'Dana/E-wallet', accountNumber: '082213283648', accountHolder: 'Anis Purwaningsih' }
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
  itemsIncluded: string[];
  highlightBadge?: string;
  bundlePrice: number;
  normalPrice: number;
  savingAmount: number;
  emoji: string;
}[] = [
  {
    id: 'bundle-pkkm-edusuite',
    title: 'Paket Kepala Sekolah & Guru AI (PKKM + RPP)',
    tag: 'Hemat Rp 49rb 🔥',
    description: 'PKKM Bikin Stres??? + Aplikasi Pembuat RPP Guru',
    productIds: [1, 2],
    itemsIncluded: [
      'Generator Bukti Fisik PKKM 2026 AI',
      'Aplikasi Pembuat RPP Guru (EduSuite AI)'
    ],
    highlightBadge: 'Termasuk 1 Akun Lisensi Privat (Username & Password)',
    normalPrice: 248000,
    bundlePrice: 199000,
    savingAmount: 49000,
    emoji: '🏆'
  },
  {
    id: 'bundle-edusuite-lkpd',
    title: 'Paket Super Guru AI (RPP + Prompt LKPD)',
    tag: 'Paling Laris 🌸',
    description: 'Aplikasi Pembuat RPP Guru + Prompt LKPD sekali beli untuk selamanya',
    productIds: [2, 6],
    itemsIncluded: [
      'Aplikasi Pembuat RPP Guru (EduSuite AI)',
      'Prompt LKPD sekali beli untuk selamanya (LKPD AI)'
    ],
    normalPrice: 144000,
    bundlePrice: 119000,
    savingAmount: 25000,
    emoji: '🤖'
  },
  {
    id: 'bundle-wali-kelas-manajemen',
    title: 'Paket Komplit Wali Kelas & Piket Sekolah',
    tag: 'Hemat Rp 34rb 🏫',
    description: 'Asisten Guru Pintar + Aplikasi Guru Piket + Template Jurnal Guru Canva',
    productIds: [5, 7, 13],
    itemsIncluded: [
      'Asisten Guru Pintar (Mapel, Wali Kelas, Ekskul)',
      'Aplikasi Guru Piket & Tata Tertib Sekolah',
      'Template Jurnal Guru Editable Canva'
    ],
    highlightBadge: '3 Perangkat Administrasi Harian Sekaligus',
    normalPrice: 159000,
    bundlePrice: 125000,
    savingAmount: 34000,
    emoji: '🏫'
  },
  {
    id: 'bundle-gamifikasi-rpp-allin',
    title: 'Paket Kelas Interaktif & Gamifikasi AI',
    tag: 'Hemat Rp 30rb 🎮',
    description: 'LKPD Gamification AI + Prompt Generator RPP All-In + Study Notes',
    productIds: [4, 11, 3],
    itemsIncluded: [
      'LKPD Gamification AI (Pembelajaran Interaktif)',
      'Prompt Generator RPP All-In (Semua Jenjang)',
      'Study Notes (Catatan, Peta Konsep & Slide)'
    ],
    highlightBadge: 'Cocok untuk Guru SD, SMP & SMA/SMK',
    normalPrice: 129000,
    bundlePrice: 99000,
    savingAmount: 30000,
    emoji: '🎮'
  }
];

export function calculateBundlingDiscount(cart: { id?: number; price: number; qty?: number }[]): {
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

  let tierPercent = 0;
  let tierLabel = '';
  let nextTierMessage = '';

  if (totalPaidItems === 0) {
    nextTierMessage = '';
  } else if (totalPaidItems === 1) {
    nextTierMessage = 'Beli 1 produk lagi untuk dapat Diskon Bundling 5% atau ambil Paket Bundling! 🌷';
  } else if (totalPaidItems === 2) {
    tierPercent = 5;
    tierLabel = 'Diskon Bundling 2 Produk (5%)';
    nextTierMessage = 'Tambah 1 lagi untuk naik ke Diskon Bundling 10%! 🎉';
  } else if (totalPaidItems === 3) {
    tierPercent = 10;
    tierLabel = 'Diskon Bundling 3 Produk (10%)';
    nextTierMessage = 'Tambah 1 lagi untuk Diskon Maksimal 15%! 🔥';
  } else if (totalPaidItems >= 4) {
    tierPercent = 15;
    tierLabel = 'Diskon Bundling Super Hemat (15%)';
    nextTierMessage = 'Selamat! Kamu dapat Diskon Bundling maksimal 15%! 🥳';
  }

  // Check if cart matches any curated RECOMMENDED_BUNDLES
  const remainingQtyById = new Map<number, number>();
  const priceById = new Map<number, number>();
  cart.forEach((item) => {
    if (typeof item.id === 'number' && item.price > 0) {
      remainingQtyById.set(item.id, (remainingQtyById.get(item.id) || 0) + (item.qty || 1));
      priceById.set(item.id, item.price);
    }
  });

  const sortedBundles = [...RECOMMENDED_BUNDLES].sort((a, b) => b.savingAmount - a.savingAmount);
  let bundleSavingTotal = 0;
  let consumedSubtotal = 0;
  const matchedTitles: string[] = [];

  for (const bundle of sortedBundles) {
    while (bundle.productIds.every((pid) => (remainingQtyById.get(pid) || 0) >= 1)) {
      bundle.productIds.forEach((pid) => {
        remainingQtyById.set(pid, (remainingQtyById.get(pid) || 0) - 1);
        consumedSubtotal += priceById.get(pid) || 0;
      });
      bundleSavingTotal += bundle.savingAmount;
      if (!matchedTitles.includes(bundle.title)) {
        matchedTitles.push(bundle.title);
      }
    }
  }

  const unbundledSubtotal = Math.max(0, subtotal - consumedSubtotal);
  const extraTierSaving = Math.round((unbundledSubtotal * tierPercent) / 100);
  const combinedBundleDiscount = bundleSavingTotal + extraTierSaving;
  const pureTierDiscount = Math.round((subtotal * tierPercent) / 100);

  let discountAmount = pureTierDiscount;
  let discountLabel = tierLabel;
  let discountPercent = tierPercent;

  if (combinedBundleDiscount > pureTierDiscount && matchedTitles.length > 0) {
    discountAmount = combinedBundleDiscount;
    discountPercent = subtotal > 0 ? Math.round((discountAmount / subtotal) * 100) : 0;
    discountLabel =
      matchedTitles.length === 1
        ? `Harga Spesial ${matchedTitles[0]}`
        : `Harga Spesial ${matchedTitles.length} Paket Bundling`;
    nextTierMessage =
      unbundledSubtotal > 0
        ? `Harga paket aktif + diskon ekstra ${tierPercent}% untuk produk tambahan! 🥳`
        : 'Harga Spesial Paket Bundling otomatis diterapkan! 🌸';
  }

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
  return cleaned || '6287895131563';
}

export function generateWaOrderText(
  order: {
    orderId?: string;
    date?: string;
    items: { id?: number; name: string; qty?: number; price: number; accessLink?: string }[];
    subtotalAmount?: number;
    discountAmount?: number;
    discountLabel?: string;
    totalAmount: number;
    assignedLicense?: {
      username: string;
      password: string;
      role?: string;
      licenseCode: string;
      productName?: string;
    };
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
  settings: StoreSettings = DEFAULT_STORE_SETTINGS
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
  let text = `🌸 ORDER BARU: ${storeTitle} 🌸\n`;
  if (order.orderId) {
    text += `ID Pesanan: #${order.orderId}\n`;
  }
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Nama: ${order.customer.name}\n`;
  text += `WhatsApp: ${order.customer.phone}\n`;
  if (order.customer.email) {
    text += `Email Akses: ${order.customer.email}\n`;
  }
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Rincian Pesanan:\n`;

  const hasPkkm = order.items.some((item) => isPkkmItem(item));
  const pkkmProduct = INITIAL_PRODUCTS.find((p) => p.id === 1);
  const pkkmLink = pkkmProduct?.accessLink || 'https://generator-pkkm.pages.dev/';

  order.items.forEach((item, index) => {
    const qty = item.qty || 1;
    const itemTotal = item.price === 0 ? 'Gratis' : formatRupiah(item.price * qty);
    text += `${index + 1}. ${item.name} (${qty}x) - ${itemTotal}\n`;
    if (isPkkmItem(item)) {
      text += `   🔗 Link Aplikasi: ${item.accessLink || pkkmLink}\n`;
    }
  });

  if (hasPkkm && order.assignedLicense) {
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🔐 *AKUN LISENSI APLIKASI PKKM (1 Pembeli 1 Akun):*\n`;
    text += `• Link Akses: ${pkkmLink}\n`;
    text += `• Username Lisensi: *${order.assignedLicense.username}*\n`;
    text += `• Password Lisensi: *${order.assignedLicense.password}*\n`;
    text += `• Kode Lisensi: ${order.assignedLicense.licenseCode}\n`;
  }

  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  if (order.discountAmount && order.discountAmount > 0) {
    const sub = order.subtotalAmount || order.totalAmount + order.discountAmount;
    text += `Subtotal: ${formatRupiah(sub)}\n`;
    text += `${order.discountLabel || 'Diskon Bundling'}: -${formatRupiah(order.discountAmount)}\n`;
    text += `TOTAL BAYAR: ${formatRupiah(order.totalAmount)}\n`;
  } else {
    text += `TOTAL BAYAR: ${formatRupiah(order.totalAmount)}\n`;
  }
  text += `Metode Bayar: ${order.customer.paymentMethod}\n`;
  if (settings.includeBankInWa && settings.bankAccounts && settings.bankAccounts.length > 0) {
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Rekening Pembayaran:\n`;
    settings.bankAccounts.forEach((b) => {
      if (b.bankName && b.accountNumber) {
        text += `• ${b.bankName}: ${b.accountNumber} (a.n ${b.accountHolder})\n`;
      }
    });
  }
  if (order.customer.notes) {
    text += `Catatan: ${order.customer.notes}\n`;
  }
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  if (settings.greetingTemplate && settings.footerTemplate) {
    text += `${settings.footerTemplate}\n`;
  } else {
    text += `Halo Admin ${settings.storeName}! Saya mau konfirmasi pembayaran untuk pesanan di atas ya. Terima kasih! 🌸✨`;
  }

  return text;
}

export const PKKM_LICENSE_POOL: {
  no: number;
  username: string;
  password: string;
}[] = [
  { no: 1, username: 'madrasah_juara01', password: 'MadrasahMaju#2026' },
  { no: 2, username: 'pkkm_kemenag02', password: 'BerkahPanca719' },
  { no: 3, username: 'guru_prestasi03', password: 'CintaIlmu!8834' },
  { no: 4, username: 'kamad_hebat04', password: 'AmanahKamad@452' },
  { no: 5, username: 'madrasah_unggul05', password: 'SuksesPKKM#916' },
  { no: 6, username: 'tim_pkkm2026_06', password: 'PancaCinta$628' },
  { no: 7, username: 'madrasah_bermutu07', password: 'KinerjaPenuh!351' },
  { no: 8, username: 'guru_inovatif08', password: 'KBCMadrasah742' },
  { no: 9, username: 'asesmen_pkkm09', password: 'AkreditasiA@820' },
  { no: 10, username: 'madrasah_teladan10', password: 'InsanMulia#539' }
];

export function isPkkmItem(item: { id?: number; name: string }): boolean {
  return item.id === 1 || item.name.toLowerCase().includes('pkkm');
}

export function orderHasPkkmProduct(order: CompletedOrder): boolean {
  if (order.isQuestionOnly) return false;
  return order.items.some((item) => isPkkmItem(item));
}

export function getPkkmLicenseSummary(orders: CompletedOrder[]) {
  const usedMap = new Map<string, { orderId: string; customerName: string; status: string }>();

  orders.forEach((o) => {
    if (o.status !== 'Dibatalkan' && o.assignedLicense?.username) {
      usedMap.set(o.assignedLicense.username, {
        orderId: o.orderId,
        customerName: o.customer.name,
        status: o.status
      });
    }
  });

  const accountsWithStatus = PKKM_LICENSE_POOL.map((acc) => {
    const usedBy = usedMap.get(acc.username);
    return {
      ...acc,
      isUsed: Boolean(usedBy),
      usedBy
    };
  });

  const availableAccounts = accountsWithStatus.filter((a) => !a.isUsed);
  const usedCount = accountsWithStatus.length - availableAccounts.length;
  const remainingCount = availableAccounts.length;
  const nextAvailable = availableAccounts[0] || null;
  const isExhausted = remainingCount === 0;

  return {
    total: PKKM_LICENSE_POOL.length,
    usedCount,
    remainingCount,
    isExhausted,
    nextAvailable,
    accountsWithStatus,
    availableAccounts
  };
}

// Menyesuaikan path aset dengan base URL (mis. saat deploy di subpath GitHub Pages)
export function fixImg(src: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return src.startsWith('/assets/') && base !== '/' ? base + src.slice(1) : src;
}

export function generateAccessFulfillmentMessage(
  order: CompletedOrder,
  products: Product[] = INITIAL_PRODUCTS,
  settings: StoreSettings = DEFAULT_STORE_SETTINGS,
  fallbackLicense?: { username: string; password: string; licenseCode?: string } | null
): string {
  const storeName = settings.storeName || 'Ashlyn Edu';
  const productMap = new Map<string, string>();
  INITIAL_PRODUCTS.forEach((p) => {
    if (p.accessLink) {
      productMap.set(p.name.trim().toLowerCase(), p.accessLink);
      productMap.set(String(p.id), p.accessLink);
    }
  });
  products.forEach((p) => {
    if (p.accessLink) {
      productMap.set(p.name.trim().toLowerCase(), p.accessLink);
      productMap.set(String(p.id), p.accessLink);
    }
  });

  const hasPkkm = orderHasPkkmProduct(order);
  const licenseToUse = order.assignedLicense || (hasPkkm ? fallbackLicense : null);

  let text = `🌸 *KONFIRMASI PEMBAYARAN & AKSES PRODUK - ${storeName.toUpperCase()}* 🌸\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Halo Kak *${order.customer.name}*! 👋✨\n`;
  text += `Terima kasih banyak, pembayaran untuk pesanan *#${order.orderId}* sebesar *${formatRupiah(order.totalAmount)}* telah kami terima (LUNAS ✅).\n\n`;
  text += `Berikut adalah tautan akses resmi untuk produk yang Kakak pesan:\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;

  order.items.forEach((item, index) => {
    const link =
      item.accessLink ||
      productMap.get(String(item.id)) ||
      productMap.get(item.name.trim().toLowerCase());

    text += `${index + 1}. *${item.name}* (${item.qty || 1}x)\n`;
    if (link) {
      text += `   🔗 Link Akses: ${link}\n`;
    } else {
      text += `   📩 File/akses dikirim langsung melalui chat ini ya Kak.\n`;
    }
    if (isPkkmItem(item) && licenseToUse) {
      text += `   🔐 *Akun Login Lisensi PKKM (Khusus 1 Pembeli):*\n`;
      text += `      • Username Lisensi: *${licenseToUse.username}*\n`;
      text += `      • Password Lisensi: *${licenseToUse.password}*\n`;
    } else if (isPkkmItem(item) && !licenseToUse) {
      text += `   ⚠️ *Catatan Admin: Stok Akun Lisensi PKKM sedang habis (perlu penambahan stok).* \n`;
    }
    if (item.accessNote) {
      text += `   📌 Catatan: ${item.accessNote}\n`;
    }
  });

  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `💡 *Tips:* Silakan simpan pesan ini atau bookmark tautan di atas agar mudah diakses kapan saja.\n\n`;
  text += `Semoga bermanfaat dan berkah selalu untuk kegiatan mengajarnya ya Kak! Jika ada kendala akses, jangan ragu hubungi kami kembali. 🌸🙏`;

  return text;
}

export function generatePendingReminderMessage(
  order: CompletedOrder,
  settings: StoreSettings = DEFAULT_STORE_SETTINGS
): string {
  const storeName = settings.storeName || 'Ashlyn Edu';
  let text = `Halo Kak *${order.customer.name}* 🌸\n\n`;
  text += `Kami dari Admin *${storeName}* ingin mengonfirmasi kembali pesanan Kakak dengan ID *#${order.orderId}*:\n`;
  order.items.forEach((item, idx) => {
    text += `${idx + 1}. ${item.name} (${item.qty || 1}x)\n`;
  });
  text += `\nTotal Tagihan: *${formatRupiah(order.totalAmount)}*\n`;
  text += `Metode Pembayaran: ${order.customer.paymentMethod}\n`;

  if (settings.includeBankInWa && settings.bankAccounts && settings.bankAccounts.length > 0) {
    text += `\n💳 *Rekening Pembayaran Resmi:*\n`;
    settings.bankAccounts.forEach((b) => {
      text += `• ${b.bankName}: ${b.accountNumber} (a.n ${b.accountHolder})\n`;
    });
  }

  text += `\nApabila Kakak sudah melakukan pembayaran, mohon kirimkan bukti transfernya di chat ini agar link akses produk bisa langsung kami kirimkan ya Kak. Terima kasih banyak! 🌷✨`;
  return text;
}

function getOrderTimestamp(order: CompletedOrder): number | null {
  if (typeof order.createdAt === 'number' && !Number.isNaN(order.createdAt)) {
    return order.createdAt;
  }
  const parsed = Date.parse(order.date);
  if (!Number.isNaN(parsed)) {
    return parsed;
  }
  return null;
}

export function isOrderPendingOver24Hours(order: CompletedOrder): boolean {
  if (order.isQuestionOnly || order.status !== 'Menunggu Konfirmasi') {
    return false;
  }
  const ts = getOrderTimestamp(order);
  if (!ts) return false;
  return Date.now() - ts >= 24 * 60 * 60 * 1000;
}

export function getOrderAgeText(order: CompletedOrder): string {
  const ts = getOrderTimestamp(order);
  if (!ts) return 'Baru saja';
  const diffMs = Math.max(0, Date.now() - ts);
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) {
    const diffMins = Math.max(1, Math.floor(diffMs / (1000 * 60)));
    return `${diffMins} menit lalu`;
  }
  if (diffHours < 24) {
    return `${diffHours} jam lalu`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} hari lalu`;
}

