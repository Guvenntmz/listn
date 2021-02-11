<script>
    import { adminPlaylists } from '../scripts/stores';

    
    let playlists = [];
    
    adminPlaylists.subscribe(value => {
        playlists = value;
    })


</script>

<!-- Slider main container -->
<div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
        <!-- Slides -->
        {#each playlists as playlist}
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
        <!-- If we need scrollbar -->
        <div class="swiper-scrollbar"></div>
    </div>
</div>


<style>

</style>
