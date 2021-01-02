<script>
    import { userDetails } from './scripts/stores.js';
    import { getSpotifyPlaylists, getSpotifyTracks, saveImportedObjToDatabase } from './scripts/spotify.js';
    import cuid from 'cuid';

    let spotifyPlaylists;
    let spotifyTracks;

    

    getSpotifyPlaylists().then(res => spotifyPlaylists = res.items);


    const handleGetTracks = async (e) => {

        const href = e.target.id;
        const obj = await getSpotifyTracks(href);
        spotifyTracks = obj.items;
        return obj;
    }

    const handleSubmittedTracks = async (e) => {
        try {
            const selectedTracks = [];
            const mood = e.target[0].value;
            e.preventDefault();
            for(let i = 1; i < e.target.length-1; i++){
                if(e.target[i].checked === true){
                    selectedTracks.push(e.target[i].value);
                }
            }
            if(selectedTracks.length !== 8){
                throw new Error('You need to select exactly 8 songs');
            }
            
            const playlistObjectToImport = {
                createdBy: $userDetails.displayName,
                mood: mood,
                playlistName: particularPlaylistName,
                songs: selectedTracks,
                id: cuid()
            }

            saveImportedObjToDatabase(playlistObjectToImport)
            .then(()=> window.location.pathname = '/library')
        }
        
        catch(err){

        }
    }

</script>

<div >
    
</div>

<style>
    

</style>