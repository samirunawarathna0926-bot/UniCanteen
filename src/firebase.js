
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoRWFMnm5_sPtx2fI2139lzAu5lbBwDvo",
  authDomain: "ruhuna-canteen.firebaseapp.com",
  projectId: "ruhuna-canteen",
  storageBucket: "ruhuna-canteen.firebasestorage.app",
  messagingSenderId: "219027430384",
  appId: "1:219027430384:web:194ea140bcff0025459b35"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

async function ensureAuth() {
  await auth.authStateReady();

  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }

  return auth.currentUser;
}

export { db, auth, ensureAuth };
