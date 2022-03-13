import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'sumtext-1bd95.firebaseapp.com',
  projectId: 'sumtext-1bd95',
  storageBucket: 'sumtext-1bd95.appspot.com',
  messagingSenderId: '375279699887',
  appId: '1:375279699887:web:1ea9ee908476f721f2915a',
  measurementId: 'G-4FGWT03E15',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firestore
export const db = getFirestore(app);
