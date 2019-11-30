const admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://realizeapp-5a230.firebaseio.com",
  storageBucket: "realizeapp-cd0a5.appspot.com"
});

const db = admin.firestore();

module.exports = {admin, db };
