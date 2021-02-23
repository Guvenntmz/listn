<script>
    import { onMount } from 'svelte';
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

<div class='profile-cont container d-flex flex-column flex-lg-row justify-content-around'>
    {#if $userDetails === undefined }
        <div class='spinner'></div>
    {:else}
        <div class='container text-center d-flex flex-column justify-content-center'>
            <div class='pt-5'>
                <button class='btn btn-dark mb-5' on:click={clickedSignOut}>Sign Out</button>
                <div class='circle'></div>
                <h1 class=''>{$userDetails.displayName}</h1>
                <p class=''>{$userDetails.email}</p>
            </div>
            
        </div>
        <div class='container text-center d-flex flex-column justify-content-center'>
            <div>
                <button class='btn btn-primary mb-3'>{$userDetails.playlists.length} playlists</button>
                <br>
                <button class='btn btn-primary'>{$userDetails.buddies.length} buddies</button>
            </div>
            
        </div>
    {/if}
</div>

<style>
    .circle {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        background-color: white;
        margin: auto;
    }
    
    .profile-cont {
        background: url('/img/brand-icon.png') no-repeat center/70%;
        background-color: #6699CC;
    }
</style>