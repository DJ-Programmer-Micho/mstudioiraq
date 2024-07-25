auth.onAuthStateChanged(user => {
    if(user){
        const who = document.querySelector('#who');
        var pub = user.uid;
        db.collection('user').where("uid","==",pub).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var publisherName = doc.data().publisher;            
                who.innerHTML = "Welcome " + publisherName;
                newsTable();
            })
        })

//NEWS Section
const newsData = document.querySelector('.tdata');
const loadMoreNews = document.querySelector('#loadMoreNews button');
let lastDoc = null;
var i = 0;
const newsTable = async () => {
    const newsTableRef = db.collection('artist')
    .where('active', '==','1')
    .orderBy('no',"asc")
    .startAfter(lastDoc || 0)
    .limit(3);
    const newsTableData = await newsTableRef.get(); 
    let template = '';
    newsTableData.docs.forEach(doc =>{
        i++;
        moment.locale('en');  
        const t1 = doc.data().timestamp.toMillis();
        const t2 = new Date(t1);
        const t3 = t2.getFullYear();
        const t4 = ('0' + (t2.getMonth()+1)).slice(-2);
        const t5 = ('0' + (t2.getDate())).slice(-2)
        const t6 = ('0' + (t2.getHours())).slice(-2);
        const t7 = ('0' + (t2.getMinutes())).slice(-2);
        const t8 = ('0' + (t2.getSeconds())).slice(-2);
        const t9 = t3+""+t4+""+t5+""+t6+""+t7+""+t8;
        const t10 = moment(t9, "YYYYMMDDhmms").fromNow();
        // const desc1=doc.data().Description;
        // const desc2 = desc1.slice(0,180) + "...";
        const newsTableView = doc.data();
        // const img2 = doc.data().Img2;


        // if(img2 == "undefined" || img2 == null || img2 == ""){
        //     img2C = 'src="" class="kill"';
        //     // document.getElementById('i2').classList.add('kill');
        // } else {
        //     img2C = `src="${img2}" width="150px" class="m-1"`;
        // }


        template += `
        <tr>
        <td class="text-center align-middle">${i}</td>
        <td class="text-center align-middle"><img src="${newsTableView.image}" width="80px" class="m-1"></td>
        <td class="text-center">${newsTableView.label}</td>
        <td class="text-center">${t10}</td>
        <td align-middle"><a href="../../upload/artist_update.html?id=${newsTableView.label}"><i class="far fa-edit"></i></a></td>            
        <td align-middle"><a onclick="del('${newsTableView.label}')"><i class="fas fa-trash"></i></a></td>            
        </tr>
            `
    });
    newsData.innerHTML += template;
    console.log('news');
    lastDoc = newsTableData.docs[newsTableData.docs.length - 1];
    
    if(newsTableData.empty){
        loadMoreNews.removeEventListener('click',function() { loadclick(); });
        document.getElementById("loadMoreNews").classList.add('displaynone');
    }
}

window.addEventListener('DOMContentLoaded', () => newsTable());

loadMoreNews.addEventListener('click', function() {
    newsTable();
});


}else{
    window.alert("No Active User");
    }
    });