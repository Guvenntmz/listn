import App from './App.svelte';
// Import Swiper styles

const app = new App({
	target: document.body
});


const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});



export default app;