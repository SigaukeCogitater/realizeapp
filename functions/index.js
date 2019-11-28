const functions = require('firebase-functions');
const app = require('express')();

const {getAllIdeas, postIdea} = require('./handlers/ideas');

const FBAuth = require('./util/fbAuth');
// const admin = require('firebase-admin');

const {companySignup, personalSignup, login} = require('./handlers/users');

// Idea routes

app.get('/ideas', getAllIdeas);
app.post('/idea', FBAuth, postIdea);

// signup routes
app.post('/signup/company', companySignup);

app.post('/signup/personal', personalSignup);

//login route

app.post('/login', login);

exports.api = functions.region('asia-northeast1').https.onRequest(app);