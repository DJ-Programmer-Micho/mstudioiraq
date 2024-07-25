function del(imageID) {
    // const auth = firebase.auth();

    if (confirm("  هل تريد أن تحذف خبر -- " + imageID)) {
        auth.onAuthStateChanged(user => {
            if (user) {




                var pub = user.uid;
                db.collection('user').where("uid", "==", pub).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var publisherName = doc.data().isAdmin;



                        if(publisherName == true){

                            db.collection("images").doc(imageID).update({
                                active: "0",
                            }).then(() => {
                                window.alert("Done");
                                window.location.reload();
                            })
                            .catch((error) => {
                                window.alert("لا يحق لك مسح البيانات");
                            });
    
            
                        } else {
                            window.alert("لا يحق لك مسح البيانات");
                        }

                    })
                })
        }
        });

    }
    
}