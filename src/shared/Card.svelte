<script>
    import {onMount} from 'svelte';
    import { shuffleArray } from '../utils/shuffleArray';

    export let playlistName = '';
    export let mood = '';
    export let songs = [];

    const colors = shuffleArray(['#CBC4FC','#FCFAC4','#C4FCE9','#FCC4C4' ]);
    onMount(() => {
        const divs = document.querySelectorAll('.card-bg');
        let i = 0;
        divs.forEach(div => {
            (i == colors.length-1) && (i = 0); 
            div.style.backgroundColor = colors[i];
            i++;
        })
    })


</script>


<div class="card mx-auto card-bg position-relative">
    <div class='card-header text-center'>Up For some {mood} music?</div>
    <div class="card-body">
        <h1 class='card-title text-center text-truncate'>{playlistName}</h1>
        {#each songs as song}
            <p class='card-text text-truncate'>{song}</p>
        {/each}
    </div>
    <!-- <h1 class='text-center position-relative'>{playlistName}</h1>
    <h5 class='text-center'>Up for some {mood} music?</h5>
    {#each songs as song}
        <p class='text-center text-truncate'>{song}</p>
    {/each} -->
    <div class="card-footer text-center">by Admin</div>
</div>

<style>

    div.card {
        width: 60%;
        border-radius: 3%;
        color: #050709;
    }


    @media only screen and (max-width: 576px) {
        div.card {
            width: 80%;

        }
        p {
            margin-bottom: 0.5rem;
        }
        
    }

</style>