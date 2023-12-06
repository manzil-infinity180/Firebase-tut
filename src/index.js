import { initializeApp } from "firebase/app"
import { getFirestore,collection, getDocs } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBsHAGQWCBustmhi21wIUJGlMaL7A6ST5g",
  authDomain: "fir-myself-5419a.firebaseapp.com",
  projectId: "fir-myself-5419a",
  storageBucket: "fir-myself-5419a.appspot.com",
  messagingSenderId: "234099707295",
  appId: "1:234099707295:web:09b9abac9aeb22534581aa",
  measurementId: "G-5NKW76F89J"
};
initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db,'books');
getDocs(colRef).then((snapshot)=>{
  console.log(snapshot.docs.map((el)=>el.data()));
  const books =[];
  snapshot.forEach((doc)=>{
    books.push({...doc.data(),id: doc.id})
  });
  console.log(books)
})