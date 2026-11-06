import { INITIAL_PRODUCTS } from './initialProducts';

// Product URLs included in the admin's WhatsApp payment-confirmation/access message.
// Keep these in the catalog data so old browser-saved products can receive the latest link.
const PRODUCT_ACCESS_LINKS: Record<number, string> = {
  1: 'https://generator-pkkm.pages.dev/',
  2: 'https://edusuite-ai.pages.dev/',
  3: 'https://studynotes-miniest.pages.dev/',
  4: 'https://lkpd-gamification.toko-ashlyn.workers.dev/',
  5: 'https://asistenguru.toko-ashlyn.workers.dev/',
  6: 'https://lkpd-ai.pages.dev/',
  7: 'https://portalgurupiket.toko-ashlyn.workers.dev/',
  8: 'https://inklusistudio.pages.dev/',
  11: 'https://rpp-newgen.pages.dev/',
  12: 'https://rpp-pmkbc.pages.dev/',
  13: 'https://canva.link/3lyazu7potpxw37',
  14: 'https://canva.link/bbh1dzhoaydc8me',
  16: 'https://cover-sosmed.pages.dev/',
  27: 'https://canva.link/9nf0tfv0zqvh4uf'
};

INITIAL_PRODUCTS.forEach((product) => {
  const accessLink = PRODUCT_ACCESS_LINKS[product.id];
  if (accessLink) product.accessLink = accessLink;
});
