auth.onAuthStateChanged(user => {
    if(user){
        const who = document.querySelector('#who');
        var pub = user.uid;
        db.collection('user').where("uid","==",pub).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var publisherName = doc.data().publisher;            
                who.innerHTML = "Welcome " + publisherName;
                imageTable();
            })
        })

//NEWS Section
const imageData = document.querySelector('.tdata');
const loadMoreNews = document.querySelector('#loadMoreNews button');
let lastDoc = null;
var i = 0;
const imageTable = async () => {
    const imageTableRef = db.collection('images')
    .where('active', '==','1')
    .orderBy('no',"asc")
    .startAfter(lastDoc || 0)
    .limit(3);
    const imageTableData = await imageTableRef.get(); 
    let template = '';
    imageTableData.docs.forEach(doc =>{
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
        const imageTableView = doc.data();

        template += `
        <tr>
        <td class="text-center align-middle">${i}</td>
        <td class="text-center align-middle"><img src="${imageTableView.image}" width="80px" class="m-1"></td>        
        <td class="text-center">${imageTableView.imageName}</td>     
        <td class="text-center">${t10}</td>     
        <td align-middle"><a onclick="del('${imageTableView.imageID}')"><i class="fas fa-trash"></i></a></td>            
        </tr>
            `
            console.log(imageTableView)
    });
    imageData.innerHTML += template;
    console.log('images');
    lastDoc = imageTableData.docs[imageTableData.docs.length - 1];
    
    if(imageTableData.empty){
        loadMoreNews.removeEventListener('click',function() { loadclick(); });
        document.getElementById("loadMoreNews").classList.add('displaynone');
    }
}

window.addEventListener('DOMContentLoaded', () => imageTable());

loadMoreNews.addEventListener('click', function() {
    imageTable();
});


}else{
    window.alert("No Active User");
    }
    });