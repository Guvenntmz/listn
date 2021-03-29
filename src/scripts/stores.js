import { writable } from "svelte/store";
import cuid from 'cuid';


export const adminPlaylists = writable([]);
export const user = writable({playlists: []});
export const buddiesArr = writable([]);
export const buddyPlaylists = writable([]);


export const getAdminPlaylists = async () => {
    return db.collection("admin_playlists").get().then(snapshot => {
        const tempArray = [];
        snapshot.forEach(doc =>{
            tempArray.push(doc.data());
        })
        adminPlaylists.set(tempArray);
    })    
}  



export const addPlaylistToUserDoc = async (songsArr, playlistName, mood) => {
    //get displayName of currentUser
    const doc = await db.collection('users').doc(auth.currentUser.uid).get();
    const displayName = doc.data().displayName;
    //update user doc with new playlist added to playlists array
    return db.collection('users').doc(auth.currentUser.uid).update({
        playlists: firebase.firestore.FieldValue.arrayUnion(
            {
                id: cuid(),
                playlistName: playlistName,
                createdBy: displayName, 
                mood: mood,
                songs: songsArr
            }
        )
    })
}



export const deletePlaylist = async (docId) => {
    let playlists;
    userDetails.subscribe(user => {
        playlists = user.playlists;
    })
    return db.collection('users').doc(auth.currentUser.uid).update({
        playlists: playlists.filter(playlist => playlist.id !== docId)
    })
}


export const getUser = async () => {
    const uid = window.localStorage.getItem('uid');
    return db.collection('users').doc(uid).get().then(doc => {
        let data = doc.data();
        user.set({
            displayName: data.displayName,
            email: data.email,
            buddies: data.buddies,
            playlists: data.playlists
        })
    })
}


export const getBuddies = async () => {
    return db.collection('users').doc(localStorage.uid).get().then( doc => {
        const buddies = doc.data().buddies;
        buddiesArr.set(buddies);
    })
}

export const getBuddyPlaylists = async (email) => {
    return db.collection("users").where("email", "==", email)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            buddyPlaylists.set(doc.data().playlists);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}




export const addABuddy = async (email) => {    
    //check if the typed email is already a buddy
    let userGlo;
    user.subscribe( user => {
        userGlo = user;
    })
    if(userGlo.buddies.includes(email)){
        throw new Error('Already a buddy!');
    }else if(email === userGlo.email) {
        throw new Error('Cannot add yourself as a buddy! Are you that lonely? :/')
    }
    
    const addBuddy = functions.httpsCallable('addBuddy');
    return addBuddy({email: email})
    
}


export const deleteBuddy = async (email) => {
    let buddies;
    userDetails.subscribe(user => {
        buddies = user.buddies;
    })
    return db.collection('users').doc(localStorage.uid).update({
        buddies: buddies.filter(buddy => buddy !== email)
    })
}
