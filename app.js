  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { 
    getFirestore, collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc, onSnapshot
  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBgiggADUdxTaZdv7upfK0SskexPiNEOSk",
    authDomain: "workshop-test-b29ea.firebaseapp.com",
    projectId: "workshop-test-b29ea",
    storageBucket: "workshop-test-b29ea.appspot.com",
    messagingSenderId: "542469383755",
    appId: "1:542469383755:web:426e5a8df9f9d0f9158fce"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // initialize service
  const db = getFirestore()

  //collection ref
  const colRef = collection(db, 'books')

  //get collection data
  onSnapshot(colRef, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })

    //adding documents
    const addBookForm = document.querySelector('.add')
    addBookForm.addEventListener('submit', (e) => {
      e.preventDefault()

      addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
      })
      .then(() => {
        addBookForm.reset()
      })
    })

    //deleting documents
    const deleteBookForm = document.querySelector('.delete')
    deleteBookForm.addEventListener('submit', (e) => {
      e.preventDefault()

      const docRef = doc(db, 'books', deleteBookForm.id.value)

      deleteDoc(docRef)
        .then(() => {
          deleteBookForm.reset()
        })

    })

    //updating a document
    const updateForm = document.querySelector('.update')
    updateForm.addEventListener('submit', (e) => {
      e.preventDefault()

      const docRef = doc(db, 'books', updateForm.id.value)

      updateDoc(docRef, {
        title: "titleUpd.value"
      })
      .then(() => {
        updateForm.reset()
      })
    })