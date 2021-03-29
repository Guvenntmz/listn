<script>
    import { onMount } from 'svelte';
    import { user } from './scripts/stores.js';
    import { getSpotifyPlaylists, getSpotifyTracks, saveImportedObjToDatabase } from './scripts/spotify.js';
    import cuid from 'cuid';
    import { fly } from 'svelte/transition';

    let spotifyPlaylists = [];
    let spotifyTracks = [];

    let spotifyPlaylistName;

    let spinner;
    
    onMount( async () => {
        spinner = document.querySelector('.spinner-border');
        const res = await getSpotifyPlaylists();
        spotifyPlaylists = res.items;
        spinner.classList.add('d-none');
        
    })
    


    const handleGetTracks = async (e) => {
        try {
            spinner.classList.remove('d-none');
            const href = e.target.id;
            const obj = await getSpotifyTracks(href);
            console.log(obj);
            spinner.classList.add('d-none');
            spotifyPlaylistName = obj.name;
            spotifyTracks = obj.tracks.items;
            document.querySelectorAll(".remove").forEach(el => el.classList.remove('d-none'))
        }catch(err) {
            console.log(err);
        }
        
    }

    const handleSubmittedTracks = async (e) => {
        const element = document.querySelector('form.card');
        document.querySelector('.button-spinner').classList.remove('d-none');
        try {
            const selectedTracks = [];
            const mood = e.target.previousElementSibling.value;
            if(mood.length < 3)
                throw new Error('Minimum 3 characters of mood.')
            e.preventDefault();
            for(let i = 0; i < element.length; i++){
                if(element[i].checked === true){
                    selectedTracks.push(element[i].value);
                }
            }
            if(selectedTracks.length !== 8){
                throw new Error(`You need to select exactly 8 tracks. You have selected -> ${selectedTracks.length} tracks.`);
            }
            
            const playlistObjectToImport = {
                createdBy: $user.displayName,
                mood: mood,
                playlistName: spotifyPlaylistName,
                songs: selectedTracks,
                id: cuid()
            }

            await saveImportedObjToDatabase(playlistObjectToImport);
            window.location.pathname = '/library';
        }
        
        catch(err){
            document.querySelector('.button-spinner').classList.add('d-none');
            document.querySelector('.error').textContent = err;
        }
    }

</script>

<main class='container d-lg-flex align-items-lg-center'>
    <div class="card">
        {#each spotifyPlaylists as playlist}
            <p class="btn btn-primary" id={playlist.href} on:click={handleGetTracks}>{playlist.name}</p>
       {/each}
    </div>
    <span class="spinner-border d-inline-block m-auto" role="status" aria-hidden="true"></span>
    <div class='remove arrow-down d-none d-lg-none' in:fly={{x:500}} >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="d-block mx-auto bi bi-arrow-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
        </svg>
    </div>
   <form class='remove card d-none'>
    {#each spotifyTracks as item}
        {#if item.track}
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="{item.track.artists[0].name} - {item.track.name}" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                        {item.track.artists[0].name} - {item.track.name}
                </label>
            </div>
        {:else}
            <p>This song is uncompatible, couldn't import.</p>
        {/if}
    {/each}
   </form>
   <div class="remove text-center d-none submit-div mt-5">
        <input name='mood' type="text" class='form-control' placeholder='Type in the mood of this playlist.' />
        <button class="btn btn-dark my-3" on:click={handleSubmittedTracks} >Submit
            <span class="spinner-border spinner-border-sm d-none button-spinner" role="status" aria-hidden="true"></span>
        </button>
        <p class='error text-danger'></p>
   </div>
</main>

<style>

    p {
        cursor: pointer;
        color: var(--bg-light);
    }

    .arrow-down {
        width: 300px;
        text-align: center;
        margin: auto;
        transition: cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .card {
        height: 480px;
        width: 350px;
        text-align: center;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: transparent;
        border: none;
        margin: 2em auto 2em auto;
        text-overflow: ellipsis;
    }

    form.card {
        text-align: left;
    }


    .form-check {
        min-height: 3rem;
    }

    label {
        width: 300px;
        min-height: 3rem;
        overflow: hidden;
        font-size: 1.3rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: var(--light)
    }

    .form-check:last-child {
        margin-bottom: 2em;
    }
</style>