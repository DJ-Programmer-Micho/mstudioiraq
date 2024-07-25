function take(tn) {


    const readTooContainerU = async () => {

        const uRef = db.collection('artist').doc(id).collection('01').doc(tn);
    
        uRef.get().then((doc) => {

            if (doc.exists) {
    
                var trackName = doc.data().trackNameText;
                var image = doc.data().image;
                if(trackName == null){
                    trackName = "asdsdf";
                }
                if(image == null){
                    image = "";
                }

                document.getElementById('trackNameU').value = trackName;
                document.getElementById('trackNameHidden').value = trackName;
                document.querySelector('.oldImgTrack').innerHTML = `<img id="primaryimg3" src="${doc.data().image}" class="img-fluid" alt="Album Artist">`

                // document.getElementById('imageU').value = image
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
    }
    
    // setTimeout(function() {
    // }, 3000);
    // window.addEventListener('DOMContentLoaded', () => readTooContainerU());
    
    readTooContainerU();




    window.onload = function () {
        document.getElementById('upload2').style.visibility = document.getElementById('upload2')
            .style.visibility == 'hidden' ? 'visible' : 'hidden';
    
        document.getElementById("trackNameU").focus();
    }
    
    
    
    var ImgName3, ImgUrl3;
    var files3 = [];
    var reader3;
    const ref = db.collection("artist").doc(id).collection('01').doc(tn);
    // var refc = db.doc("count/upload");
    // var refd = db.doc("countD/no");
    
    
    
    const upload3 = document.querySelector("#upload3");
    const update3 = document.querySelector("#wait3");
    // const count = document.querySelector("#imgname");
    
    //Adding Image
    document.getElementById("select3").onclick = function (e) {
        document.getElementById('primaryimg3').style.visibility = document.getElementById('primaryimg3').style.visibility == 'hidden' ? 'visible' : 'hidden';
        document.getElementById('p3').style.height = '1px';
        document.getElementById('upload3').style.visibility = document.getElementById('upload3').style.visibility == 'hidden' ? 'visible' : 'visible';
        document.getElementById('wait3').disabled = true;
    
        var input3 = document.createElement('input');
        input3.type = 'file';
    
        input3.onchange = e => {
            files3 = e.target.files;
            reader3 = new FileReader();
            reader3.onload = function () {
                document.getElementById("myimg3").src = reader3.result;
            }
            reader3.readAsDataURL(files3[0]);
        }
        input3.click();
    }
    
    
    upload3.addEventListener("click", function () {
    
    
    
        ImgName3 = document.getElementById('imgname3').value;
        trackName3 = document.getElementById('trackNameU').value;
        trackNameHidden = document.getElementById('trackNameHidden').value;
    
        console.log(files3[0]);
        var uploadTask3 = firebase.storage().ref('artist_track_art/' + trackNameHidden + ".png").put(files3[0]);

    
        uploadTask3.on('state_changed', function (snapshot) {
                var progress3 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                document.getElementById('upP3').style.width = progress3 + '%';
                console.log(progress3 + '%');
            },
            //err
            function (error) {
                alert('Something went Wrong!');
            },
            //submit          
            function () {
                uploadTask3.snapshot.ref.getDownloadURL().then(function (url3) {
                    ImgUrl3 = url3;
    
                    var data3 = {
                        image: ImgUrl3
    };
    
    
    
    
                    ref.update(data3).then(function(){
                        window.alert("Data has been Uploaded Succefully");
                        document.getElementById('wait3').removeAttribute('disabled');
                    }).catch(function(error) {
                        window.alert("Something went wrong!");
                    });
                    // ref.doc(artistName).set(data, {merge: true}).then(function () {
                    //     window.alert("Data has been Uploaded Succefully");
                    //     setTimeout(() => {
                    //         window.location.href ='../control/admin/dash.html';
                    //     }, 2000);
                    // }).catch(function (error) {
                    //     window.alert(error, "Something went wrong!");
                    // });
                })
            });
    });
    
    
    update3.addEventListener("click", function(){
        trackName3 = document.getElementById('trackNameU').value;
    
        console.log("sending");
    
    
    //submit         
    
    var data3 = {
        trackNameText: trackName3,
                    }
                    
    ref.update(data3).then(function(){
    window.alert("Data has been Uploaded Succefully");
    // setTimeout(() => {  window.location.href = './dash.html'; }, 2000);
    setTimeout(() => {  window.location.href = './artist_update.html?id='+id; }, 2000);
    }).catch(function(error) {
    window.alert("Something went wrong!");
    });
    })
}




