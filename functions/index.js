const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllIdeas, 
    postIdea, 
    postCommentOnIdea,
    getIdea,
    likeIdea,
    unlikeIdea,
    deleteIdea
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
    getAuthenticatedUserDetails,
    getUserDetails,
    markNotificationRead
    } = require('./handlers/users');
const { db } = require('./util/admin');


//algolia searc h code

const algoliasearch = require('algoliasearch');
const ALGOLIA_APP_ID = "77MY7QTKH9";
const ALGOLIA_ADMIN_KEY = "5c248f8b9c46395e90a6e2e06a17665c";
const ALGOLIA_SEARCH_KEY = "18b91722da3a46a578cb00b008ca1731";
const ALGOLIA_INDEX_IDEAS = "ideas";
const ALGOLIA_INDEX_USERS = "users";


// Idea routes

app.get('/ideas', getAllIdeas);
app.post('/idea', FBAuth, postIdea);
app.get('/idea/:ideaId', getIdea);
app.delete('/idea/:ideaId', FBAuth, deleteIdea);
app.post('/idea/:ideaId/comment', FBAuth, postCommentOnIdea);
app.get('/idea/:ideaId/like', FBAuth, likeIdea);
app.get('/idea/:ideaId/unlike', FBAuth, unlikeIdea);

// app.post('/comment', FBAuth, commentOnIdea);
// Competion routesx    

app.get('/competitions', getAllCompetitions);
app.post('/competition', FBAuth, postCompetition);
app.get('/competition/:competitionId', getCompetition);
app.post('/competition/:competitionId/comment', FBAuth, postCommentOnCompetition);


// user routes
app.post('/signup/company', companySignup);
app.post('/signup/personal', personalSignup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/update', FBAuth, updateUserInfo);
app.get('/user', FBAuth, getAuthenticatedUserDetails);
app.get('/user/:userName', getUserDetails);
app.post('/notifications', FBAuth, markNotificationRead);



//having core issues
//trying to allow access cors

// let allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Headers', "*");
//   next();
// }
// app.use(allowCrossDomain);

//

exports.api = functions.region('asia-northeast1').https.onRequest(app);

exports.createNotificationOnLike = functions.region('asia-northeast1')
    .firestore.document(`likes/{id}`)
    .onCreate((snapeshot) => {
        return db.doc(`/ideas/${snapeshot.data().ideaId}`)
            .get()
            .then(doc => {
                if(doc.exists && doc.data().userName !== snapeshot.data().userName){
                    return db.doc(`/notifications/${snapeshot.id}`).set({
                        recipient: doc.data().userName,
                        sender: snapeshot.data().userName,
                        read: false,
                        ideaId: doc.id,
                        type: 'like',
                        createdAt: new Date().toISOString()
                    })
                }
            })
            .catch(err => {
                console.error(err);
            });
    });

exports.deleteNotificationOnUnlike = functions.region('asia-northeast1')
    .firestore.document(`likes/{id}`)
    .onDelete((snapeshot) => {
    return db.doc(`/notifications/${snapeshot.id}`)
        .delete()
        .catch(err => {
            console.error(err);
            return;

        });
    }
);    

exports.createNotificationOnComment = functions.region('asia-northeast1')
    .firestore.document(`comments/{id}`)
    .onCreate((snapeshot) => {
        return db.doc(`/ideas/${snapeshot.data().ideaId}`).get()
            .then(doc => {
                if(doc.exists && doc.data().userName !== snapeshot.data().userName){
                    return db.doc(`/notifications/${snapeshot.id}`).set({
                        recipient: doc.data().userName,
                        sender: snapeshot.data().userName,
                        read: false,
                        ideaId: doc.id,
                        type: 'comment',
                        createdAt: new Date().toISOString()
                    })
                }
            })
            .catch(err => {
                console.error(err);
                return;
            });
    });


exports.createNotificationOnRegistration = functions.region('asia-northeast1')
    .firestore.document(`registrations/{id}`)
    .onCreate((snapeshot) => {
        return db.doc(`/competitions/${snapeshot.data().ideaId}`).get()
            .then(doc => {
                if(doc.exists && doc.data().userName !== snapeshot.data().userName){
                    return db.doc(`/notifications/${snapeshot.id}`).set({
                        recipient: doc.data().userName,
                        sender: snapeshot.data().userName,
                        read: false,
                        ideaId: doc.id,
                        type: 'register',
                        createdAt: new Date().toISOString()
                    })
                }
            })
            .catch(err => {
                console.error(err);
                return;
            });
    });

exports.onUserImageChange = functions.region('asia-northeast1')
    .firestore.document('/users/{userId}')
    .onUpdate((change) => {

        console.log(change.before.data());
        console.log(change.after.data());
        
        if(change.before.data().imageUrl !== change.after.data().imageUrl){
            console.log('image has change')
            const batch = db.batch();
            return db.collection('ideas')
            .where('userName', '==', change.before.data().userName)
            .get()
            .then((data) => {
                data.forEach(doc => {
                    const idea = db.doc(`/ideas/${doc.id}`);
                    batch.update(idea, {userImage: change.after.data().imageUrl});
                    
                });
                return batch.commit();
            });

        }else return true;


    });

exports.onIdeaDelete = functions.region('asia-northeast1')
    .firestore.document('/ideas/{ideaId}')
    .onDelete((snapeshot, context) => {
        const ideaId = context.params.ideaId;
        const batch = db.batch();
        return db.collection('comments').where('ideaId', '==', ideaId)
            .get()
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/comments/${doc.id}`));
                });
                return db.collection('likes').where('ideaId', '==', ideaId).get();
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/likes/${doc.id}`));
                });
                return db.collection('notifications').where('ideaId', '==', ideaId).get();

            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                });
                return batch.commit();

            })
            .catch(err => console.error(err));
    });

exports.addToIndex = functions.region('asia-northeast1').https.onRequest((req, res) => {

    var arr = [];
    var arr2 =[];
    db.collection('ideas').get()
        .then((docs) => {
            docs.forEach((doc) => {

                let idea = doc.data();
                idea.objectID = doc.id;
                arr.push(idea);
            });
            const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
            const index = client.initIndex(ALGOLIA_INDEX_IDEAS);

            index.saveObject(arr, function (arr, content){
                res.status(200).send(content);
            })
  //          return db.collection('users').get();
        })
        /*.then((docs) => {
            docs.forEach((doc) => {

                let user = doc.data();
                user.objectID = doc.id;
                arr2.push(user);
            });
            const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
            const index = client.initIndex(ALGOLIA_INDEX_USERS);

            index.saveObject(arr2, function (arr2, content){
                res.status(200).send(content);
            })



        });
*/
});

exports.addUsersToIndex = functions.region('asia-northeast1').https.onRequest((req, res) => {

    var arr = [];
    var arr2 =[];
    db.collection('users').get()
        .then((docs) => {
            docs.forEach((doc) => {

                let user = doc.data();
                user.objectID = doc.id;
                arr.push(user);
            });
            const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
            const index = client.initIndex(ALGOLIA_INDEX_USERS);

            index.saveObject(arr, function (arr, content){
                res.status(200).send(content);
            })
  //          return db.collection('users').get();
        })
        /*.then((docs) => {
            docs.forEach((doc) => {

                let user = doc.data();
                user.objectID = doc.id;
                arr2.push(user);
            });
            const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
            const index = client.initIndex(ALGOLIA_INDEX_USERS);

            index.saveObject(arr2, function (arr2, content){
                res.status(200).send(content);
            })



        });
*/
});





















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
