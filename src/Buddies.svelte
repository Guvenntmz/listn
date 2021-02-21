<script context="module">
    import { getBuddiesFromDb } from './scripts/stores.js';

    let promise = getBuddiesFromDb();


</script>

<script>
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition'
    import { buddiesArr, deleteBuddy, addABuddy } from './scripts/stores.js';
    import { initSwiper } from './utils/initSwiper.js';
    import { SkeletonAvatar } from 'skeleton-elements/svelte';

    let buddyEmail = '';

    onMount( async () => {
        await promise;
        const swiper = initSwiper();
    })

</script>

<div class='buddies-cont d-flex flex-column justify-content-around'>
    <div class='d-md-flex flex-md-row align-items-md-center' in:fly={{y:200,duration:500}}>
        <h1 class='pb-2 px-5'>
            Explore<br>
            <span class='text-dark'>your</span><br>
            buddies'<br>
            <span class='text-dark'>playlists.</span><br>
            <button type='button' class='btn btn-dark my-3' data-toggle='modal' data-target='#modal'>Add A Buddy</button>
        </h1>
        {#await promise}
            <div class='skeleton-cont overflow-hidden'>
                <SkeletonAvatar showIcon={false} size=160 effect='wave' />
                <div class='p-md-5'></div>
                <SkeletonAvatar showIcon={false} size=160 effect='wave' />
                <div class='p-md-5'></div>
                <SkeletonAvatar showIcon={false} size=160 effect='wave' />
                <div class='p-md-5'></div>
                <SkeletonAvatar showIcon={false} size=160 effect='wave' />
                <div class='p-md-5'></div>
                <SkeletonAvatar showIcon={false} size=160 effect='wave' />
                <div class='p-md-5'></div>
                <SkeletonAvatar showIcon={false} size=160 effect='wave' />
            </div>
        {:then}
            <div class="swiper-container pb-1 pt-5">
                <div class="swiper-wrapper">
                    {#each $buddiesArr as buddy}
                        <div class="swiper-slide">
                            <div class='buddy'></div>
                            <h1>{buddy.displayName}</h1>
                        </div>
                    {/each}
                </div>
            </div>
        {/await}
    </div>
</div>


<div class="modal" id='modal'>
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h5 class="modal-title text-dark text-center">His/her email:</h5>
                <form on:submit|preventDefault={() => addABuddy(buddyEmail)} >
                    <input class='form-control' type="text" bind:value={buddyEmail}/>
                </form>
                <button type="button" class="btn-close m-0" data-dismiss="modal"></button>
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

    .modal-content {
        border: none;
        border-radius: 0.8rem;
    }
    .skeleton-cont {
        display:flex;
    }
</style>