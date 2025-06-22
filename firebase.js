// ✅ Firebase SDK 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Firebase 설정 (너의 config 그대로 사용)
const firebaseConfig = {
  apiKey: "AIzaSyCsKo_o-bHGFf3VYr3I11rLPkPXKeq0kPg",
  authDomain: "baseball-schedule-58a7d.firebaseapp.com",
  projectId: "baseball-schedule-58a7d",
  storageBucket: "baseball-schedule-58a7d.firebasestorage.app",
  messagingSenderId: "35362116232",
  appId: "1:35362116232:web:7dd2cbfd89066bf041053d",
  measurementId: "G-N77LKB6BFJ"
};

// ✅ Firebase 앱 및 Firestore 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ 필요한 모듈들 export (다른 파일에서 import 가능하게)
export {
  db,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot
};
