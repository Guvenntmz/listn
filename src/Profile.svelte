<script>
    import { signoutUser } from './scripts/auth.js';
    import { userDetails } from './scripts/stores.js';

    
    const clickedSignOut = () => {
        //sign user up and redirect to 'auth', then clear all storage
        signoutUser()
        .then(() => {
            window.location.pathname = '/auth';
            window.localStorage.clear();
        })
    }


</script>

<main class='container d-flex flex-column flex-lg-row justify-content-around'>
    {#if $userDetails === undefined }
        <div class='spinner'></div>
    {:else}
        <div class='container text-center d-flex flex-column justify-content-center'>
            <div class=''>
                <button class='btn btn-dark mb-5' on:click={clickedSignOut}>Sign Out</button>
                <div class='circle'></div>
                <h1 class=''>{$userDetails.displayName}</h1>
                <p class=''>{$userDetails.email}</p>
            </div>
            
        </div>
        <div class='container text-center d-flex flex-column justify-content-center'>
            <div class='fs'>
                <div class='mb-3'>{$userDetails.playlists.length}<br><span class='text-dark'>playlists</span></div>
                <div class=''>{$userDetails.buddies.length}<br><span class='text-dark'>buddies</span></div>
            </div>
            
        </div>
    {/if}
</main>

<style>
    .circle {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        background-color: white;
        margin: auto;
    }
    


</style>