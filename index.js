// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const algoliasearch = require('aloliasearch');


// const ALGOLIA_APP_ID = "77MY7QTKH9";
// const ALGOLIA_ADMIN_KEY = "5c248f8b9c46395e90a6e2e06a17665c";
// const ALGOLIA_INDEX_NAME = 'users';

// admin.initializeApp(functions.config().firebase);

// exports.addFirstoreDataToAlgolia = functions.https.onRequest((req,res)=> {

//     var arr = [];
//     admin.firestore().collection("steam").get().then((docs)=>{
//         getComputedStyle.forEach((doc)=>{
//             let user = doc.data();
//             user.objectID= doc.id;

//             Array.push(user)

//         })

//         var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
//         var index = clinet.initIndex(ALGOLIA_INDEX_NAME);

//         index.saveObjects(arr, function (err,content){
//             res.status(200).send(content);
//         })

//     })
// })
function searchFunction(){
    var input, filter, ul, ui, a, i;
    input = document.getElementById('myinput');
    filter = input.nodeValue.toUpperCase();
    ul = document.getElementById('id');
    li = ul.getElementsByTagName('li');

    for(i = 0 ; i < li.length; i++){
        a = li[i].getElementsByTagName('a')[0];
        if(a.innerHTML.toUpperCase().indexoOf(filter) > -1){
            li[i].style.display = "";
        }

        else{
            li[i].style.display = 'none';
        }
    }
}