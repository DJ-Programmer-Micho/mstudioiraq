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

const userAuth = async () => {
    auth.onAuthStateChanged(function(user){
        if(user){
            var pub = user.uid;
            // 
            db.collection('user').where("uid","==",pub).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var isAdmin = doc.data().isAdmin;

                    if(isAdmin == true){
                        window.location.href = "./admin/dash.html";
                    } else {
                        window.location.href = "./admin/dash.html";
                    }
                })
            })
        }else{
            alert("No Active User");
        }
    });
}
window.addEventListener('DOMContentLoaded', () => userAuth());
