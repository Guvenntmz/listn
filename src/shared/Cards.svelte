<script>
    import { onMount } from 'svelte';
    import 'swiper/swiper.min.css';
    import { SkeletonBlock } from 'skeleton-elements/svelte';
    import 'skeleton-elements/skeleton-elements.css';
    import { adminPlaylists, userDetails } from '../scripts/stores';
    import { giveCardsRandomColor } from '../utils/giveCardsRandomColor.js';
    import { initSwiper } from '../utils/initSwiper.js';
    
    export let promise;
    export let component;

    onMount(async () => {
        await promise;
        let flkty = new Flickity( '.main-carousel', {
            // options
            cellAlign: 'left',
            contain: true,
            prevNextButtons: false,
            pageDots: false
        });
        giveCardsRandomColor();
    })

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
    <div class="main-carousel">
        {#each component === 'explore' ? $adminPlaylists : $userDetails.playlists as playlist}
            <div class="carousel-cell">
                <div class="card card-bg">
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
      
{/await}

<style>
   
    .carousel-cell {
        width: 500px;
    }

    @media only screen and (max-width: 576px) {
        .carousel-cell {
            width: 300px;
        }
    }

    .card {
        color: black;
        border-color: white;
    }
    

</style>
