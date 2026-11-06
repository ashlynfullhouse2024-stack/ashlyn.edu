import { Product, StoreSettings, CompletedOrder, OrderStatus, PkkmLicenseAccount } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 101,
    name: "Paket Bundling: EduSuite + LKPD AI",
    category: "Aplikasi & Administrasi",
    price: 119000,
    originalPrice: 144000,
    rating: 5.0,
    reviews: 240,
    image: "/assets/aistudio/02_aplikasi-pembuat-rpp-guru.webp",
    description: "Kombinasi hemat 2 aplikasi unggulan: Pembuat RPP AI (EduSuite AI) + Prompt LKPD AI Sekali Beli untuk Selamanya.",
    badge: "Paket Bundling",
    curriculum: "EduSuite + LKPD AI",
    inStock: true,
    accessLink: "https://edusuite-ai.pages.dev/ dan https://lkpd-ai.pages.dev/",
    accessNote: "Paket 2 Aplikasi: 1) EduSuite AI (https://edusuite-ai.pages.dev/) 2) Prompt LKPD AI (https://lkpd-ai.pages.dev/)"
  },
  {
    id: 102,
    name: "Paket Bundling: PKKM + EduSuite",
    category: "Aplikasi & Administrasi",
    price: 199000,
    originalPrice: 248000,
    rating: 5.0,
    reviews: 380,
    image: "/assets/aistudio/01_pkkm-bikin-stres.webp",
    description: "Paket komplit super praktis: Generator Bukti Fisik PKKM 2026 AI (Lengkap 1 Akun Lisensi Privat) + Aplikasi RPP EduSuite AI.",
    badge: "Paket Bundling",
    curriculum: "PKKM + EduSuite AI",
    inStock: true,
    accessLink: "https://generator-pkkm.pages.dev/ dan https://edusuite-ai.pages.dev/",
    accessNote: "Paket Komplit: 1) Generator PKKM + 1 Akun Lisensi Privat Guru/Kamad 2) EduSuite AI"
  },
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
    accessLink: "https://generator-pkkm.pages.dev/",
    accessNote: "Setiap pembeli mendapatkan 1 Akun Lisensi Privat resmi (Username, Password & Kode Lisensi unik). Login di https://generator-pkkm.pages.dev/"
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
    id: 9,
    name: "Template Canva untuk Guru",
    category: "Template Canva",
    price: 25000,
    rating: 4.9,
    reviews: 150,
    image: "/assets/aistudio/09_template-canva-untuk-guru-teacher-dashboard-canva-template-administrasi-.webp",
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
    image: "/assets/aistudio/09_template-canva-untuk-guru-teacher-dashboard-canva-template-administrasi-.webp",
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
    inStock: true
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
    image: "/assets/aistudio/14_pdf-files-teacher-planner.webp",
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
    image: "/assets/aistudio/15_prompt-generator-untuk-cover-aesthetic.webp",
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
    image: "/assets/aistudio/16_poster-seri-1-karakter-akhlak.webp",
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
    image: "/assets/aistudio/17_paket-poster-edukasi-kebiasaan-belajar-seri-2.webp",
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
    image: "/assets/aistudio/18_abadikan-momen-si-kecil-dengan-ai.webp",
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
    image: "/assets/aistudio/19_ai-prompt-bundle-untuk-konten-kreator.webp",
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
    image: "/assets/aistudio/20_prompt-stiker-bayi-gemesss.webp",
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
    image: "/assets/aistudio/21_materi-ajar-greetings-introduction-leave-takings.webp",
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
    image: "/assets/aistudio/02_aplikasi-pembuat-rpp-guru.webp",
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
    image: "/assets/aistudio/23_alphabet-workbook.webp",
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
    image: "/assets/aistudio/24_subject-to-be-pronouns.webp",
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
  whatsappNumber: '087895131563',
  storeName: 'Ashlyn Edu',
  instagramHandle: 'ashlyn.edu',
  bankAccounts: [
    { bankName: 'BCA', accountNumber: '1234567890', accountHolder: 'Ashlyn Edu' },
    { bankName: 'Mandiri', accountNumber: '1370001234567', accountHolder: 'Ashlyn Edu' },
    { bankName: 'BRI', accountNumber: '012301098765501', accountHolder: 'Ashlyn Edu' },
    { bankName: 'DANA / E-Wallet', accountNumber: '087895131563', accountHolder: 'Ashlyn Edu' }
  ],
  greetingTemplate: 'Halo Admin Ashlyn Edu (ashlyn.edu) 🌸\nSaya ingin memesan perlengkapan kelas & modul berikut:',
  footerTemplate: 'Mohon dibantu konfirmasi pesanan dan proses pengirimannya ya kak. Terima kasih banyak! 🌸',
  includeBankInWa: true
};

// 📋 Daftar 10 Akun Lisensi Pembeli Resmi untuk Aplikasi PKKM 2026 AI
// Sesuai instruksi: 1 akun unik untuk masing-masing pembeli (tidak tertukar)
export const PKKM_LICENSE_ACCOUNTS: PkkmLicenseAccount[] = [
  { no: 1, username: 'madrasah_juara01', password: 'MadrasahMaju#2026', role: 'Guru (205 Instrumen + AI)', licenseCode: 'LIC-PKKM-JR01-2026' },
  { no: 2, username: 'pkkm_kemenag02', password: 'BerkahPanca*719', role: 'Guru (205 Instrumen + AI)', licenseCode: 'LIC-PKKM-KM02-2026' },
  { no: 3, username: 'guru_prestasi03', password: 'CintaIlmu!8834', role: 'Guru (205 Instrumen + AI)', licenseCode: 'LIC-PKKM-GP03-2026' },
  { no: 4, username: 'kamad_hebat04', password: 'AmanahKamad@452', role: 'Kamad (205 Instrumen + AI)', licenseCode: 'LIC-PKKM-KH04-2026' },
  { no: 5, username: 'madrasah_unggul05', password: 'SuksesPKKM#916', role: 'Guru (205 Instrumen + AI)', licenseCode: 'LIC-PKKM-MU05-2026' },
  { no: 6, username: 'tim_pkkm2026_06', password: 'PancaCinta$628', role: 'Guru (205 Instrumen + AI)', licenseCode: 'LIC-PKKM-TP06-2026' },
  { no: 7, username: 'madrasah_bermutu07', password: 'KinerjaPenuh!351', role: 'Guru (205 Instrumen + AI)', licenseCode: 'LIC-PKKM-MB07-2026' },
  { no: 8, username: 'guru_inovatif08', password: 'KBCMadrasah*742', role: 'Guru (205 Instrumen + AI)', licenseCode: 'LIC-PKKM-GI08-2026' },
  { no: 9, username: 'asesmen_pkkm09', password: 'AkreditasiA@820', role: 'Guru (205 Instrumen + AI)', licenseCode: 'LIC-PKKM-AP09-2026' },
  { no: 10, username: 'madrasah_teladan10', password: 'InsanMulia#539', role: 'Guru (205 Instrumen + AI)', licenseCode: 'LIC-PKKM-MT10-2026' },
];

// Alokasikan 1 akun lisensi unik untuk setiap pesanan PKKM
export function allocatePkkmLicenseForOrder(existingOrders: CompletedOrder[] = []): PkkmLicenseAccount {
  const usedUsernames = new Set<string>();
  existingOrders.forEach((o) => {
    if (o.assignedLicense?.username) {
      usedUsernames.add(o.assignedLicense.username);
    }
  });

  // Ambil akun yang belum terpakai pertama
  const available = PKKM_LICENSE_ACCOUNTS.find((acc) => !usedUsernames.has(acc.username));
  if (available) return available;

  // Jika semua 10 lisensi sudah terpakai, putar secara sekuensial
  const assignedCount = existingOrders.filter((o) => o.assignedLicense).length;
  return PKKM_LICENSE_ACCOUNTS[assignedCount % PKKM_LICENSE_ACCOUNTS.length];
}

// Cek apakah item atau pesanan melibatkan aplikasi PKKM
export function isItemPkkm(item: { id?: number; name?: string }): boolean {
  if (item.id === 1 || item.id === 102) return true;
  const lower = (item.name || '').toLowerCase();
  return lower.includes('pkkm');
}

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
    id: 'bundle-edusuite-lkpd',
    title: 'EduSuite + LKPD AI',
    tag: 'Hemat Rp 25rb 🔥',
    description: 'Aplikasi Pembuat RPP Guru (EduSuite AI) + Prompt LKPD AI Sekali Beli untuk Selamanya',
    productIds: [2, 6],
    normalPrice: 144000,
    bundlePrice: 119000,
    savingAmount: 25000,
    emoji: '⚡'
  },
  {
    id: 'bundle-pkkm-edusuite',
    title: 'PKKM + EduSuite',
    tag: 'Paling Komplit 👑',
    description: 'Generator Bukti Fisik PKKM 2026 AI (Lengkap 1 Akun Lisensi Privat) + Aplikasi RPP EduSuite AI',
    productIds: [1, 2],
    normalPrice: 248000,
    bundlePrice: 199000,
    savingAmount: 49000,
    emoji: '🏆'
  }
];

export function calculateBundlingDiscount(cart: { id?: number; price: number; qty?: number; name?: string }[]): {
  subtotal: number;
  discountAmount: number;
  discountPercent: number;
  discountLabel: string;
  nextTierMessage: string;
  total: number;
} {
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const cartIds = new Set(cart.map((c) => c.id));

  // Cek kombinasi bundling khusus yang diminta:
  // 1. PKKM (ID 1) + EduSuite (ID 2): Diskon Rp 49.000 (Harga jadi Rp 199.000)
  const hasPkkmAndEduSuite = (cartIds.has(1) && cartIds.has(2)) || cartIds.has(102);
  // 2. EduSuite (ID 2) + LKPD AI (ID 6): Diskon Rp 25.000 (Harga jadi Rp 119.000)
  const hasEduSuiteAndLkpd = (cartIds.has(2) && cartIds.has(6)) || cartIds.has(101);

  if (hasPkkmAndEduSuite && cart.length === 2 && !cartIds.has(102)) {
    return {
      subtotal,
      discountAmount: 49000,
      discountPercent: 20,
      discountLabel: 'Paket Bundling Spesial (PKKM + EduSuite: Hemat Rp 49.000)',
      nextTierMessage: '🎉 Kamu mendapatkan harga bundling spesial PKKM + EduSuite!',
      total: Math.max(0, subtotal - 49000)
    };
  }

  if (hasEduSuiteAndLkpd && cart.length === 2 && !cartIds.has(101)) {
    return {
      subtotal,
      discountAmount: 25000,
      discountPercent: 17,
      discountLabel: 'Paket Bundling Spesial (EduSuite + LKPD AI: Hemat Rp 25.000)',
      nextTierMessage: '⚡ Kamu mendapatkan harga bundling spesial EduSuite + LKPD AI!',
      total: Math.max(0, subtotal - 25000)
    };
  }

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
  return cleaned || '6287895131563';
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
    text += `TOTAL BAYAR: ${formatRupiah(order.totalAmount)}\n`;
  }
  text += `Metode Bayar: ${order.customer.paymentMethod}\n`;
  if (order.customer.notes) {
    text += `Catatan: ${order.customer.notes}\n`;
  }
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Halo Admin ${settings.storeName}! Saya mau konfirmasi pembayaran untuk pesanan di atas ya. Terima kasih! 🍓✨`;

  return text;
}

// Menyesuaikan path aset dengan base URL (mis. saat deploy di subpath GitHub Pages)
export function fixImg(src: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return src.startsWith('/assets/') && base !== '/' ? base + src.slice(1) : src;
}

// Parse order timestamp from createdAt or localized Indonesian date
export function parseOrderTimestamp(order: CompletedOrder): number {
  if (order.createdAt && !isNaN(order.createdAt)) {
    return order.createdAt;
  }
  const standardParse = Date.parse(order.date);
  if (!isNaN(standardParse)) {
    return standardParse;
  }
  const monthsMap: Record<string, number> = {
    januari: 0, februari: 1, maret: 2, april: 3, mei: 4, juni: 5,
    juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11
  };
  const parts = order.date.toLowerCase().split(/\s+/);
  if (parts.length >= 3) {
    const day = parseInt(parts[0], 10);
    const month = monthsMap[parts[1]];
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      return new Date(year, month, day, 12, 0, 0).getTime();
    }
  }
  return Date.now() - 25 * 3600 * 1000;
}

// Cek apakah pesanan masih berstatus 'Menunggu Konfirmasi' dan usianya > 24 jam
export function isOrderPendingOver24Hours(order: CompletedOrder): boolean {
  if (order.status !== 'Menunggu Konfirmasi' || order.isQuestionOnly) return false;
  const time = parseOrderTimestamp(order);
  const diffHours = (Date.now() - time) / (1000 * 60 * 60);
  return diffHours >= 24;
}

// Menampilkan durasi usia pesanan secara manusiawi
export function getOrderAgeText(order: CompletedOrder): string {
  const time = parseOrderTimestamp(order);
  const diffMs = Date.now() - time;
  if (diffMs < 0) return 'Baru saja';
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) {
    const diffMins = Math.max(1, Math.floor(diffMs / (1000 * 60)));
    return `${diffMins} mnt lalu`;
  }
  if (diffHours < 24) {
    return `${diffHours} jam lalu`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} hari lalu (${diffHours} jam)`;
}

// Membuat pesan WhatsApp konfirmasi pembayaran + link akses materi otomatis (Mendukung Produk Tunggal & Paket Bundling)
export function generateAccessFulfillmentMessage(
  order: CompletedOrder,
  catalog?: Product[],
  settings?: StoreSettings
): string {
  const storeName = settings?.storeName || 'Ashlyn Edu';
  const hasMultipleItems = order.items.length > 1;
  const isBundleItem = order.items.some(
    (i) => i.id === 101 || i.id === 102 || (i.name || '').toLowerCase().includes('bundling')
  );
  const isBundle = hasMultipleItems || isBundleItem;

  // Akun lisensi PKKM yang dialokasikan khusus untuk pembeli ini
  const pkkmLic = order.assignedLicense || allocatePkkmLicenseForOrder([order]);

  let text = `🌸 *KONFIRMASI PEMBAYARAN & LINK AKSES RESMI* 🌸\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Halo Kak *${order.customer.name}*! Terima kasih banyak atas pembayarannya. 🙏\n`;
  text += `Pesanan *${order.orderId}* telah kami konfirmasi dan BERHASIL DITERIMA. ✅\n\n`;

  if (isBundle) {
    text += `🎁 *PAKET BUNDLING MATERI & APLIKASI DIGITAL*\n`;
    text += `Berikut adalah seluruh link akses resmi dan akun lisensi pesanan Kakak:\n\n`;
  } else {
    text += `Berikut adalah tautan / link akses resmi materi & aplikasi yang Kakak pesan:\n\n`;
  }

  const productMap = new Map<string, Product>();
  if (catalog) {
    catalog.forEach((p) => {
      productMap.set(p.name.trim().toLowerCase(), p);
      productMap.set(String(p.id), p);
    });
  }

  let counter = 1;
  order.items.forEach((item) => {
    const prod = productMap.get(item.name.trim().toLowerCase()) || productMap.get(String(item.id));
    const isPkkmProduct = isItemPkkm(item) || isItemPkkm(prod || { name: '' });

    // Kasus 1: Paket Bundling EduSuite + LKPD AI (ID 101)
    if (item.id === 101 || (item.name || '').includes('EduSuite + LKPD AI')) {
      text += `${counter++}. 🎓 *Aplikasi Pembuat RPP Guru (EduSuite AI)*\n`;
      text += `   🔗 *Link Akses:* https://edusuite-ai.pages.dev/\n`;
      text += `   💡 *Petunjuk Akses:* Buka web EduSuite AI lalu gunakan Google Gemini API Key pribadi untuk membuat RPP Kurikulum Merdeka otomatis tanpa batas.\n\n`;

      text += `${counter++}. 🎓 *Prompt LKPD sekali beli untuk selamanya (LKPD AI)*\n`;
      text += `   🔗 *Link Akses:* https://lkpd-ai.pages.dev/\n`;
      text += `   💡 *Petunjuk Akses:* Akses seluruh kumpulan prompt LKPD interaktif dan materi gamifikasi pembelajaran.\n\n`;
      return;
    }

    // Kasus 2: Paket Bundling PKKM + EduSuite (ID 102)
    if (item.id === 102 || (item.name || '').includes('PKKM + EduSuite')) {
      text += `${counter++}. 🎓 *PKKM Bikin Stres??? (Generator Bukti Fisik PKKM 2026 AI)*\n`;
      text += `   🔗 *Link Aplikasi:* https://generator-pkkm.pages.dev/\n`;
      text += `   🔐 *Akun Lisensi Akses Privat (1 Pembeli = 1 Akun Resmi):*\n`;
      text += `   • Username: ${pkkmLic.username}\n`;
      text += `   • Password: ${pkkmLic.password}\n`;
      text += `   • Kode Lisensi: ${pkkmLic.licenseCode}\n`;
      text += `   • Role Akses: ${pkkmLic.role}\n`;
      text += `   • Status Akun: Aktif & Siap Digunakan\n`;
      text += `   💡 *Cara Login:* Buka https://generator-pkkm.pages.dev/ lalu login menggunakan Username & Password di atas untuk akses penuh seluruh 205 instrumen dokumen PKKM & AI Generator.\n\n`;

      text += `${counter++}. 🎓 *Aplikasi Pembuat RPP Guru (EduSuite AI)*\n`;
      text += `   🔗 *Link Akses:* https://edusuite-ai.pages.dev/\n`;
      text += `   💡 *Petunjuk Akses:* Buka web EduSuite AI lalu gunakan Google Gemini API Key pribadi untuk membuat RPP Kurikulum Merdeka otomatis.\n\n`;
      return;
    }

    // Kasus 3: Produk PKKM tunggal
    if (isPkkmProduct) {
      text += `${counter++}. 🎓 *${item.name}* ${item.qty && item.qty > 1 ? `(${item.qty}x)` : ''}\n`;
      text += `   🔗 *Link Aplikasi:* https://generator-pkkm.pages.dev/\n`;
      text += `   🔐 *Akun Lisensi Akses Privat (1 Pembeli = 1 Akun Resmi):*\n`;
      text += `   • Username: ${pkkmLic.username}\n`;
      text += `   • Password: ${pkkmLic.password}\n`;
      text += `   • Kode Lisensi: ${pkkmLic.licenseCode}\n`;
      text += `   • Role Akses: ${pkkmLic.role}\n`;
      text += `   • Status Akun: Aktif & Siap Digunakan\n`;
      text += `   💡 *Cara Login:* Buka https://generator-pkkm.pages.dev/ lalu login menggunakan Username & Password di atas untuk akses penuh seluruh 205 instrumen dokumen PKKM & AI Generator.\n\n`;
      return;
    }

    // Kasus 4: EduSuite AI
    if (item.id === 2 || (item.name || '').toLowerCase().includes('edusuite') || (item.name || '').toLowerCase().includes('pembuat rpp')) {
      text += `${counter++}. 🎓 *${item.name}* ${item.qty && item.qty > 1 ? `(${item.qty}x)` : ''}\n`;
      text += `   🔗 *Link Akses:* https://edusuite-ai.pages.dev/\n`;
      text += `   💡 *Petunjuk Akses:* Buka web EduSuite AI lalu masukkan Google Gemini API Key pribadi untuk mulai membuat RPP Kurikulum Merdeka otomatis.\n\n`;
      return;
    }

    // Kasus 5: LKPD AI
    if (item.id === 6 || (item.name || '').toLowerCase().includes('lkpd')) {
      const link = item.accessLink || prod?.accessLink || 'https://lkpd-ai.pages.dev/';
      text += `${counter++}. 🎓 *${item.name}* ${item.qty && item.qty > 1 ? `(${item.qty}x)` : ''}\n`;
      text += `   🔗 *Link Akses:* ${link}\n`;
      text += `   💡 *Petunjuk Akses:* Akses seluruh kumpulan prompt LKPD interaktif dan materi gamifikasi.\n\n`;
      return;
    }

    // Kasus 6: Produk umum lainnya
    const directLink = item.accessLink || prod?.accessLink || '';
    const creds = item.accessCredentials || prod?.accessCredentials;
    const note = item.accessNote || prod?.accessNote;

    text += `${counter++}. 🎓 *${item.name}* ${item.qty && item.qty > 1 ? `(${item.qty}x)` : ''}\n`;
    if (directLink) {
      text += `   🔗 *Link Akses:* ${directLink}\n`;
    } else {
      text += `   🔗 *Link Akses:* (File template/materi dikirimkan langsung melalui chat ini)\n`;
    }
    if (creds?.username) {
      text += `   👤 *Username:* ${creds.username}\n`;
    }
    if (creds?.password) {
      text += `   🔑 *Password:* ${creds.password}\n`;
    }
    if (note || creds?.notes) {
      text += `   💡 *Petunjuk Akses:* ${note || creds?.notes}\n`;
    }
    text += `\n`;
  });

  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📌 *Panduan Penggunaan:*
• Simpan atau bookmark link di atas pada browser Kakak agar mudah diakses kapan saja.
• Untuk template Canva, pastikan sudah masuk (login) ke Canva sebelum membuka template.
• Jika ada pertanyaan atau kendala teknis dalam mengakses materi, silakan langsung balas pesan ini.

Selamat berkarya & sukses selalu untuk kegiatan mengajarnya! ✨🎓
— Salam hangat, *${storeName}*`;

  return text;
}

// Menghasilkan teks WhatsApp untuk update status pesanan spesifik (Diproses, Dikirim, Selesai, dll)
export function generateOrderStatusUpdateMessage(
  order: CompletedOrder,
  status: OrderStatus,
  catalog?: Product[],
  settings?: StoreSettings
): string {
  const storeName = settings?.storeName || 'Ashlyn Edu';
  const isBundle = order.items.length > 1;

  if (status === 'Selesai' || status === 'Dikirim') {
    return generateAccessFulfillmentMessage(order, catalog, settings);
  }

  if (status === 'Diproses') {
    let text = `🌸 *UPDATE STATUS: PESANAN SEDANG DIPROSES* 🌸\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Halo Kak *${order.customer.name}*! Salam dari ${storeName}. 😊\n\n`;
    text += `Kami menginformasikan bahwa pembayaran untuk pesanan Kakak telah kami verifikasi:\n`;
    text += `📋 *No. Pesanan:* ${order.orderId}\n`;
    text += `📅 *Tanggal:* ${order.date}\n`;
    text += `🛍️ *Item Pesanan:* ${isBundle ? `(Paket Bundling ${order.items.length} Item)` : ''}\n`;
    order.items.forEach((item, idx) => {
      text += `   ${idx + 1}. ${item.name} (${item.qty}x)\n`;
    });
    text += `💰 *Total Pembayaran:* ${formatRupiah(order.totalAmount)}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Status saat ini: ⚙️ *SEDANG DIPROSES / DISIAPKAN*\n\n`;
    text += `Tim kami sedang menyiapkan hak akses dan materi pesanan Kakak. Link akses resmi akan segera kami kirimkan ke chat WhatsApp ini dalam beberapa saat lagi.\n\n`;
    text += `Mohon ditunggu sebentar ya Kak. Terima kasih banyak atas kesabarannya! 🌸✨\n`;
    text += `— *${storeName}*`;
    return text;
  }

  if (status === 'Dibatalkan') {
    let text = `🌸 *PEMBERITAHUAN PEMBATALAN PESANAN* 🌸\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Halo Kak *${order.customer.name}*,\n\n`;
    text += `Pemberitahuan bahwa pesanan Kakak:\n`;
    text += `📋 *No. Pesanan:* ${order.orderId}\n`;
    text += `🛍️ *Item:* ${order.items.map((i) => i.name).join(', ')}\n`;
    text += `Status saat ini telah diubah menjadi: ❌ *DIBATALKAN*\n\n`;
    text += `Jika pembatalan ini tidak disengaja atau Kakak masih ingin melanjutkan pemesanan, silakan balas pesan ini agar tim kami dapat membantu Kakak kembali.\n\n`;
    text += `Terima kasih! 🙏\n— *${storeName}*`;
    return text;
  }

  // Fallback: Menunggu Konfirmasi
  return generatePendingReminderMessage(order, settings);
}

// Membuat pesan pengingat sopan ke pelanggan untuk pesanan 'Menunggu Konfirmasi' > 24 jam
export function generatePendingReminderMessage(
  order: CompletedOrder,
  settings?: StoreSettings
): string {
  const storeName = settings?.storeName || 'Ashlyn Edu';
  let text = `🌸 *PENGINGAT PESANAN DIGITAL - ${storeName.toUpperCase()}* 🌸\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Halo Kak *${order.customer.name}*! Salam dari ${storeName}. 😊\n\n`;
  text += `Kami ingin mengonfirmasi pesanan materi ajar digital yang Kakak buat sebelumnya:\n`;
  text += `📋 *No. Pesanan:* ${order.orderId}\n`;
  text += `📅 *Tanggal:* ${order.date}\n`;
  text += `🛍️ *Item Pesanan:*\n`;
  order.items.forEach((item, idx) => {
    text += `   ${idx + 1}. ${item.name} (${item.qty}x)\n`;
  });
  text += `💰 *Total Pembayaran:* ${formatRupiah(order.totalAmount)}\n`;
  text += `💳 *Metode Pembayaran:* ${order.customer.paymentMethod}\n`;

  if (settings?.includeBankInWa && settings.bankAccounts?.length) {
    text += `\n*Rekening Pembayaran:*\n`;
    settings.bankAccounts.forEach((b) => {
      text += `• ${b.bankName}: *${b.accountNumber}* (a.n. ${b.accountHolder})\n`;
    });
  }

  text += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Saat ini status pesanan masih *Menunggu Konfirmasi Pembayaran* (lebih dari 24 jam).\n\n`;
  text += `Apakah ada kendala saat transfer atau ada detail materi yang ingin ditanyakan terlebih dahulu, Kak?\n\n`;
  text += `Jika Kakak *sudah melakukan transfer*, mohon cukup kirimkan foto/tangkapan layar *bukti transfer* di chat ini agar kami bisa segera mengaktifkan & mengirimkan link akses materinya. 🚀\n\n`;
  text += `Terima kasih banyak, Kak! Semoga hari Kakak menyenangkan. 🌸✨\n`;
  text += `— *${storeName}*`;

  return text;
}
