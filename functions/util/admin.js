const admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://realizeapp-5a230.firebaseio.com"
});

const db = admin.firestore();

module.exports = {admin, db };
