const functions = require('firebase-functions');
const app = require('express')();
const {getAllIdeas, postIdea} = require('./handlers/ideas');

const {FBAuth} = require('./util/fbAuth');
const {companySignup, personalSignup, login, uploadImage} = require('./handlers/users');

// Idea routes

app.get('/ideas', getAllIdeas);
app.post('/idea', FBAuth, postIdea);

// user routes
app.post('/signup/company', companySignup);
app.post('/signup/personal', personalSignup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);

exports.api = functions.region('asia-northeast1').https.onRequest(app);