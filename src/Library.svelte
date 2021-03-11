<script context='module'>
    import { getUserDetails } from './scripts/stores.js';

    let promise = getUserDetails();
</script>

<script>
    import Cards from './shared/Cards.svelte';
    import { fly } from 'svelte/transition';
    import { userDetails } from './scripts/stores.js';
    import { authSpotifyUser } from './scripts/spotify.js';
    

    const handleAuthSpotifyUSer = () => {
        authSpotifyUser();
    }
    
</script>

<main class='d-md-flex align-items-center' in:fly={{x:-500,duration:500}}>
    {#if $userDetails === 0}
        <h1>You have no playlists.</h1>
    {:else}
        <h2 class='px-5 h-100'><span class='text-dark'>Your<br/></span>playlists.</h2>
        <Cards promise={promise} component={'library'}/>
    {/if}
</main>


<style>

</style>