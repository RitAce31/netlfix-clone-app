import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3dDvphXaA680qqx6k0BIknHOenZNfEjM",
  authDomain: "netflix-c6ae6.firebaseapp.com",
  projectId: "netflix-c6ae6",
  storageBucket: "netflix-c6ae6.appspot.com",
  messagingSenderId: "689329951612",
  appId: "1:689329951612:web:e2ab8a4f03fe8bfbde0af9",
  measurementId: "G-C647YJHSED",
};

// Use this to initialize the firebase App
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export default storage;
