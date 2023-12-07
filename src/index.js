import { initializeApp } from "firebase/app"
import { getFirestore,collection, getDocs, addDoc, deleteDoc, doc, onSnapshot
          } from "firebase/firestore"

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

// get collection data 
// getDocs(colRef).then((snapshot)=>{
//   console.log(snapshot.docs[0].data(),"id:", snapshot.docs[0].id);
//   console.log(snapshot.docs.map((el)=>el.data()));

//   const books =[];
//   snapshot.forEach((doc)=>{
//     books.push({...doc.data(),id: doc.id})
//   });
//   console.log(books)
// }).catch(err =>{
// console.log(err.message);
// });

// real time collection data
onSnapshot(colRef,(snapshot)=>{
  console.log(snapshot.docs[0].data(),"id:", snapshot.docs[0].id);
  console.log(snapshot.docs.map((el)=>el.data()));
  
    const books =[];
    snapshot.forEach((doc)=>{
      books.push({...doc.data(),id: doc.id})
    });
    console.log(books)
})

const addItem = document.querySelector('.add');
addItem.addEventListener('submit',(e)=>{
  e.preventDefault();
  addDoc(colRef,{
    title: addItem.title.value,
    author : addItem.author.value
  })
})
const deleteItem = document.querySelector('.delete')
deleteItem.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteItem.id.value)
  
  deleteDoc(docRef)
    .then(() => {
      deleteItem.reset()
    }).catch(err=>{
      console.log(err.message);
    })
})