auth.onAuthStateChanged(user => {
    if (user) {


        // const who = document.querySelector('#who');
        var pub = user.uid;
        db.collection('user').where("uid", "==", pub).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var publisherName = doc.data().publisher;
                // who.innerHTML = "Welcome " + publisherName;
                document.querySelector('#publisher2').value = publisherName;
            })
        })





        var ImgName2, ImgUrl2;
        var files2 = [];
        var reader2;
        const ref2 = db.collection("artist").doc(id).collection('01');
        // var refc = db.doc("count/upload");
        var refd2 = db.doc("countD/no");

        const upload2 = document.querySelector("#upload2");
        // const count = document.querySelector("#imgname");


        // Taking Number
        refd2.get().then((doc) => {
            if (doc && doc.exists) {
                const output1 = doc.data();
                var countdesc = output1.no - 1;

                refd2.update({
                    no: countdesc
                }).then(function () {
                    // document.querySelector('input[id = "imgname"]').value = countdesc;
                    document.querySelector('#countD').value = countdesc;
                }).catch(function (error) {
                    console.log("Nope, ", error);
                });
            }
        });

        // Adding Image
        document.getElementById("select2").onclick = function (e) {

            var input2 = document.createElement('input');
            input2.type = 'file';

            input2.onchange = e => {
                files2 = e.target.files;
                reader2 = new FileReader();
                reader2.onload = function () {
                    document.getElementById("myimg2").src = reader2.result;
                }
                reader2.readAsDataURL(files2[0]);
            }
            input2.click();
        }


        upload2.addEventListener("click", function () {

            trackName = document.getElementById('trackName').value;
            seq = document.getElementById('countD').value;

            console.log("sending");

            ImgName2 = document.getElementById('imgname2').value;

            console.log(files2[0]);
            var uploadTask2 = firebase.storage().ref('artist_track_art/' + trackName + ".png").put(files2[0]);

            console.log('artist_track_art/' + ImgName2 + ".png");
            uploadTask2.on('state_changed', function (snapshot) {
                    var progress2 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    document.getElementById('upP2').style.width = progress2 + '%';
                    console.log(progress2 + '%');
                },
                //err
                function (error) {
                    alert('Something went Wrong!');
                },
                //submit          
                function () {
                    uploadTask2.snapshot.ref.getDownloadURL().then(function (url2) {
                        ImgUrl2 = url2;




                        var data2 = {
                            trackName: trackName,
                            trackNameText: trackName,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            publisher: 'a',
                            active: "1",
                            image: ImgUrl2,
                            no: seq
                        }


                        ref2.doc(trackName).set(data2, {
                            merge: true
                        }).then(function () {
                            window.alert(
                                "Data has been Uploaded Succefully");
                            setTimeout(() => {
                                window.location.href =
                                    '../upload/artist_update.html?id='+id;
                            }, 2000);
                        }).catch(function (error) {
                            window.alert(error, "Something went wrong!");
                        });
                    })
                });
        });
        /*
        end of user 
        */
    } else {
        window.alert("No Active User");
    }
});