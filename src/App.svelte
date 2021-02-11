<script>
	import { Router, Route } from "svelte-routing";
	import Login from "./Login.svelte";
	import Navbar from "./shared/Navbar.svelte";
	import Footer from "./shared/Footer.svelte";
	import Explore from "./Explore.svelte";
	import Library from "./Library.svelte";
	import Profile from "./Profile.svelte";
	import Buddies from "./Buddies.svelte";
	import Spotify from "./Spotify.svelte";
	import { getAdminPlaylists, getUserDetails, getBuddiesFromDb } from './scripts/stores.js';

	const asyncCalls = () => {
		//getting user's details and setting it to an object in storoes.js
		//getUserDetails();
		//getting admin playlists and setting it to the array in stores.js
		getAdminPlaylists();
		//getting buddies from database and setting it to buddiesArr in stores.js
		//getBuddiesFromDb();
		return '';
	}

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

<main>
	{#if window.location.pathname === '/'}
		{redirect()}
	{:else if window.location.pathname === '/auth'}
		<Login />
	{:else}
		{asyncCalls()}
		<Router>
			<Navbar />
			<Route path='/explore'><Explore /></Route>
			<Route path='/library'><Library /></Route> 
			<Route path='/buddies'><Buddies /></Route>
			<Route path='/profile'><Profile /></Route>
			<Route path='/spotify'><Spotify /></Route>
			<Footer />
		</Router>
	{/if}	
</main>
	

<style>

</style>