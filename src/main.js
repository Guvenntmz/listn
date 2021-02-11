import App from './App.svelte';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

const app = new App({
	target: document.body
});

export default app;