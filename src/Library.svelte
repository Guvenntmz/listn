<script context='module'>
    import { getUser } from './scripts/stores.js';

    let promise = getUser();
</script>

<script>
    import Cards from './shared/Cards.svelte';
    import { fly } from 'svelte/transition';
    import { authSpotifyUser } from './scripts/spotify.js';
    

    const handleAuthSpotifyUser = () => {
        authSpotifyUser();
    }
    
</script>

<main class='d-flex flex-column justify-content-around' in:fly={{x:-500,duration:500}}>
    <div class='d-md-flex flex-md-row align-items-md-center' in:fly={{x:-200, duration:500}}>
        <h2 class='px-5 pb-2'>
            <span class='text-white'>Your<br/></span>
            playlists.
            <button on:click={handleAuthSpotifyUser} class="btn btn-dark mt-2 mb-2">Add from Spotify</button>
        </h2>
        <Cards promise={promise} component='library'/>
    </div>
    
</main>

<style>

</style>