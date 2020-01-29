import  *  as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBp-0i4bx_mDEnsbiT2o5HG7VZNFHhOUts",
    authDomain: "react-pop-1f895.firebaseapp.com",
    databaseURL: "https://react-pop-1f895.firebaseio.com",
    projectId: "react-pop-1f895",
    storageBucket: "react-pop-1f895.appspot.com",
    messagingSenderId: "668529991201",
    appId: "1:668529991201:web:99f589c07c488320740d60",
    measurementId: "G-BLZ6C3Z83T"
  };

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export { firebase , googleAuthProvider, database as default } ;