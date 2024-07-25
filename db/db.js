const firebaseConfig = {
    apiKey: "AIzaSyC7jVEhrsBGhUV7ozsMgwxE-bET1IMpM5A",
    authDomain: "mstudioiraq-7dc32.firebaseapp.com",
    projectId: "mstudioiraq-7dc32",
    storageBucket: "mstudioiraq-7dc32.appspot.com",
    messagingSenderId: "1027455205276",
    appId: "1:1027455205276:web:34ad88b06a74ae9bf6d259",
    measurementId: "G-ED10RJQK3Q"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();