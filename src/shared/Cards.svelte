<script>
    import { adminPlaylists } from '../scripts/stores';


    export let playlistName = '';
    export let mood = '';
    export let songs = [];
    
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
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>
    <!-- If we need scrollbar -->
    <div class="swiper-scrollbar"></div>
</div>
  


<style>

</style>