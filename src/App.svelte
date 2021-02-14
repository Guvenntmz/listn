<script>
	import { Router, Route } from "svelte-routing";
	import Auth from "./Auth.svelte";
	import Navbar from "./shared/Navbar.svelte";
	import Footer from "./shared/Footer.svelte";
	import Explore from "./Explore.svelte";
	import Library from "./Library.svelte";
	import Profile from "./Profile.svelte";
	import Buddies from "./Buddies.svelte";
	import Spotify from "./Spotify.svelte";


	//redirect users depending on their sign in status
	const redirect = () => {
		if(localStorage.uid) {
			window.location.pathname = '/explore'
		}else {
			window.location.pathname = '/auth'
		}
		return '';
	}	

</script>


{#if window.location.pathname === '/'}
	{redirect()}
{:else if window.location.pathname === '/auth'}
	<Auth />
{:else}
	<main>
		<Router>
			<Navbar />
			<Route path='/explore'><Explore /></Route>
			<Route path='/library'><Library /></Route> 
			<Route path='/buddies'><Buddies /></Route>
			<Route path='/profile'><Profile /></Route>
			<Route path='/spotify'><Spotify /></Route>
			<Footer />
		</Router>
	</main>
{/if}	

	

<style>

</style>