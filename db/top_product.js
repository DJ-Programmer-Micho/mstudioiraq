const tprog = document.querySelector('.tprog');


const progContainer = async () => {
    const tprogRef = db.collection('artist')
    .where('active', '==','1')
    .orderBy('timestamp', "desc")
    .limit(8);
    const tprogData = await tprogRef.get();

    let tempprog = '';
    tprogData.docs.forEach(doc =>{
        const mprog = doc.data();
        tempprog += `
        <div class="gallery-item">
        <a href="${mprog.card_link}" target="_blank">
        <img class="gallery-image" src="${mprog.image}" alt=""M Studio Artist>
       </a>
      </div>
        `
    });
    tprog.innerHTML += tempprog;
}

window.addEventListener('DOMContentLoaded', () => progContainer());



const ourprod = document.querySelector('.ourprod');
const loadMoreNews = document.querySelector('#loadMoreNews button');
let lastDoc = null;
var i = 0;

const ourProduction = async () => {
    const ourprodRef = db.collection('artist')
    .where('active', '==','1')
    .orderBy('no',"asc")
    .startAfter(lastDoc || 0)
    .limit(12);
    const ourprodData = await ourprodRef.get();

    let tempprog = '';
    ourprodData.docs.forEach(doc =>{
        const mprog = doc.data();
        tempprog += `
        <div class="gallery-item">
        <a href="${mprog.card_link}" target="_blank">
        <img class="gallery-image" src="${mprog.image}" alt="M Studio Artist">
       </a>
      </div>
        `
    });
    ourprod.innerHTML += tempprog;
    lastDoc = ourprodData.docs[ourprodData.docs.length - 1];
    
    if(ourprodData.empty){
        loadMoreNews.removeEventListener('click',function() { loadclick(); });
        document.getElementById("loadMoreNews").classList.add('displaynone');
    }
}

window.addEventListener('DOMContentLoaded', () => ourProduction());

loadMoreNews.addEventListener('click', function() {
    ourProduction();
});