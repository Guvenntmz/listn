import axios from 'axios';

//redirect user to oAuth page for them to authorize the app
export const authSpotifyUser = () => {
    window.location.href = 'https://accounts.spotify.com/authorize?'
    + 'client_id=06d4f45627ee4f85a13880623665154e'
    + '&response_type=code'
    + '&redirect_uri=http://192.168.1.10:5000/spotify/'
    + '&scope=playlist-read-private'
    + '&show_dialog=true';
}


//get acces token from the server if it does not already exist and get playlist afterwards with the token
export const getSpotifyPlaylists = async () => {
    const code = window.location.search.slice(6);
    const spotifyGetAccessToken = functions.httpsCallable('spotifyGetAccessToken');
    
    if( ( !localStorage.accessToken ) || ( Date.now() - JSON.parse(localStorage.accessToken).timestamp >= 3600000 ) ){
        const res = await spotifyGetAccessToken({code: code});
        localStorage.accessToken = JSON.stringify({access_token: res.data, timestamp: Date.now()});
    }
        
    const response = await axios.get('https://api.spotify.com/v1/me/playlists',{
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.accessToken).access_token
        }
    })

    return response.data;
}

//get tracks with acces token
export const getSpotifyTracks = async (href) => {
    const response = await axios.get(href ,{
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.accessToken).access_token
        }
    })

    return response.data;
}



//save the selected playlist and songs to database
export const saveImportedObjToDatabase = (obj) => {
    return db.collection('users').doc(localStorage.uid).update({
        playlists: firebase.firestore.FieldValue.arrayUnion(obj)
    })
}