<script>
    import { onMount } from 'svelte';
    import 'swiper/swiper.min.css';
    import { SkeletonBlock } from 'skeleton-elements/svelte';
    import 'skeleton-elements/skeleton-elements.css';
    import { adminPlaylists, buddyPlaylists, user, deletePlaylist } from '../scripts/stores';
    import { giveCardsRandomColor } from '../utils/giveCardsRandomColor.js';
    import { initFlkty } from '../utils/initFlkty.js';
    
    export let promise;
    export let component;

    let deletePromise;

    let playlists = [];

    $: playlists = component === 'buddyPlaylists' ? $buddyPlaylists : component === 'library' ? $user.playlists : $adminPlaylists;

    onMount(async () => {
        await promise;
        let flkty = initFlkty();
        giveCardsRandomColor();
    });

    const handleDelete = async (e) => {
        document.querySelector('.spinner-border').classList.remove('d-none');
        await deletePlaylist(e.target.id);
        window.location.reload();
    }

</script>

{#await promise}
    <div class='d-flex skeleton-cont overflow-hidden'>
        <SkeletonBlock effect='wave' />
        <div class='p-md-5'></div>
        <SkeletonBlock effect='wave' />
        <div class='p-md-5'></div>
        <SkeletonBlock effect='wave' />
    </div>
{:then}
{#if playlists.length == 0}
<div class='main-carousel'>
    <div class="carousel-cell">
        <h1>No playlists to show :/</h1>
    </div>
</div>
{:else}
    <div class="main-carousel">
        {#each playlists as playlist}
            <div class="carousel-cell">
                <div class="card card-bg">
                    <div class='card-header text-center'>
                        Up For some {playlist.mood} music?
                        {#if component === 'library'}
                            <button class='btn btn-close d-inline-block float-right' id={playlist.email} on:click={handleDelete}>
                                <br>
                                    <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                            </button>
                        {/if}
                        
                    </div>
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
{/if}
{/await}

<style>
   .main-carousel {
        width: 100%;
   }
    .carousel-cell {
        width: 500px;
        margin-right: 50px;
    }

    @media only screen and (max-width: 576px) {
        .carousel-cell {
            width: 300px;
        }
    }
    .card p{
        color: black;
        border-color: white;
    }
    

</style>