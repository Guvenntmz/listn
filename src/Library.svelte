<script>
    import Cards from './shared/Cards.svelte';
    import { fly } from 'svelte/transition';
    import { userDetails } from './scripts/stores.js';
    import { authSpotifyUser } from './scripts/spotify.js';
    

    const handleAuthSpotifyUSer = () => {
        authSpotifyUser();
    }
    
</script>

<div >
    <div >
        <div >
            <div  in:fly={{y:500,duration:1000}}>
                <!-- If there is no user fetched yet, it will show it loading -->
                {#if $userDetails === undefined}  
                    <div ><div></div><div></div><div></div><div></div></div>
                {:else if $userDetails.playlists.length === 0}
                    <h1>You have no playlists.</h1>
                {:else}
                    <h2>Your playlists.</h2>
                    <!-- card component is customized for each Library and Explore component -->
                    <Cards />
                {/if}
                <!-- end of loading logic -->
            </div>
        </div>      
    </div>
    <div ><h3>Copyright Expuny 2020</h3></div>
</div>


<style>

</style>