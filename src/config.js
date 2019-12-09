import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBz1thCsYEOVkXJjy_NWCOgmRbC1zwUYjk",
    authDomain: "project316-7f8b2.firebaseapp.com",
    databaseURL: "https://project316-7f8b2.firebaseio.com",
    projectId: "project316-7f8b2",
    storageBucket: "project316-7f8b2.appspot.com",
    messagingSenderId: "86152672772",
    appId: "1:86152672772:web:0bd61a3a9478cfd1bf6751",
    measurementId: "G-0KEE6PRVPX"
};
firebase.initializeApp(config);
const myFirebase = firebase.firestore()
// .settings({ timestampsInSnapshots: true})

export default myFirebase;