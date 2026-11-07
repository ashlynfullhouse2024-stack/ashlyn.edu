import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocFromServer,
  serverTimestamp,
  query,
  where
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { CompletedOrder, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, isPkkmItem, PKKM_LICENSE_POOL } from '../data/initialProducts';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write'
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData.map((provider) => ({
          providerId: provider.providerId,
          displayName: provider.displayName,
          email: provider.email,
          photoUrl: provider.photoURL
        })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

export const ADMIN_EMAIL = 'anpurwa001@gmail.com';

export function isFirebaseAdminUser(user: User | null): boolean {
  if (!user) return false;
  return user.email === ADMIN_EMAIL && user.emailVerified;
}

export async function signInAdminWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signOutFirebaseAdmin(): Promise<void> {
  await signOut(auth);
}

export { onAuthStateChanged };
export type { User };

function serializeOrderForCreate(order: CompletedOrder, ownerId: string, isAdmin: boolean) {
  const hasPkkm = !order.isQuestionOnly && order.items.some((i) => isPkkmItem(i));
  const payload: Record<string, unknown> = {
    orderId: order.orderId,
    ownerId,
    date: order.date,
    customerName: order.customer.name.slice(0, 120),
    customerPhone: order.customer.phone.slice(0, 32),
    paymentMethod: order.customer.paymentMethod.slice(0, 120),
    itemsJson: order.items.slice(0, 15).map((item) => `${item.id}:::${item.name}:::${item.qty}:::${item.price}`),
    totalAmount: order.totalAmount,
    status: isAdmin ? order.status : 'Menunggu Konfirmasi',
    isQuestionOnly: Boolean(order.isQuestionOnly),
    hasPkkm,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  if (order.customer.email) {
    payload.customerEmail = order.customer.email.slice(0, 160);
  }
  if (order.customer.notes || order.customer.questionText) {
    payload.notes = (order.customer.notes || order.customer.questionText || '').slice(0, 500);
  }
  if (typeof order.subtotalAmount === 'number') {
    payload.subtotalAmount = order.subtotalAmount;
  }
  if (typeof order.discountAmount === 'number') {
    payload.discountAmount = order.discountAmount;
  }
  if (order.discountLabel) {
    payload.discountLabel = order.discountLabel.slice(0, 120);
  }
  if (order.assignedLicense?.licenseCode) {
    payload.licenseCode = order.assignedLicense.licenseCode.slice(0, 32);
  }
  if (isAdmin && order.assignedLicense?.username && order.status !== 'Menunggu Konfirmasi') {
    payload.licenseUsername = order.assignedLicense.username.slice(0, 64);
    payload.licensePassword = order.assignedLicense.password.slice(0, 64);
  }
  return payload;
}

function deserializeOrderDoc(data: Record<string, unknown>): CompletedOrder {
  const productById = new Map(INITIAL_PRODUCTS.map((p) => [p.id, p]));
  const rawItems = Array.isArray(data.itemsJson) ? (data.itemsJson as string[]) : [];
  const items = rawItems.map((entry, idx) => {
    const parts = String(entry).split(':::');
    const id = Number(parts[0]) || idx + 1;
    const name = parts[1] || 'Produk Digital';
    const qty = Number(parts[2]) || 1;
    const price = Number(parts[3]) || 0;
    const baseProd = productById.get(id);
    return {
      id,
      name,
      category: baseProd?.category || 'Aplikasi & Administrasi',
      price,
      rating: baseProd?.rating || 5,
      reviews: baseProd?.reviews || 10,
      image: baseProd?.image || '/assets/aistudio/01_pkkm-bikin-stres.webp',
      description: baseProd?.description || '',
      accessLink: baseProd?.accessLink,
      qty
    };
  });

  const licenseCode = typeof data.licenseCode === 'string' ? data.licenseCode : undefined;
  const licenseUsername = typeof data.licenseUsername === 'string' ? data.licenseUsername : undefined;
  const licensePassword = typeof data.licensePassword === 'string' ? data.licensePassword : undefined;

  let assignedLicense: CompletedOrder['assignedLicense'] = undefined;
  if (licenseUsername && licensePassword) {
    assignedLicense = {
      username: licenseUsername,
      password: licensePassword,
      licenseCode: licenseCode || 'PKKM-01',
      productName: 'PKKM Bikin Stres???'
    };
  } else if (licenseCode) {
    const matchAcc = PKKM_LICENSE_POOL.find(
      (a) => `PKKM-${String(a.no).padStart(2, '0')}` === licenseCode
    );
    if (matchAcc) {
      assignedLicense = {
        username: matchAcc.username,
        password: matchAcc.password,
        licenseCode,
        productName: 'PKKM Bikin Stres???'
      };
    }
  }

  const createdAtTs =
    data.createdAt && typeof (data.createdAt as { toMillis?: () => number }).toMillis === 'function'
      ? (data.createdAt as { toMillis: () => number }).toMillis()
      : Date.now();

  return {
    orderId: String(data.orderId || ''),
    date: String(data.date || ''),
    createdAt: createdAtTs,
    customer: {
      name: String(data.customerName || ''),
      phone: String(data.customerPhone || ''),
      email: typeof data.customerEmail === 'string' ? data.customerEmail : undefined,
      paymentMethod: String(data.paymentMethod || 'BCA'),
      notes: typeof data.notes === 'string' ? data.notes : undefined,
      isQuestionOnly: Boolean(data.isQuestionOnly)
    },
    items,
    subtotalAmount: typeof data.subtotalAmount === 'number' ? data.subtotalAmount : undefined,
    discountAmount: typeof data.discountAmount === 'number' ? data.discountAmount : undefined,
    discountLabel: typeof data.discountLabel === 'string' ? data.discountLabel : undefined,
    totalAmount: Number(data.totalAmount || 0),
    status: (data.status as OrderStatus) || 'Menunggu Konfirmasi',
    isQuestionOnly: Boolean(data.isQuestionOnly),
    assignedLicense
  };
}

export async function saveOrderToFirestore(order: CompletedOrder): Promise<void> {
  const user = auth.currentUser;
  if (!user) return;
  const path = `orders/${order.orderId}`;
  try {
    const isAdmin = isFirebaseAdminUser(user);
    const payload = serializeOrderForCreate(order, user.uid, isAdmin);
    await setDoc(doc(db, 'orders', order.orderId), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateOrderInFirestore(order: CompletedOrder): Promise<void> {
  const user = auth.currentUser;
  if (!user || !isFirebaseAdminUser(user)) return;
  const path = `orders/${order.orderId}`;
  try {
    const updatePayload: Record<string, unknown> = {
      status: order.status,
      updatedAt: serverTimestamp()
    };
    if (order.assignedLicense?.licenseCode) {
      updatePayload.licenseCode = order.assignedLicense.licenseCode.slice(0, 32);
    }
    if (order.assignedLicense?.username && order.status !== 'Menunggu Konfirmasi') {
      updatePayload.licenseUsername = order.assignedLicense.username.slice(0, 64);
      updatePayload.licensePassword = order.assignedLicense.password.slice(0, 64);
    }
    await updateDoc(doc(db, 'orders', order.orderId), updatePayload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteOrderFromFirestore(orderId: string): Promise<void> {
  const user = auth.currentUser;
  if (!user || !isFirebaseAdminUser(user)) return;
  const path = `orders/${orderId}`;
  try {
    await deleteDoc(doc(db, 'orders', orderId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribeToFirestoreOrders(
  user: User,
  onOrdersChange: (orders: CompletedOrder[]) => void
): () => void {
  const isAdmin = isFirebaseAdminUser(user);
  const ordersRef = collection(db, 'orders');
  const q = isAdmin ? ordersRef : query(ordersRef, where('ownerId', '==', user.uid));

  return onSnapshot(
    q,
    (snapshot) => {
      const list = snapshot.docs
        .map((d) => deserializeOrderDoc(d.data() as Record<string, unknown>))
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      onOrdersChange(list);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, 'orders');
    }
  );
}
