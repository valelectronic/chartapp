import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBWRqvsB3wame-YJRqs6NKTwRiH4dEgYrU",
  authDomain: "my-messaging-app-e8e91.firebaseapp.com",
  projectURL: "http://my-messaging-app-e8e91.firbaseio.com",
  projectId: "my-messaging-app-e8e91",
  storageBucket: "my-messaging-app-e8e91.appspot.com",
  messagingSenderId: "752112281357",
  appId: "1:752112281357:web:a37a92792fe81ff2b07244",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)
export { auth, db,storage };
