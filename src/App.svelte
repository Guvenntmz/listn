<script>
	import { onMount } from "svelte";
	import { Router, Route } from "svelte-routing";
	import Auth from "./Auth.svelte";
	import Explore from "./Explore.svelte";
	import Library from "./Library.svelte";
	import Profile from "./Profile.svelte";
	import Buddies from "./Buddies.svelte";
	import Spotify from "./Spotify.svelte";
	import Layout from "./shared/Layout.svelte";
	import BuddiesPlaylists from './BuddiesPlaylists.svelte'


	//redirect users depending on their sign in status
	onMount(() => {
		if(!localStorage.uid && window.location.pathname !== '/auth') {
			window.location.pathname = '/auth';
		}else if(window.location.pathname === '/') {
			window.location.pathname = '/explore'
		}
	})




</script>


{#if window.location.pathname === '/auth'}
	<Auth />
{:else}
	<Router>
		<Layout>
			<Route path='/explore'><Explore /></Route>
			<Route path='/library'><Library /></Route> 
			<Route path='/buddies'><Buddies /></Route>
			<Route path='/profile'><Profile /></Route>
			<Route path='/spotify'><Spotify /></Route>
			<Route path='/buddies/:email' let:params>
				<BuddiesPlaylists email="{params.email}" />
			</Route>
		</Layout>
	</Router>
{/if}	
