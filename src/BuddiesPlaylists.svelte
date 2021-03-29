<script>
    import Cards from './shared/Cards.svelte';
    import { getBuddyPlaylists, buddyPlaylists } from './scripts/stores';
    import { fly } from 'svelte/transition';

   export let email; 
    
    let promise = getBuddyPlaylists(email);

</script>

<main class='d-md-flex align-items-center' in:fly={{x:-500,duration:500}}>
    {#if $buddyPlaylists === 0}
        <h1>Your buddy has no playlists.</h1>
    {:else}
        <h2 class='px-5 h-100'><span class='text-white'>{email.slice(0, email.indexOf('@'))}'s<br/></span>playlists.
            <br><strong class='btn btn-dark' on:click={()=> {window.history.back()}}>Go Back</strong>
        </h2>
        <Cards promise={promise} component='buddyPlaylists' />
    {/if}
</main>

<style>



</style>