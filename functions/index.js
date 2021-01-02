const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

//callable function - it will run after an user has signed up
exports.addUserToDatabase = functions.region('europe-west1').https.onCall( async (data, context) => {

    if(!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'user is unauthenticated');
    }
    
    //add a user to user collection including playlists each user have
    return admin.firestore().collection("users").doc(context.auth.uid).set({
        displayName: data.displayName,
        email: context.auth.token.email,
        buddies: [],
        playlists: []
    })
    //end of adding a user
});



exports.getBuddies = functions.region('europe-west1').https.onCall( async (data, context) => {
    //if user is not authenticated throw an error
    if(!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'user is unauthenticated');
    }
    //get the user's buddies from the database depending on sent 
    let users = await Promise.all(data.buddies.map( async (email) => {
        let snapshot = await admin.firestore().collection('users').where('email', '==', email).get();
        let user = [];
        snapshot.forEach(doc => {
            user.push(doc.data());
        })
        return user[0];
    }));
    return users;
});



exports.addBuddy = functions.region('europe-west1').https.onCall( async (data, context) => {
    //if user is not authenticated throw an error
    if(!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'user is unauthenticated');
    }
    try {
        //chack if the typed user is present in the database, and add that user' email to buddies array of the current user's object
        await admin.auth().getUserByEmail(data.email);
        return admin.firestore().collection('users').doc(context.auth.uid).update({
            buddies: admin.firestore.FieldValue.arrayUnion(data.email)
        })

    }catch(err) {
        throw new functions.https.HttpsError('aborted', 'user does not exist');
    }

})


//spotify

exports.spotifyGetAccessToken = functions.region('europe-west1').https.onCall( async (data, context) => {
    
    //if not authorized throw an error
    if(!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'user is unauthenticated');
    }

    const client_id = '0194377aed624aa3b004e10710d973af';
    const client_secret = '96d96eb02b8741cebfb5c2dd57afad3c';
    const redirect_uri = 'https://expuny-8267c.web.app/spotify';
    
    const reqData =
    "client_id=" + client_id +
    "&client_secret=" + client_secret +
    "&grant_type=authorization_code" +
    "&code=" + data.code +
    "&redirect_uri=" + redirect_uri;

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const res = await axios.post('https://accounts.spotify.com/api/token', reqData, config);
    const accessToken = res.data.access_token;
    

    return accessToken;
 
});
