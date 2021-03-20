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

<div class="row g-0 auth">
    <div class="col-12 col-lg-6 left-section">
        <h1>Music<br>is<br>better<br>shared!</h1>
    </div>

    <div class='col-12 col-lg-6 right-section'>
        <div class="row g-0 h-100">
            <div class='col-12 d-lg-flex flex-column justify-content-center'>
                <p class='text-white text-left w-50 my-5 py-5 m-auto'>Here, you can create and share<br>your beautiful playlists<br>with your buddies.<br>Give it a try!</p>
            </div>
            

            {#if !pressedLoginButton && !pressedSignupButton}

                <!-- Login and Signup buttons-->

                <div class='col-12 my-auto buttons' in:fly={{x:-200,duration:500}}>
                    <div class='col-12 p-2 mb-2 mb-lg-5'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="d-block mx-auto bi bi-arrow-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                        </svg>
                    </div>
                    <div class="col-12 p-5">
                        <button class="col-4 offset-1 btn btn-primary" on:click={() => pressedLoginButton = true}>LOGIN</button>
                        <button class="col-4 offset-2 btn btn-secondary" on:click={() => pressedSignupButton = true}>SIGN UP</button>
                    </div>
                </div>
                
            <!-- After hitting the button -->

            {:else if pressedLoginButton}
        
                <form class="col-12 col-md-8 offset-md-2 my-lg-auto px-4 py-3 px-lg-5" on:submit={handleLoginSubmit} in:fly={{x:-200,duration:500}}>
                    <label for="email">E-mail</label>
                    <input id="email" class="form-control mb-3" type="email" required>
                    <label for="password">Password</label>
                    <input id="password" class="form-control mb-3" type="password" required>
                    <button id='back' class="btn btn-dark px-4 p-2" type="button" on:click={handleGoBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </button>
                    <button class="btn btn-primary float-right" type="submit">
                        {#await signinPromise || signupPromise}
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        {/await}
                        Login
                    </button>
                    <p class='error-message-login'></p>
                </form>
    
            {:else if pressedSignupButton}

                <form class="col-12 col-md-8 offset-md-2 my-lg-auto px-4 pb-3 px-lg-5" on:submit={handleSignupSubmit} in:fly={{x:-200,duration:500}}>
                    <label for="email">E-mail</label>
                    <input id="email" class="form-control mb-2" type="email" required>
                    <label for="password">Password</label>
                    <input id="password" class="form-control mb-2" type="password" required>
                    <label for="name">What should we call you?</label>
                    <input id='name' class="form-control mb-2" type="text" required>
                    
                    <div class='row g-0'>
                        <button id='back' class="col-3 btn btn-dark" type="button" on:click={handleGoBack}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </button>
                        <button class="col-4 offset-5 btn btn-primary" type="submit">
                            {#await signinPromise || signupPromise}
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            {/await}
                            Sign Up
                        </button>
                        <!-- <p class="error-message-signup mt-4 text-center"></p> -->
                    </div>
                </form>

            {/if}
            
            
        </div>

    </div>
</div>


<style>

    form, .buttons {
        height: 280px;
    }
    
    button {
        white-space: nowrap;
    }


    .auth {
    min-height: 100vh;
    }
    .auth h1 {
        width: 50%;
        font-size: 100px;
        color: var(--light);
    }

    .auth .left-section {
        background-color: var(--bg-light);
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-image: url(/img/auth.jpg);
        background-size: cover;
        background-repeat: no-repeat;
    }


    .auth .right-section {
        background: linear-gradient(180deg, #415a5a, #415a6b); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color: var(--light);
        min-height: 40vh;
    }

    .right-section p:nth-child(1) {
        font-size: 1.2rem;
        text-align: center;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
    }

    @media (max-width: 1200px) {
        .auth h1 {
            font-size: 80px;
        }
    }

    @media (max-width: 550px) {
        .auth h1 {
            font-size: 50px;
        }
    }

    @media (min-width: 992px) {
        .right-section p {
            font-size: 1.4em;
        }

    }

</style>