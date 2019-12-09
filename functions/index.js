const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.insitializeApp(functions.config().firebase)

const {
    getAllIdeas, 
    postIdea, 
    getAllUserIdeas,
    deleteIdea
} = require('./IdeasHandler');
const { 
    getAllCompetitions, 
    postCompetition, 
    getCompetition,
} = require('./CompetitionsHnadler');
const {
    companySignup,
    personalSignup, 
    login, 
    updateUserInfo,
    getAuthenticatedUserDetails,
    getUserDetails
} = require('./UsersHandler');
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
app.get('/user/:userName/ideas', getAllUserIdeas);
app.get('/user/:userName', getUserDetails);
app.post('/notifications', FBAuth, markNotificationRead);

