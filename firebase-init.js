// ---------------------------------------------------------------------------
// Firebase setup for login + Suggestion Warehouse.
//
// Loaded directly by the browser via CDN (see the <script type="module">
// tag in public/index.html) — no npm install / build step needed for
// Firebase itself. See SETUP-FIREBASE.md in the project root for the
// step-by-step account setup this file depends on.
//
// 1. Fill in the firebaseConfig object below with the values from your
//    Firebase project (Project settings > General > Your apps > SDK setup).
// 2. Update ADMIN_EMAIL if you ever want a different account to have
//    rating powers on the Suggestion Warehouse.
// ---------------------------------------------------------------------------

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

// ---- 1. YOUR FIREBASE PROJECT CONFIG ----
const firebaseConfig = {
  apiKey: 'AIzaSyCfMR1ZMxc520RqgHHmZejL-_px0P0EWqc',
  authDomain: 'madisonkboudreaux-site.firebaseapp.com',
  projectId: 'madisonkboudreaux-site',
  storageBucket: 'madisonkboudreaux-site.firebasestorage.app',
  messagingSenderId: '286776726349',
  appId: '1:286776726349:web:677ffde4024afbc5791d04',
};

// ---- 2. The only account allowed to rate suggestions ----
const ADMIN_EMAIL = 'madison.k.boudreaux@gmail.com';

function emit(name, detail) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

let app = null;
let auth = null;
let db = null;
let configured = firebaseConfig.apiKey !== 'REPLACE_ME';

if (configured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    console.error('Firebase failed to initialize:', err);
    configured = false;
  }
}

if (auth) {
  onAuthStateChanged(auth, (user) => {
    emit('suggestions:auth-changed', {
      user: user
        ? { uid: user.uid, email: user.email, displayName: user.displayName }
        : null,
    });
  });
}

function requireAuth() {
  if (!auth || !auth.currentUser) {
    throw new Error('You need to be signed in first.');
  }
  return auth.currentUser;
}

window.suggestionsAPI = {
  ADMIN_EMAIL,
  configured,

  async signInWithGoogle() {
    if (!auth) throw new Error('Firebase is not configured yet.');
    await signInWithPopup(auth, new GoogleAuthProvider());
  },

  async signUpWithEmail(name, email, password) {
    if (!auth) throw new Error('Firebase is not configured yet.');
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(cred.user, { displayName: name });
      emit('suggestions:auth-changed', {
        user: { uid: cred.user.uid, email: cred.user.email, displayName: name },
      });
    }
  },

  async signInWithEmail(email, password) {
    if (!auth) throw new Error('Firebase is not configured yet.');
    await signInWithEmailAndPassword(auth, email, password);
  },

  async signOutUser() {
    if (!auth) return;
    await signOut(auth);
  },

  async submitSuggestion(text) {
    const user = requireAuth();
    if (!db) throw new Error('Firebase is not configured yet.');
    await addDoc(collection(db, 'suggestions'), {
      text,
      authorUid: user.uid,
      authorName: user.displayName || user.email || 'Anonymous',
      createdAt: serverTimestamp(),
      rating: null,
    });
  },

  async rateSuggestion(id, rating) {
    const user = requireAuth();
    if (user.email !== ADMIN_EMAIL) {
      throw new Error('Only the site owner can rate suggestions.');
    }
    if (!db) throw new Error('Firebase is not configured yet.');
    await updateDoc(doc(db, 'suggestions', id), {
      rating,
      ratedAt: serverTimestamp(),
    });
  },

  async deleteSuggestion(id) {
    const user = requireAuth();
    if (user.email !== ADMIN_EMAIL) {
      throw new Error('Only the site owner can delete suggestions.');
    }
    if (!db) throw new Error('Firebase is not configured yet.');
    await deleteDoc(doc(db, 'suggestions', id));
  },

  subscribeSuggestions(callback) {
    if (!db) return () => {};
    const q = query(collection(db, 'suggestions'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  },
};

emit('suggestions:ready', { configured });
