//sign up an user

//function to be called in signupUser function
const addUserToDatabase = async () => {
    const nameInputValue = document.querySelector('.name-input').value;
    //adding user to database as an document and passing display name to update user's display name
    const HTTPaddUserToDatabase = functions.httpsCallable('addUserToDatabase');
    return HTTPaddUserToDatabase({ displayName: nameInputValue})
    .then(() => {
        //redirecting to homepage
        window.location.pathname = '/explore';
    })
    .catch(err => {
        //showing client user the error
        document.querySelector('.error-message-signup').textContent = err;
    })
}

//signup fucntion to call when signup button is clicked on loginPage component
export async function signupUser(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
        if(user){
            return addUserToDatabase();
        }
    }).catch(err => {
        const errorParagh = document.querySelector(".error-message-signup");
        errorParagh.textContent = err.message;
    });
}




//sign in an user

export async function signinUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
    .then(user => {
        if(user){
            window.location.pathname = '/explore';
        }    
    }).catch(err => {
        const errorParagh = document.querySelector(".error-message-login");
        errorParagh.textContent = err.message;
    });
}

//sign out an user

export async function signoutUser() {
    return auth.signOut();
}

//save uid in localStorage
auth.onAuthStateChanged(user => {
    if(user){
        window.localStorage.setItem('uid',user.uid);
    } 
})