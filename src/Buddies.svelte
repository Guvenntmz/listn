<script context="module">
    import { getBuddies } from './scripts/stores.js';

    let promise = getBuddies(window.localStorage.uid);

</script>

<script>
    import { afterUpdate } from 'svelte';
    import { fly } from 'svelte/transition'
    import { buddiesArr, deleteBuddy, addABuddy } from './scripts/stores.js';
    import { SkeletonAvatar } from 'skeleton-elements/svelte';
    import { initFlkty } from './utils/initFlkty.js';
    import { Link } from 'svelte-routing'

    let buddyEmail = '';

    afterUpdate( async () => {
        await promise;
        let flkty = initFlkty();
    })

    const handleSubmitModal = async () => {
        try {
            const error = await addABuddy(buddyEmail);
            if(error.data.httpErrorCode){
                document.querySelector('.error-addBuddy').textContent = "Error: User does not exist.";
                setTimeout(() => document.querySelector('.error-addBuddy').textContent = '', 3000);
            }else {
                window.location.reload();
            }
        } catch(err) {
            document.querySelector('.error-addBuddy').textContent = err;
            setTimeout(() => document.querySelector('.error-addBuddy').textContent = '', 3000);
        }
        
    } 

</script>

<!-- Buddy MAIN component -->
<main class='d-flex flex-column justify-content-around main-buddies'>
    <div class='d-md-flex flex-md-row align-items-md-center' in:fly={{y:200,duration:500}}>
        <h1 class='pb-2 px-5'>
            Explore<br>
            <span class='text-white'>your</span><br>
            buddies'<br>
            <span class='text-white'>playlists.</span><br>
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
            {#if $buddiesArr.length == 0}
                <div class="main-carousel">
                    <div class="carousel-cell">
                        <h1>No buddies to show. :/</h1>
                    </div>
                </div>
            {:else}
                <div class="main-carousel">
                    {#each $buddiesArr as buddy}
                        <div class="carousel-cell text-center">
                                <Link to={`/buddies/${buddy}`} getProps={() => { return {class: "btn btn-primary" }}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note-list" viewBox="0 0 16 16">
                                        <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                        <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
                                        <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                                        <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                </Link>
                            <div class='buddy'></div>
                            <h1 class='pt-3'>{buddy.slice(0, buddy.indexOf('@'))}</h1>
                        </div>
                    {/each}
                </div>
            {/if}
        {/await}
    </div>
</main>
<!-- END -->

<!-- Add Buddy Button -->
<div class="modal" id='modal'>
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h5 class="modal-title text-dark text-center">His/her email:</h5>
                <form on:submit|preventDefault={handleSubmitModal} >
                    <input class='form-control' type="text" bind:value={buddyEmail}/>
                </form>
                <button type="button" class="btn-close m-0" data-dismiss="modal"></button>
            </div>
            <p class="error-addBuddy text-center text-danger m-0"></p>
        </div>
    </div>
</div>
<!-- END -->


<style>

    .main-carousel {
        width: 100%;
    }

    .carousel-cell {
        width: 250px;
        height: 250px;
        margin-right: 60px;
        margin-bottom: 30px;
    }

    .buddy {
        width: 70%;
        height: 70%;
        border-radius: 50%;
        background-color: white;
        margin: auto;
        margin-top: 10px; 
    }

    .carousel-cell h1 {
        width: 100%;
        height: 30%;
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