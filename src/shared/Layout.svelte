<script>
    import Navbar from "./Navbar.svelte";
</script>



<Navbar />
<slot></slot>
<footer class='container-fluid text-center py-2'>
    <h1 class='lead m-0 text-white'>Copyright Expuny 2020</h1>
</footer>    


<style>
    footer h1 {
        font-size: 1rem !important;
    }
</style>