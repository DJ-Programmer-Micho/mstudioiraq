const params = (new URL(document.location)).searchParams;
const id = params.get('id');
// document.getElementById('docid').value = id;

const readTooContainer = async () => {

    const nRef = db.collection('artist').doc(id);

    nRef.get().then((doc) => {
        if (doc.exists) {

            var amazon = doc.data().amazon;
            var anghami = doc.data().anghami;
            var apple = doc.data().apple;
            var deezer = doc.data().deezer;
            var instagram = doc.data().instagram;
            var snapchat = doc.data().snapchat;
            var soundCloud = doc.data().soundCloud;
            var spotify = doc.data().spotify;
            var tiktok = doc.data().tiktok;
            var youtube = doc.data().youtube;
           
            if(amazon == null){
                amazon = "";
            }
            if(anghami == null){
                anghami = "";
            }
            if(apple == null){
                apple = "";
            }
            if(deezer == null){
                deezer = "";
            }
            if(instagram == null){
                instagram = "";
            }
            if(snapchat == null){
                snapchat = "";
            }
            if(soundCloud == null){
                soundCloud = "";
            }
            if(spotify == null){
                spotify = "";
            }
            if(tiktok == null){
                tiktok = "";
            }
            if(youtube == null){
                youtube = "";
            }


            document.getElementById('artistName').value = doc.data().label;
            document.getElementById('cardLink').value = doc.data().card_link;
            document.getElementById('amazon').value = amazon;
            document.getElementById('anghami').value = anghami
            document.getElementById('apple').value = apple
            document.getElementById('deezer').value = deezer;
            document.getElementById('instagram').value = instagram;
            document.getElementById('snapchat').value = snapchat;
            document.getElementById('soundCloud').value = soundCloud;
            document.getElementById('spotify').value = spotify;
            document.getElementById('tiktok').value = tiktok;
            document.getElementById('youtube').value = youtube;
            document.querySelector('.oldImg').innerHTML = `<img id="primaryimg" src="${doc.data().image}" class="img-fluid" alt="Album Artist">`
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

}

window.addEventListener('DOMContentLoaded', () => readTooContainer());