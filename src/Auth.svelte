<script>
    import { fly } from "svelte/transition";
    import { signupUser, signinUser } from "./scripts/auth.js";


    let pressedLoginButton = false;
    let pressedSignupButton = false;
    
    let signupPromise;
    let signinPromise;

    const handleSignupSubmit = e => {
        e.preventDefault();
        signupPromise = signupUser(e.target.email.value, e.target.password.value);
    }
    const handleLoginSubmit = e => {
        e.preventDefault();
        signinPromise = signinUser(e.target.email.value, e.target.password.value);
    }
    const handleGoBack = () => {
        pressedLoginButton = false;
        pressedSignupButton = false;
    }


</script>
<!-- <img src="/img/img-icon.svg" alt="" class="img-fluid"> -->
<div class="vh-100 d-flex flex-column justify-content-between login-cont">
    <div class="container">
        <div class="">
            <h1 class="">Share music,<br><span class='text-dark'>explore moods,</span><br>set moods with your playlists.</h1>
        </div>
        <h1 class="text-center p-3 p-sm-5">EXPUNY</h1>
        <h1 class="text-right"><span class='text-dark'>Sign up and import your Spotify playlists.</span><br>Start sharing now.</h1>
    </div>

    <!-- Login and Signup buttons-->

    {#if !pressedLoginButton && !pressedSignupButton}
        <div class="d-flex flex-column justify-content-between align-items-center" in:fly={{x:200, duration:500}}>
            <button class="btn btn-dark px-4 mb-3" on:click={() => pressedLoginButton = true}>LOGIN</button>
            <button class="btn btn-dark px-4" on:click={() => pressedSignupButton = true}>SIGN UP</button>
        </div>


    <!-- After hitting the button -->

    {:else if pressedLoginButton}
        
        <form class="container" on:submit={handleLoginSubmit} in:fly={{x:-200,duration:500}}>
            <label for="email">E-mail</label>
            <input id="email" class="form-control mb-3" type="email" required>
            <label for="password">Password</label>
            <input id="password" class="form-control mb-3" type="password" required>
            <button id='back' class="btn btn-dark px-4 p-2 mb-3" type="button" on:click={handleGoBack}><i class="bi bi-arrow-left"></i></button>
            <button class="btn btn-info mb-3 float-right" type="submit">
                {#await signinPromise || signupPromise}
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {/await}
                Login
            </button>
            <p class='error-message-login'></p>
        </form>

    {:else if pressedSignupButton}
        <form class="container" on:submit={handleSignupSubmit} in:fly={{x:-200,duration:500}}>
            <label for="email">E-mail</label>
            <input id="email" class="form-control mb-3" type="email" required>
            <label for="password">Password</label>
            <input id="password" class="form-control mb-3" type="password" required>
            <label for="name">What should we call you?</label>
            <input id='name' class="form-control mb-3" type="text" required>
            <button id='back' class="btn btn-dark px-4 p-2 mb-3" type="button" on:click={handleGoBack}><i class="bi bi-arrow-left"></i></button>
            <button class="btn btn-info mb-3 float-right" type="submit">
                {#await signinPromise || signupPromise}
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {/await}
                Sign Up
            </button>
            <p class="error-message-signup mt-4 text-center"></p>
        </form>
    {/if}

    <!-- Footer -->
    <h6 class="text-center">Copyright Expuny 2020</h6>
</div>

<style>


    button {
        width: 60%;
    }

    @media (min-width: 576px) {
        button {
            width: 30%;
        }
        
    }

    #back {
        width:auto;
    }
    
    div{
        overflow-x: hidden;
    }
    


</style>