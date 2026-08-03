// ============================================
// KONFIGURASI FIREBASE
// ============================================
// PENTING: File ini harus SAMA PERSIS dengan
// pasangannya di folder satunya (main-website <-> admin-website)
// supaya kedua website terhubung ke database yang sama.
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyBtYz-nq6sZocPwxXCIJQkZ4v8Tj2BAmzc",
  authDomain: "myportofolio-88a48.firebaseapp.com",
  projectId: "myportofolio-88a48",
  storageBucket: "myportofolio-88a48.firebasestorage.app",
  messagingSenderId: "621554341993",
  appId: "1:621554341993:web:36682f074b39d1c07deaf8"
};

// Inisialisasi Firebase (pakai versi "compat" biar simpel, tanpa build tool)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
