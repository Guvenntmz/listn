<script>
    import { fly } from 'svelte/transition';
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

<div  in:fly={{x:500,duration:1000}}>
    {#if $userDetails === undefined }
        <div ><div></div><div></div><div></div><div></div></div>
    {:else}
        <div >
            <div ></div>
            <h1>{$userDetails.displayName}</h1>
            <p>{$userDetails.email}</p>
            <button on:click={clickedSignOut}>Sign Out</button>
        </div>
        <div >
            <div >
                <p>{$userDetails.playlists.length} playlists</p>
            </div>
            <div >
                <button>{$userDetails.buddies.length} buddies</button>
            </div>
        </div>
    {/if}
</div>

<style>

    
</style>