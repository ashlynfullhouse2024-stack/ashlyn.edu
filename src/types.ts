export type ProductCategory = 
  | 'Semua'
  | 'Aplikasi & Administrasi'
  | 'Template Canva'
  | 'Prompt AI Edukasi'
  | 'Materi Ajar & LKPD'
  | 'Free Resources';

export interface Product {
  id: number;
  name: string;
  category: 'Aplikasi & Administrasi' | 'Template Canva' | 'Prompt AI Edukasi' | 'Materi Ajar & LKPD' | 'Free Resources';
  price: number; // 0 for free
  originalPrice?: number; // "harga pembanding"
  rating: number;
  reviews: number;
  image: string;
  description: string;
  badge?: string;
  curriculum?: string;
  gradeLevel?: string;
  inStock?: boolean;
  accessLink?: string; // Link template canva / file download / GDrive
  accessCredentials?: { username?: string; password?: string; notes?: string };
  accessNote?: string; // Catatan login / petunjuk akses privat (mis. PKKM)
}

export interface CartItem extends Product {
  qty: number;
}

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  email?: string;
  paymentMethod: string;
  notes?: string;
  isQuestionOnly?: boolean;
  questionText?: string;
}

export interface DiscountInfo {
  type: 'bundling' | 'coupon';
  label: string;
  percent?: number;
  amount: number;
}

export interface BundlePackage {
  id: string;
  title: string;
  tag: string;
  description: string;
  productIds: number[];
  itemsIncluded?: string[];
  highlightBadge?: string;
  bundlePrice: number;
  normalPrice: number;
  savingAmount: number;
  emoji: string;
}

export type OrderStatus = 'Menunggu Konfirmasi' | 'Lunas' | 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan';

export interface PkkmLicenseAccount {
  no: number;
  username: string;
  password: string;
  role: string;
  licenseCode: string;
}

export interface CompletedOrder {
  orderId: string;
  date: string;
  createdAt?: number; // timestamp in milliseconds
  reminderSentAt?: number; // timestamp when last reminder was sent
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotalAmount?: number;
  discountAmount?: number;
  discountLabel?: string;
  totalAmount: number;
  status: OrderStatus;
  isQuestionOnly?: boolean;
  assignedLicense?: {
    username: string;
    password: string;
    role?: string;
    licenseCode: string;
    productName?: string;
  };
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface StoreSettings {
  whatsappNumber: string;
  storeName: string;
  instagramHandle: string;
  bankAccounts: BankAccount[];
  greetingTemplate: string;
  footerTemplate: string;
  includeBankInWa: boolean;
}
