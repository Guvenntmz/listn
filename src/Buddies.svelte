<script>
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition'
    import { buddiesArr, deleteBuddy } from './scripts/stores.js';
    import { initSwiper } from './utils/initSwiper.js';

    let buddyObj = {playlists: []};


    onMount(() => {
        const swiper = initSwiper();
    })

</script>

<div class='buddies-cont d-flex flex-column justify-content-around'>
    <div class='d-md-flex flex-md-row align-items-md-center' in:fly={{y:200,duration:500}}>
        <h1 class='pb-2 px-5'>Explore<br><span class='text-dark'>your</span><br>buddies'<br><span class='text-dark'>playlists.</span></h1>
        <div class="swiper-container pb-1 pt-5">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class='buddy'></div>
                    <h1>Guven</h1>
                </div>
                <div class="swiper-slide">
                    <div class='buddy'></div>
                    <h1>Guven</h1>
                </div>
                <div class="swiper-slide">
                    <div class='buddy'></div>
                    <h1>Guven</h1>
                </div>
                <div class="swiper-slide">
                    <div class='buddy'></div>
                    <h1>Guven</h1>
                </div>
                <div class="swiper-slide">
                    <div class='buddy'></div>
                    <h1>Guven</h1>
                </div>
            </div>
        </div>
    </div>
</div>

    

<style>
    .swiper-slide {
        width: 200px;
        height: 200px;
    }
    .buddy {
        width: 80%;
        height: 80%;
        border-radius: 50%;
        background-color: white;
        margin: auto;
    }

    .swiper-slide h1 {
        width: 100%;
        height: 20%;
        text-align: center;
    }
</style>