import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  RefreshCw, 
  ShieldCheck, 
  LogOut, 
  ShoppingBag,
  ArrowRight,
  Check,
  Settings,
  MessageSquare
} from 'lucide-react';
import { Product, CartItem, ProductCategory, OrderCustomerInfo, CompletedOrder, StoreSettings } from './types';
import { INITIAL_PRODUCTS, CATEGORIES, formatRupiah, DEFAULT_STORE_SETTINGS, calculateBundlingDiscount } from './data/initialProducts';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { BundlingShowcase } from './components/BundlingShowcase';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderCheckoutModal } from './components/OrderCheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { InvoiceModal } from './components/InvoiceModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminProductModal } from './components/AdminProductModal';
import { WhatsAppSimulatorModal } from './components/WhatsAppSimulatorModal';
import { Footer } from './components/Footer';

export default function App() {
  // Products state with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ashlyn_edu_products_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ashlyn_bloom_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Admin Mode state
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminProductOpen, setIsAdminProductOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<CompletedOrder | null>(null);
  const [isWaSimulatorOpen, setIsWaSimulatorOpen] = useState(false);

  // Store Settings (WhatsApp number, bank accounts, template)
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('ashlyn_edu_store_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_STORE_SETTINGS;
      }
    }
    return DEFAULT_STORE_SETTINGS;
  });

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  // Sync products to localStorage
  useEffect(() => {
    localStorage.setItem('ashlyn_edu_products_v3', JSON.stringify(products));
  }, [products]);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('ashlyn_bloom_cart', JSON.stringify(cart));
  }, [cart]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'Semua' || p.category === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === '' ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.curriculum && p.curriculum.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.reviews || 0) - (a.reviews || 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Cart operations
  const handleAddToCart = (product: Product, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
    showToast(`🌸 "${product.name}" masuk keranjang!`);
  };

  const handleBuyNow = (product: Product, qty: number = 1) => {
    handleAddToCart(product, qty);
    setDetailProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item dihapus dari keranjang.');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Keranjang telah dikosongkan.');
  };

  // Admin toggling & PIN
  const handleToggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
      showToast('Keluar dari Mode Guru.');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    setIsAdminLoginOpen(false);
    showToast('Mode Guru aktif!');
  };

  // Product CRUD
  const handleOpenAddProduct = () => {
    setProductToEdit(null);
    setIsAdminProductOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsAdminProductOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('Hapus produk ini dari katalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast('Produk dihapus.');
    }
  };

  const handleSaveProduct = (
    productData: Omit<Product, 'id'>,
    editId?: number
  ) => {
    if (editId) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editId ? { ...productData, id: editId } : p))
      );
      showToast('Perubahan produk disimpan.');
    } else {
      const newProduct: Product = {
        ...productData,
        id: Date.now()
      };
      setProducts((prev) => [newProduct, ...prev]);
      showToast('Produk baru ditambahkan.');
    }
    setIsAdminProductOpen(false);
    setProductToEdit(null);
  };

  const handleResetCatalog = () => {
    if (window.confirm('Kembalikan semua produk ke katalog awal?')) {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('ashlyn_edu_products_v3', JSON.stringify(INITIAL_PRODUCTS));
      showToast('Katalog di-reset ke awal.');
    }
  };

  const handleAddBundle = (productIds: number[], title: string) => {
    const productsToAdd = products.filter((p) => productIds.includes(p.id));
    if (productsToAdd.length === 0) return;

    setCart((prev) => {
      let updated = [...prev];
      productsToAdd.forEach((product) => {
        const existingIndex = updated.findIndex((item) => item.id === product.id);
        if (existingIndex >= 0) {
          // already in cart, keep it
        } else {
          updated.push({ ...product, qty: 1 });
        }
      });
      return updated;
    });

    showToast(`🍓 ${title} masuk ke keranjang!`);
    setIsCartOpen(true);
  };

  // Order Submission with Discount Support
  const handleSubmitOrder = (
    customerInfo: OrderCustomerInfo,
    discountData?: ReturnType<typeof calculateBundlingDiscount>
  ) => {
    const newOrderId = `ASH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalDiscount = discountData || calculateBundlingDiscount(cart);
    const newOrder: CompletedOrder = {
      orderId: newOrderId,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      customer: customerInfo,
      items: [...cart],
      subtotalAmount: finalDiscount.subtotal,
      discountAmount: finalDiscount.discountAmount,
      discountLabel: finalDiscount.discountLabel,
      totalAmount: finalDiscount.total,
      status: 'Menunggu Konfirmasi',
      isQuestionOnly: customerInfo.isQuestionOnly
    };

    setCompletedOrder(newOrder);
    setIsCheckoutOpen(false);
    setCart([]);
  };

  const cartDiscount = useMemo(() => calculateBundlingDiscount(cart), [cart]);
  const cartTotalAmount = cartDiscount.total;
  const cartTotalCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="bg-[#F8EBD8] min-h-screen flex flex-col antialiased text-[#3b3533]">
      {/* Toast Notification Lilnami style */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#3b3533] text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 border border-white/20">
          <Check className="w-3.5 h-3.5 text-[#EFC653]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Mode Bar */}
      {isAdmin && (
        <div className="bg-[#3b3533] text-white py-2 px-4 border-b-2 border-[#8FA477] sticky top-0 z-45 text-xs">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-brand text-[#EFC653]">
              <ShieldCheck className="w-4 h-4 text-[#8FA477]" />
              <span>Dashboard Pengelola Guru Aktif</span>
            </span>

            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <button
                onClick={() => setIsWaSimulatorOpen(true)}
                className="cursor-pointer bg-[#8FA477] hover:bg-[#7b9165] text-white px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 text-[11px]"
                title="Atur nomor WhatsApp & rekening bank"
              >
                <Settings className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pengaturan WA & Bank</span>
                <span className="sm:hidden">WA & Bank</span>
              </button>
              <button
                onClick={handleOpenAddProduct}
                className="cursor-pointer bg-[#D9574F] hover:bg-[#c34c44] text-white px-2.5 sm:px-3 py-1 rounded-xl font-bold flex items-center gap-1 text-[11px]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Produk</span>
              </button>
              <button
                onClick={handleResetCatalog}
                className="cursor-pointer bg-white/10 hover:bg-white/20 text-stone-200 px-2 py-1 rounded-xl text-[11px]"
              >
                Reset
              </button>
              <button
                onClick={() => setIsAdmin(false)}
                className="cursor-pointer text-stone-400 hover:text-white px-1.5 py-1"
                title="Tutup Mode Guru"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartTotalCount}
        cartTotal={cartTotalAmount}
        onOpenCart={() => setIsCartOpen(true)}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSearchQuery('');
        }}
        onOpenWaSimulator={() => setIsWaSimulatorOpen(true)}
        whatsappNumber={storeSettings.whatsappNumber}
        shopeeUrl={storeSettings.shopeeUrl}
      />

      {/* Main Container */}
      <main className="flex-grow max-w-5xl w-full mx-auto p-3 sm:p-4 md:p-6 pb-24">
        {/* Hero Banner */}
        <HeroBanner
          onExploreCatalog={() => {
            const el = document.getElementById('katalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenWaSimulator={() => setIsWaSimulatorOpen(true)}
        />

        {/* Bundling Packages Showcase */}
        <BundlingShowcase onAddBundle={handleAddBundle} />

        {/* Category Chips & Sort */}
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          products={products}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Products Grid: 2 cols on mobile, 3 on md, 4 on lg */}
        {filteredProducts.length === 0 ? (
          <div className="col-span-full py-12 text-center space-y-2 bg-white/60 rounded-3xl border-2 border-dashed border-[#E9899F]/40">
            <div className="text-4xl">🌸</div>
            <p className="font-brand text-[#D9574F] text-sm font-bold">Produk tidak ditemukan</p>
            <p className="text-xs text-stone-500">Coba cari kata kunci lain atau pilih kategori Semua.</p>
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 bg-[#D9574F] text-white font-bold text-xs rounded-xl"
            >
              Lihat Semua Produk
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isAdmin={isAdmin}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onViewProduct={(p) => setDetailProduct(p)}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Sticky Bottom Cart Bar on Mobile for Easy Ordering */}
      {cart.length > 0 && (
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-[#E9899F]/40 p-2.5 shadow-xl">
          <div className="flex items-center justify-between gap-3 max-w-5xl mx-auto">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-stone-500 block leading-tight">
                  {cartTotalCount} produk
                </span>
                {cartDiscount.discountAmount > 0 && (
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                    Hemat {formatRupiah(cartDiscount.discountAmount)}
                  </span>
                )}
              </div>
              <span className="font-brand text-sm font-bold text-[#D9574F] leading-tight">
                {formatRupiah(cartTotalAmount)}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#D9574F] hover:bg-[#c34c44] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 retro-box active:scale-95 transition"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Lihat Keranjang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {/* 1. Detail Modal */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        onBuyNow={handleBuyNow}
      />

      {/* 2. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onAddBundle={(ids) => handleAddBundle(ids, 'Paket Bundling')}
      />

      {/* 3. Checkout Modal */}
      <OrderCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onBackToCart={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
        cart={cart}
        onSubmitOrder={handleSubmitOrder}
      />

      {/* 4. Success Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onOpenInvoice={(order) => setInvoiceOrder(order)}
        settings={storeSettings}
      />

      {/* 5. Printable Invoice Modal */}
      <InvoiceModal
        order={invoiceOrder}
        onClose={() => setInvoiceOrder(null)}
      />

      {/* 6. Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* 7. Admin Add/Edit Modal */}
      <AdminProductModal
        isOpen={isAdminProductOpen}
        onClose={() => {
          setIsAdminProductOpen(false);
          setProductToEdit(null);
        }}
        productToEdit={productToEdit}
        onSave={handleSaveProduct}
      />

      {/* 8. WhatsApp Simulator & Store Settings Modal */}
      <WhatsAppSimulatorModal
        isOpen={isWaSimulatorOpen}
        onClose={() => setIsWaSimulatorOpen(false)}
        settings={storeSettings}
        onSaveSettings={(newSettings) => {
          setStoreSettings(newSettings);
          localStorage.setItem('ashlyn_edu_store_settings', JSON.stringify(newSettings));
          showToast('🌸 Pengaturan WhatsApp & Bank berhasil disimpan!');
        }}
      />
    </div>
  );
}
