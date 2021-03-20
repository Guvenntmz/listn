import { writable } from "svelte/store";
import cuid from 'cuid';


export const adminPlaylists = writable([]);
export const userDetails = writable();
export const buddiesArr = writable([]);


export const getAdminPlaylists = async () => {
    // return db.collection("admin-playlists").get().then(snapshot => {
    //     const tempArray = [];
    //     snapshot.forEach(doc =>{
    //         tempArray.push({...doc.data(), id: doc.id});
    //     })
    //     adminPlaylists.set(tempArray);
    // })

    return fetch("http://10.143.165.1:3000/admin_playlists").then(res => {
        return res.json()
    }).then(res => { adminPlaylists.set(res)})
    
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


export const getUserDetails = async () => {
    // const uid = window.localStorage.getItem('uid');
    // return db.collection('users').doc(uid).onSnapshot(doc => {
    //     let data = doc.data();
    //     userDetails.set({
    //         displayName: data.displayName,
    //         email: data.email,
    //         buddies: data.buddies,
    //         playlists: data.playlists
    //     })
    // })
    return fetch("http://10.143.165.1:3000/user_details").then((res) => {
        return res.json()
    }).then((res)=> { userDetails.set(res) })
}


export const getBuddiesFromDb = async () => {
    // return db.collection('users').doc(localStorage.uid).onSnapshot(async doc => {
    //     const buddies = doc.data().buddies;
    //     const getBuddies = functions.httpsCallable('getBuddies');
    //     let response = await getBuddies({buddies: buddies});
    //     buddiesArr.set(response.data);
    // })
    return fetch("http://10.143.165.1:3000/user_details").then(res => {
        return res.json()
    }).then(res => buddiesArr.set(res.buddies))
}


export const addABuddy = async (email) => {    
    //check if the typed email is already a buddy
    let userGlo;
    userDetails.subscribe( user => {
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
