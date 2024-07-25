var firebaseConfig = {
    apiKey: "AIzaSyC7jVEhrsBGhUV7ozsMgwxE-bET1IMpM5A",
    authDomain: "mstudioiraq-7dc32.firebaseapp.com",
    projectId: "mstudioiraq-7dc32",
    storageBucket: "mstudioiraq-7dc32.appspot.com",
    messagingSenderId: "1027455205276",
    appId: "1:1027455205276:web:34ad88b06a74ae9bf6d259",
    measurementId: "G-ED10RJQK3Q"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();




function signin(){
    
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    check();
}

function check(){
    auth.onAuthStateChanged(function(user){
        if(user){
            var email = user.email;
            alert("Welcome " + email);
            window.location.href = "../control/takeinfo.html";
            //Take user to a different or home page
            //is signed in
        }else{
            //alert("No Active User");
            //no user is signed in
        }
    });
}
function signout(){
    var email = document.getElementById("email").value = "";
    var password = document.getElementById("password").value = "";
    auth.signOut();
    alert("Signed Out");
}
