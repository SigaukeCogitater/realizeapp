import * as admin from 'firebase-admin';

const firebaseConfig = {
    apiKey: "AIzaSyAPF4T3omy-3cUlnAZ44dBAVgvcD23EFqs",
    authDomain: "realizeapp-cd0a5.firebaseapp.com",
    databaseURL: "https://realizeapp-cd0a5.firebaseio.com",
    projectId: "realizeapp-cd0a5",
    storageBucket: "realizeapp-cd0a5.appspot.com",
    messagingSenderId: "869650222605",
    appId: "1:869650222605:web:8d1e6f5a37fb0a516d0f44",
    measurementId: "G-9CCRHFDRRB"
  };
// Initialize Firebase
const myFriebase = firebase.initializeApp(firebaseConfig);

export default myFriebase;