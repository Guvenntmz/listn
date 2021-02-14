<script context='module'>
    import { getAdminPlaylists } from './scripts/stores.js';

    let promise = getAdminPlaylists();
</script>

<script>
    import Cards from "./shared/Cards.svelte";
    import { fly } from 'svelte/transition'
    
</script>

<div class='explore-cont d-flex flex-column justify-content-around'>
    <div class='d-md-flex flex-md-row align-items-md-center' in:fly={{y:200,duration:500}}>
        <h2 class='pb-2 px-5'><span class='text-dark'>Admin<br/></span>playlists.</h2>
        <Cards promise={promise} component='explore'/>
    </div>
</div>


    


<style>
   


    
</style>