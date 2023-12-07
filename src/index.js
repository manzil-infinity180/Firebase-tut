import { initializeApp } from "firebase/app"
import { getFirestore,collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, where,
  query, orderBy, serverTimestamp,
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

  import { getAuth, createUserWithEmailAndPassword, 
          signInWithEmailAndPassword, signOut,
            onAuthStateChanged,sendEmailVerification, updateProfile,
            GoogleAuthProvider,signInWithRedirect,signInWithPopup} from 'firebase/auth'

initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db,'books');
const auth = getAuth();

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
});

// signing with email and password 
const signup = document.querySelector('.signup');
signup.addEventListener('submit',(e)=>{
  e.preventDefault();
  const email = signup.email.value;
  const password = signup.password.value;
  createUserWithEmailAndPassword(auth,email,password).then((cred)=>{
    console.log('user created: '+cred.user);
    signup.reset();
     sendEmailVerification(cred.user);
  }).catch((err)=>{
    console.log(err.message);
  })
});

// update profile name
const updateprofile = document.querySelector('.update');
updateprofile.addEventListener('submit',(e)=>{
  e.preventDefault();
  updateProfile(auth.currentUser,{
    displayName : "rahul"
  }).then(()=>{
    updateprofile.reset();
    console.log("updated profile name");

  }).catch((err)=>{
    console.log(err.message);
  })
})

// login and logout 

//logout 
const logout = document.querySelector('.logout');
logout.addEventListener('click',()=>{
  signOut(auth).then(()=>{
    console.log("user signout !");
  }).catch((err)=>{
    console.log(err.message);
  })
})
// login
const login = document.querySelector('.login');
login.addEventListener('submit',(e)=>{
  e.preventDefault();
  const email = login.email.value;
  const password = login.password.value;
  signInWithEmailAndPassword(auth,email,password).then((credential)=>{
    const user = credential.user;
    console.log(user);
  }).catch((err)=>{
    console.log(err.message);
  })
});

// sending email verification 
const sendemailverify = document.querySelector('.verify');
sendemailverify.addEventListener('click',()=>{
  sendEmailVerification(auth.currentUser).then(()=>{
    console.log('verification email sent');
  })
})


// subscribing to auth changed 
onAuthStateChanged(auth,(user)=>{
  console.log('User Stated Changed : ',user);
});

// unsubscribing to auth 
// check it out 


/* GOOGLE AUTH */
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// signInWithRedirect(auth,provider);
const googleauth = document.querySelector('.google');
googleauth.addEventListener('click',()=>{
  // signInWithRedirect(auth,provider).then(()=>{
  //   console.log("success");
  // });
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})
