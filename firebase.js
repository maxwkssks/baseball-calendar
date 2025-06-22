// ✅ Firebase SDK - Firestore 모듈 기반 초기화
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ 네 firebaseConfig 정보
const firebaseConfig = {
  apiKey: "AIzaSyCsKo_o-bHGFf3VYr3I11rLPkPXKeq0kPg",
  authDomain: "baseball-schedule-58a7d.firebaseapp.com",
  projectId: "baseball-schedule-58a7d",
  storageBucket: "baseball-schedule-58a7d.firebasestorage.app",
  messagingSenderId: "35362116232",
  appId: "1:35362116232:web:7dd2cbfd89066bf041053d",
  measurementId: "G-N77LKB6BFJ"
};

// ✅ Firebase 앱과 Firestore 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ 외부에서 사용할 수 있게 export
export { db, doc, getDoc, setDoc };
