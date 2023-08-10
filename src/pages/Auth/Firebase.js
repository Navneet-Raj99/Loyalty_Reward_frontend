import firebase from "firebase";

const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyBKREhisL75v-fVTUA0xTQ3iTTGTKWCo0w",
  authDomain: "rentalbike-28d8d.firebaseapp.com",
  projectId: "rentalbike-28d8d",
  storageBucket: "rentalbike-28d8d.appspot.com",
  messagingSenderId: "167068927983",
  appId: "1:167068927983:web:d00f4ae83f4218d879981a",
  measurementId: "G-K82650E51L",
};
firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
export { auth, firebase };
