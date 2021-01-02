<script>
    import { afterUpdate } from 'svelte';
    import { adminPlaylists, userDetails, deletePlaylist } from "../scripts/stores.js";


    //storing the store.js playlists in a local component array based on the prop sent
    let playlists;


    const handleDeletePlaylist = (e) => {
        deletePlaylist(e.target.id);
    }

</script>


<ul >
    <!-- looping through adminPlaylists array to render individual card -->
    {#each playlists as playlist}
        <li>
            <h3 >Feeling {playlist.mood}?</h3>
            
        </li>
    {/each}
    <!-- en of loop -->
    <li ></li>

</ul>


<style>
    
    
    
</style>