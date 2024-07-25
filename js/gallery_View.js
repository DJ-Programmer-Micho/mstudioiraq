const timage = document.querySelector('#gallery');
const loadMoreNews = document.querySelector('#loadMoreNews button');
let lastDoc = null;
var i = 0;

const ourProduction = async () => {
    const ourprodRef = db.collection('images')
    .where('active', '==','1')
    .orderBy('no', "asc")
    .startAfter(lastDoc || 0)
    .limit(14);
    const ourimgData = await ourprodRef.get();

    let tempprog = '';
    ourimgData.docs.forEach(doc =>{
        const mprog = doc.data();
        tempprog += 
        `
        <img src="${mprog.image}">
        `
    });
    timage.innerHTML += tempprog;
    lastDoc = ourimgData.docs[ourimgData.docs.length - 1];
    
    if(ourimgData.empty){
        loadMoreNews.removeEventListener('click',function() { loadclick(); });
        document.getElementById("loadMoreNews").classList.add('displaynone');
    }
}

window.addEventListener('DOMContentLoaded', () => ourProduction());

loadMoreNews.addEventListener('click', function() {
    ourProduction();
});