<script context='module'>
    import { getAdminPlaylists } from './scripts/stores.js';

    let promise = getAdminPlaylists();
</script>

<script>
    import Cards from "./shared/Cards.svelte";
    import { fly } from 'svelte/transition'
</script>

<main class='d-flex flex-column justify-content-around'>
    <div class='d-md-flex flex-md-row align-items-md-center' in:fly={{x:-200, duration:500}}>
        <h2 class='pb-2 px-5'><span class='text-white'>Admin<br/></span>playlists.</h2>
        <Cards promise={promise} component='explore'/>
    </div>
</main>