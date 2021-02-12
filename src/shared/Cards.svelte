<script context='module'>
    import { getAdminPlaylists } from '../scripts/stores.js';

    let promise = getAdminPlaylists();
</script>

<script>
    import {afterUpdate, onMount} from 'svelte';
    import { adminPlaylists } from '../scripts/stores';
    
    onMount(async () => {
        await promise;
        const swiper = new Swiper('.swiper-container',{ spaceBetween: 100 });
    })
</script>


<div class="swiper-container">
    <div class="swiper-wrapper">
        {#each $adminPlaylists as playlist}
            <div class="swiper-slide">
                <div class="card">
                    <div class='card-header text-center'>Up For some {playlist.mood} music?</div>
                    <div class="card-body">
                        <h1 class='card-title text-center text-truncate'>{playlist.playlistName}</h1>
                        {#each playlist.songs as song}
                            <p class='card-text text-truncate'>{song}</p>
                        {/each}
                    </div>
                    <div class="card-footer text-center">by Admin</div>
                </div>
            </div>
        {/each}
    </div>
</div>


<style>
    .card {
        background-color: aqua;
        color: black;

    }
        


</style>
