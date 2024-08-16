
// Importar Firebase
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBFcYlfE_980jUfbwxjaurA8UxNKw4DslU",
  authDomain: "receita-fb2c4.firebaseapp.com",
  databaseURL: "https://receita-fb2c4-default-rtdb.firebaseio.com",
  projectId: "receita-fb2c4",
  storageBucket: "receita-fb2c4.appspot.com",
  messagingSenderId: "897497194862",
  appId: "1:897497194862:web:b5783e2e3cd6518cc4617f",
  measurementId: "G-D4DZYHSN2X"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export {analytics, auth, db, app}

