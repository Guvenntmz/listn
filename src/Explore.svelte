<script>
    import Cards from "./shared/Cards.svelte";
    import { onMount } from 'svelte';

    let isDisabled = false;

    onMount(() => {
        document.querySelector('.cards').scrollLeft = 0;
    })


    const handleScroll = (e) => {
        const width = document.querySelector('.cards ul li').clientWidth;
        const div = document.querySelector('.cards');
        const maxScroll = div.scrollLeftMax;
        const scrollRight = {top: 0, left: width, behavior: 'smooth'};
        const scrollLeft = {top: 0, left: -width, behavior: 'smooth'};

        if(div.scrollLeft % width === 0){
            if(e.target.dataset.direction === 'right') 
                div.scrollBy(scrollRight)
            else if(e.target.dataset.direction === 'left')
                div.scrollBy(scrollLeft)
        }
        
        if(e.target.dataset.direction === 'first'){
            div.scrollTo(0,0);
            isDisabled = false;
        } 

        if(maxScroll - div.scrollLeft === width && e.target.dataset.direction === 'right') 
            isDisabled = true;
        else if(maxScroll - div.scrollLeft === 0) 
            isDisabled = false;
    }


</script>

<div class='container d-flex align-items-center position-relative explore-cont'>
    <!-- <h1 class='display-5'>Welcome to expuny!</h1> -->
    <i class="bi-chevron-left position-absolute left-0" data-direction='left' on:click={handleScroll}></i>
    <i class="bi-chevron-right position-absolute right-0" data-direction='right' class:hidden={isDisabled} on:click={handleScroll}></i>
    <i class="bi-chevron-double-left position-absolute left-0" data-direction='first' on:click={handleScroll}></i>
    <div class='container mx-auto overflow-hidden cards'>
        <Cards />
    </div>
    
</div>

<style>

    .cards {
        scroll-behavior: smooth;

    }
    i {
        font-size: 1.5rem;
        cursor: pointer;
        top: 40%;
        padding: 20px;
    }
    i.bi-chevron-double-left {
        top: 55%;
    }
    .hidden{
        display: none;
    }
    
</style>