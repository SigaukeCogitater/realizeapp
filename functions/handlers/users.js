const { db } = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const {validateSignupData, validateLoginData} = require('../util/validators');

exports.companySignup = (req, res) => {
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

    const {valid, errors } = validateSignupData(newUser);

    if(!valid) return res.status(400).json({errors});

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
          companyName: newUser.companyName,
          companySite: newUser.companySite,
          phoneNumber: newUser.phoneNumber,
          accountType: newUser.accountType,
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
  }


  exports.personalSignup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        userName: req.body.userName, //user id
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        accountType: req.body.accountType
    };

    const {valid, errors } = validateSignupData(newUser);

    if(!valid) return res.status(400).json({errors});


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
          accountType: newUser.accountType,
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
  }

  exports.login = (req, res) => {

    const user = {
      email: req.body.email,
      password: req.body.password
    };
  
    const {valid, errors } = validateLoginData(user);

    if(!valid) return res.status(400).json({errors});

  
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
        if(err.code === 'auth/wrong-password'){
          return res.status(403).json({general: 'Wrong Password, try again'});
        }else{
          return res.status(500).json({error: err.code});
        }
      });
  }