const { db, admin } = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const {validateSignupData, validateLoginData, reduceUserInfo} = require('../util/validators');

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

    const noImg = 'no-img.png';

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
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
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

    const noImg = 'no-img.png';

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
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
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

  
  exports.uploadImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({headers: req.headers});

    let imageFileName;
    let imageToBeUploaded = {};
    
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      console.log(fieldname,filename,mimetype);
      //image.etx
      if (mimetype !== 'image/jpeg' && mimetype !== 'image/png'){
        return res.status(400).json({error: 'Wrong file type submitted'});
      }

      const imageExtension = filename.split('.')[filename.split('.').length - 1];
      
      //242342342432.png
      imageFileName = `${Math.round(Math.random()*1000000000000)}.${imageExtension}`;

      var filep = path.join(os.tmpdir(), imageFileName);
      const filepath = path.normalize(filep);//normalising
      imageToBeUploaded = {filepath, mimetype};
      file.pipe(fs.createWriteStream(filepath));

    });
    busboy.on('finish', () => {
      
      admin.storage().bucket().upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype
          }
        }
      }).then(() => {
        
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.userName}`).update({imageUrl});

      }).then(() => {
        return res.json({message: 'Image uploaded successfully'});

      }).catch(err => {
        console.error(err);
        return res.status(500).json({error :err.code});
      });

    });
    busboy.end(req.rawBody);

  }

exports.updateUserInfo = (req, res) => {

    const userInfoDetails = reduceUserInfo(req.data);

    db.doc(`/users/${req.user.userName}`).update(userInfoDetails)
      .then(() => {

        return res.json({message: 'user details updated successfully'});

      }).catch((err) => {

        console.log(err);
        return res.status(500).json({error: err.code});


      });
  };

exports.getUserDetails = (req, res) => {

  let userData = {};

  db.doc(`users/${req.user.userName}`).get()
    .then(doc => {
      if(doc.exists){
        userData.credentials = doc.data();
        return db.collection('likes').where('userName', '==', req.user.userName)
          .get();
      }
    }).then(data => {
      userData.likes = [];
      data.forEach(doc => {
        userData.likes.push(doc.data());
      });
      return res.json(userData);
    }).catch(err => {
      console.error(err);
      return res.status(500).json({erro: err.code});


    });

};



