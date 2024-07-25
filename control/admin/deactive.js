// const params = (new URL(document.location)).searchParams;
// const id = params.get('id');

// // document.getElementById('docid').value = id;

// db.collection("artist").doc(id)



function del(id) {
    // const auth = firebase.auth();

    if (confirm("  هل تريد أن تحذف خبر -- " + id)) {
        auth.onAuthStateChanged(user => {
            if (user) {

                db.collection("artist").doc(id).update({
                    active: "0",
                }).then(() => {
                    window.alert("Done");
                    window.location.reload();
                })
                .catch((error) => {
                    window.alert("لا يحق لك مسح البيانات");
                });


            } else {
                window.alert("No Active User");
            }
        });

    }
    
}