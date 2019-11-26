const functions = require('firebase-functions');
const app = require('express')();

// const admin = require('firebase-admin');

// admin.initializeApp();

var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://realizeapp-5a230.firebaseio.com"
});

const config = {
    apiKey: "AIzaSyAPF4T3omy-3cUlnAZ44dBAVgvcD23EFqs",
    authDomain: "realizeapp-cd0a5.firebaseapp.com",
    databaseURL: "https://realizeapp-cd0a5.firebaseio.com",
    projectId: "realizeapp-cd0a5",
    storageBucket: "realizeapp-cd0a5.appspot.com",
    messagingSenderId: "869650222605",
    appId: "1:869650222605:web:8d1e6f5a37fb0a516d0f44",
    measurementId: "G-9CCRHFDRRB"
  };

const firebase = require('firebase');
firebase.initializeApp(config);

const db = admin.firestore();

//get ideas collection

app.get('/ideas', (req, res) => {
    db.collection('ideas')
    .orderBy('createdAt', 'desc')
    .get()
        .then(data => {
            let ideas = [];
            data.forEach(doc => {
                ideas.push({
                    
                    ideaId: doc.id,                    
                    body: doc.data(),
                    createdAt: doc.data().createdAt,
                    likesCount: doc.data().likes,
                    commentsCount: doc.data().commentsCount,
                    userName: doc.data().userName

                });
            });
            return res.json(ideas);

        })
        .catch(err => console.error(err));



})

//post idea route

app.post('/idea', (req, res) => {

    const newIdea = {
        body: req.body.body,
        userName: req.body.userName,
        likesCount: 0,
        commentsCount: 0,
        createdAt: new Date().toDateString()
        
    };

    db.collection('ideas')
        .add(newIdea)
        .then((doc) => {
            res.json({message: 'document ${doc.id} created successfully'});
     
        })
        .catch((err) => {
            res.status(500).json({error: 'something went wrong'});
            console.error(err);
        });
});

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(email.match(regEx)) {
    return true;
  }else return false;
}

const isEmpty = (string) => {
  if(string.trim() === ''){
    return true;
  }else{ return false;}
}

// company signup route
app.post('/signup/company', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        userName: req.body.userName, //user id
        companyName: req.body.companyName,
        companySite: req.body.companySite,
        phoneNumber: req.body.phoneNumber,
        accountType: req.body.accountType
    };

    let errors = {};
//email validation

    if(isEmpty(newUser.email)){
      errors.email = "Email must not be empty";
    }else if(!isEmail(newUser.email)){
      errors.email = "must be a valid email address";
    }
    /*newUser.forEach(key){

    };*/
    // consider using foreach
    if(isEmpty(newUser.password)){
      errors.password = "must not be empty"
    }
    if(isEmpty(newUser.userName)){
      errors.userName = "must not be empty"
    }
    if(isEmpty(newUser.phoneNumber)){
      errors.phoneNumber = "must not be empty"
    }                                                                                                                                                                                                                                         
    if(isEmpty(newUser.companySite)){
      errors.companySite = "must not be empty"
    }
    if(isEmpty(newUser.confirmPassword)){
      errors.confirmPassword = "must not be empty"
    }
    
    if(newUser.password !== newUser.confirmPassword) {
      errors.confirmPassword = "password must match";
    }
    if(Object.keys(errors).length > 0){
      return res.status(400).json(errors);
    }




    let token, userId;
    db.doc(`/companyUsers/${newUser.userName}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res.status(400).json({ userName: 'this userName is already taken' });
        } else {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
      })
      .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then((idToken) => {
        token = idToken;
        const userCredentials = {
          userName: newUser.userName,
          companyName: newUser.companyName,
          companySite: newUser.companySite,
          phoneNumber: newUser.phoneNumber,
          email: newUser.email,
          createdAt: new Date().toISOString(),
          userId
        };
        return db.doc(`/companyUsers/${newUser.userName}`).set(userCredentials);
      })
      .then(() => {
        return res.status(201).json({ token });
      })
      .catch((err) => {
        console.error(err);
        if (err.code === 'auth/email-already-in-use') {
          return res.status(400).json({ email: 'Email already in use' });
        } else {
          return res
            .status(500)
            .json({ general: 'Error: Something went wrong, please try again' });
        }
      });
  });


//personal signup route

app.post('/signup/personal', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        userName: req.body.userName, //user id
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        accountType: req.body.accountType
    };
    const errors = {};
    if(isEmpty(newUser.email)){
      errors.email = "Email must not be empty";
    }else if(!isEmail(newUser.email)){
      errors.email = "must be a valid email address";
    }
    /*newUser.forEach(key){

    };*/
    // consider using foreach
    if(isEmpty(newUser.password)){
      errors.password = "must not be empty"
    }
    if(isEmpty(newUser.userName)){
      errors.userName = "must not be empty"
    }
    if(isEmpty(newUser.firstName)){
      errors.firstName = "must not be empty"
    }
    if(isEmpty(newUser.lastName)){
      errors.lastName = "must not be empty"
    }
    if(isEmpty(newUser.confirmPassword)){
      errors.confirmPassword = "must not be empty"
    }
    
    if(newUser.password !== newUser.confirmPassword) {
      errors.confirmPassword = "password must match";
    }
    if(Object.keys(errors).length > 0){
      return res.status(400).json(errors);
    }

    let token, userId;
    db.doc(`/users/${newUser.userName}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res.status(400).json({ userName: 'this userName is already taken' });
        } else {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
      })
      .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then((idToken) => {
        token = idToken;
        const userCredentials = {
          userName: newUser.userName,
          lastName: newUser.lastName,
          firstName: newUser.firstName,
          email: newUser.email,
          createdAt: new Date().toISOString(),
          userId
        };
        return db.doc(`/users/${newUser.userName}`).set(userCredentials);
      })
      .then(() => {
        return res.status(201).json({ token });
      })
      .catch((err) => {
        console.error(err);
        if (err.code === 'auth/email-already-in-use') {
          return res.status(400).json({ email: 'Email already in use' });
        } else {
          return res
            .status(500)
            .json({ general: 'Error: Something went wrong, please try again' });
        }
      });
  });

//login route

app.post('/login', (req, res) => {

  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const errors = {};

  if(isEmpty(user.email)) errors.email = "Must not be empty";
  if(isEmpty(user.password)) errors.password = "Must not be empty";

  if(Object.keys(errors).length > 0) return res.status(400).json(errors);

  firebase.auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({token});
    })
    .catch((err) => {
      console.error(err);
      if(error.code === 'auth/wrong-password'){
        return res.status(403).json({general: 'Wrong Password, try again'});
      }else{
        return res.status(500).json({error: err.code});
      }
    });
  




});
//https://baseurl.com/api/

 exports.api = functions.region('asia-northeast1').https.onRequest(app);