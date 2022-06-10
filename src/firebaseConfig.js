import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBUAV-BB9uB4FXFUKNseRI-7sG89_fiSTU",
  authDomain: "book-of-abstract.firebaseapp.com",
  projectId: "book-of-abstract",
  storageBucket: "book-of-abstract.appspot.com",
  messagingSenderId: "95619314209",
  appId: "1:95619314209:web:acd7fe1ed21f3a010a6960",
  measurementId: "G-KXKMNEVJNY"
};

const firebase = initializeApp(firebaseConfig);

export default firebase