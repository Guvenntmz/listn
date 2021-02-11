<script>
    import { adminPlaylists } from '../scripts/stores';
    import Card from './Card.svelte'

    let playlists = [];
    
    adminPlaylists.subscribe(value => {
        playlists = value;
    })


</script>


<ul class='row flex-nowrap pl-0'>
    <!-- looping through adminPlaylists array to render individual card -->
    {#each playlists as playlist}
        <li class='col-12'>
            <Card id={playlist.id} mood={playlist.mood} playlistName={playlist.playlistName} songs={playlist.songs} />
        </li>
    {/each}
    
</ul>


<style>
    ul {
        list-style-type: none;
    }
    
    
</style>