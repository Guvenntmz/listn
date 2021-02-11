// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBcJ7PxgPVJSDbY-2Al8-BoT8yKWBzlJw4",
    authDomain: "expuny-8267c.firebaseapp.com",
    databaseURL: "https://expuny-8267c.firebaseio.com",
    projectId: "expuny-8267c",
    storageBucket: "expuny-8267c.appspot.com",
    messagingSenderId: "569042816570",
    appId: "1:569042816570:web:48bc655b7c1dc324136f03",
    measurementId: "G-HC04V17YFP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

//initialize references to services
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.app().functions('europe-west1');