const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllIdeas, 
    postIdea, 
    postCommentOnIdea,
    getIdea
} = require('./handlers/ideas');
const { 
    getAllCompetitions, 
    postCompetition, 
    getCompetition,
    postCommentOnCompetition 
} = require('./handlers/competitions');

const {FBAuth} = require('./util/fbAuth');
const {
    companySignup,
    personalSignup, 
    login, 
    uploadImage, 
    updateUserInfo,
    getUserDetails
    } = require('./handlers/users');
const { db } = require('./util/admin');


//algolia searc h code

// const algoliasearch = require('algoliasearch');
// const ALGOLIA_APP_ID = "77MY7QTKH9";
// const ALGOLIA_ADMIN_KEY = "5c248f8b9c46395e90a6e2e06a17665c";
// const ALGOLIA_SEARCH_KEY = "18b91722da3a46a578cb00b008ca1731";
// const ALGOLIA_INDEX_NAME = "ideas";


// Idea routes

app.get('/ideas', getAllIdeas);
app.post('/idea', FBAuth, postIdea);
app.get('/idea/:ideaId', getIdea);
app.post('/idea/:ideaId/comment', FBAuth, postCommentOnIdea);

// app.post('/comment', FBAuth, commentOnIdea);
// Competion routesx    


app.post('/competition', FBAuth, postCompetition);
app.get('/competitions', getAllCompetitions);
app.get('/competition/:competitionId', getCompetition);
app.post('/competition/:competitionId/comment', FBAuth, postCommentOnCompetition);

// user routes
app.post('/signup/company', companySignup);
app.post('/signup/personal', personalSignup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/update', FBAuth, updateUserInfo);
app.get('/user', FBAuth, getUserDetails);


exports.api = functions.region('asia-northeast1').https.onRequest(app);
// exports.addToIndex = functions.region('asia-northeast1').https.onRequest((req, res) => {

//     var arr = [];
//     db.collection('ideas').get()
//         .then((docs) => {
//             docs.forEach((doc) => {

//                 let idea = doc.data();
//                 idea.objectID = doc.id;
//                 arr.push(idea);
//             });
//             const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
//             const index = client.initIndex(ALGOLIA_INDEX_NAME);

//             index.saveObject(arr, function (arr, content){
//                 res.status(200).send(content);
//             });
//         });

// });

// exports.onIdeaCreated = functions.firestore.document('ideas/{ideaId}').onCreate((snap, context) => {
//     // Get the note document
//     const note = snap.data();
  
//     // Add an 'objectID' field which Algolia requires
//     note.objectID = context.params.noteId;

//     // const data = snapshot.data();
//     // const objectID = snapshot.id;
//     // return index.addObject({data, objectID});

//     // Write to the algolia index
//     const index = client.initIndex(ALGOLIA_INDEX_NAME);
//     return index.saveObject(note);
//   });





// firestore.document(`ideas/{ideaId}`)
//     .onCreate(snapshot => {

//         const data = snapshot.data();
//         const objectID = snapshot.id;
//         return index.addObject({data, objectID});

//     });



/*
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex('ideas');

exports.addToIndex = functions.firestore.document(`ideas/{ideaId}`)
    .onCreate(snapshot => {

        const data = snapshot.data();
        const objectID = snapshot.id;
        return index.addObject({data, objectID});

    });

exports.updateIndex = functions.firestore.document(`ideas/{ideaId}`)
    .onUpdate((change) => {

        const newData = change.after.data();
        const objectID = change.after.id;
        return index.saveObject({newData, objectID});

    });

exports.deleteFromIndex = functions.firestore.document(`ideas/{ideaId}`)
    .onDelete(snapshot => index.addObject(snapshot.id));
*/
