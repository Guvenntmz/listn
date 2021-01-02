<script lang='ts'>
    import { fly } from "svelte/transition";
    import { signupUser, signinUser } from "./scripts/auth.js";


    let pressedLoginButton = false;
    let pressedSignupButton = false;
    
    let signupPromise;
    let signinPromise;


    const handleLoginClick = () => {
        pressedLoginButton = true;
       
    }
    const handleSignupClick = () => {
        pressedSignupButton = true;
    }
    const handleSignupSubmit = e => {
        e.preventDefault();
        signupPromise = signupUser(e.target['1'].value, e.target['2'].value);
    }
    const handleLoginSubmit = e => {
        e.preventDefault();
        signinPromise = signinUser(e.target['1'].value, e.target['2'].value);
    }
    const handleGoBack = () => {
        pressedLoginButton = false;
        pressedSignupButton = false;
    }


</script>
<img src="/img/img-icon.svg" alt="" class="img-fluid">
<div class="container vh-100 justify-content-around position-relative cont">
    <div class="container header adjust-height">
        <div class="row justify-content-center position-relative">
            <h1 class="col-sm-6 lead text-muted my-5 text-center">Share music, explore moods, set moods with your playlists.</h1>
            {#await signinPromise || signupPromise}
                <p class='conatiner text-center position-absolute top-50 fs-10 text-primary'>please wait...</p>
            {/await}
        </div>
        <div class="container my-4">
            
            <h1 class="display-4 text-center expuny">EXPUNY</h1>
        </div>
        {#if !pressedSignupButton && !pressedLoginButton}
            <div class="row justify-content-center">
                <h1 class="col-sm-6 lead text-muted my-4 text-center">Start sharing now. <br />Sign up and import your Spotify playlists.</h1>
            </div>
        {/if}
    </div>

    <!-- Login and Signup buttons-->

    {#if !pressedLoginButton && !pressedSignupButton}
        <div class="row align-items-center same-height adjust-height" in:fly={{x:-500, duration:1000}}>
            <button class="btn btn-dark col-4 offset-1" on:click={handleLoginClick}>LOGIN</button>
            <button class="btn btn-dark col-4 offset-2 " on:click={handleSignupClick}>SIGN UP</button>
        </div>


    <!-- After hitting the button -->

    {:else if pressedLoginButton}
        
        <form class="container same-height adjust-height" on:submit={handleLoginSubmit} in:fly={{x:500,duration:1000}}>
            <div class="form-group">
                <button class="btn btn-dark btn-block btn-sm col-12 col-sm-3 mb-3 mx-auto" type="button" on:click={handleGoBack}>Go Back</button>
                <input class="form-control col-12 col-sm-6 mb-2 offset-sm-3" type="email" placeholder="e-mail" required>
                <input class="form-control col-12 col-sm-6 mb-3 offset-sm-3" type="password" placeholder="password" required>
                <button class="btn btn-info btn-block btn-sm col-12 col-sm-3 mx-auto" type="submit">Login</button>
                <p class='error-message-login'></p>
            </div>
        </form>

    {:else if pressedSignupButton}
        <form class="same-height adjust-height" on:submit={handleSignupSubmit} in:fly={{x:500,duration:1000}}>
            <div class="form-group">
                <button class="btn btn-dark btn-block btn-sm col-12 col-sm-3 mb-2 mx-auto" type="button" on:click={handleGoBack}>Go Back</button>
                <input class="form-control col-12 col-sm-6 mb-2 offset-sm-3" type="email" placeholder="e-mail" required>
                <input class="form-control col-12 col-sm-6 mb-2 offset-sm-3" type="password" placeholder="password" required>
                <input class="form-control col-12 col-sm-6 mb-2 offset-sm-3 name-input" type="text" placeholder="What should we call you?" required>
                <p class="error-message-signup" ></p>
                <button class="btn btn-info btn-block btn-sm col-12 col-sm-3 mx-auto" type="submit">Signup</button>
            </div>
        </form>
    {/if}

    <!-- Footer -->

    <div class="container position-absolute text-center footer">
        <h4 class="text-muted lead small">An app of music-sharing lovers.</h4>
        <h6 class="text-muted lead small">Copyright Expuny 2020</h6>
    </div>
</div>

<style>
    .adjust-height {
        position: relative;
        top: 10%;
    }

    @media only screen and (max-height: 570px){
        .adjust-height {
            position: relative;
            top: 0 !important;
        }
    }

    img {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: -1;
    }


    .expuny {
        font-family: 'Quicksand', sans-serif;
    }

    .footer h6.small {
        opacity: 0.5;
        
    }

    .footer{
        bottom: 0;
    }

    .same-height {
        height: 20%;
    }
    
    .form-group {
        margin-bottom: 0;
    }


</style>