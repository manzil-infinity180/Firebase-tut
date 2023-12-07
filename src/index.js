import { initializeApp } from "firebase/app"
import { getFirestore,collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, where,query, orderBy, serverTimestamp,
  getDoc,updateDoc
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

// queries  and orderby 

// const q = query(colRef,where("author","==","shreya"),orderBy("title","asc"));
const q = query(colRef,orderBy("createdAt","asc"));
onSnapshot(q,(snapshot)=>{
  console.log(snapshot.docs[0].data(),"id:", snapshot.docs[0].id);
  console.log(snapshot.docs.map((el)=>el.data()));
  
    const books =[];
    snapshot.forEach((doc)=>{
      books.push({...doc.data(),id: doc.id})
    });
    console.log(books)
})

// real time collection data
// onSnapshot(colRef,(snapshot)=>{
//   console.log(snapshot.docs[0].data(),"id:", snapshot.docs[0].id);
//   console.log(snapshot.docs.map((el)=>el.data()));
  
//     const books =[];
//     snapshot.forEach((doc)=>{
//       books.push({...doc.data(),id: doc.id})
//     });
//     console.log(books)
// })

const addItem = document.querySelector('.add');
addItem.addEventListener('submit',(e)=>{
  e.preventDefault();
  addDoc(colRef,{
    title: addItem.title.value,
    author : addItem.author.value,
    createdAt : serverTimestamp()
  }).then(()=>{
    addItem.reset();
  }).catch(err=>{
    console.log(err.message);
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

// get single data 
const docRef = doc(db,'books','KnI1Lq5Z7106HrlT98qf');
onSnapshot(docRef,(doc)=>{
  console.log(doc.data(),doc.id);
});

// update document 
const updateItem = document.querySelector('.update');
updateItem.addEventListener('submit',(e)=>{
  e.preventDefault();
  const docRef = doc(db, 'books', updateItem.id.value)
  updateDoc(docRef,{
    title: updateItem.title.value
  }).then(()=>{
    updateItem.reset();
  })

})