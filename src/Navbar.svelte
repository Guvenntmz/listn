<script>
    import { Link } from 'svelte-routing';

    //handling active navElm
    function getProps({ isCurrent }) {
        if (isCurrent) {
        return { class: "active" };
        }
        return {};
    }
</script>

<nav class='container navbar fixed-top'>
    <ul class='navbar-nav w-100 d-flex flex-row justify-content-around'>
        <li class='nav-item'><Link class='nav-link' getProps={getProps} to="explore">EXPLORE</Link></li>
        <li class='nav-item'><Link class='nav-link' getProps={getProps} to="library">LIBRARY</Link></li>
        <li class='nav-item'><Link class='nav-link' id="logo" to="explore">EXPUNY</Link></li>
        <li class='nav-item'><Link class='nav-link' getProps={getProps} to="/buddies">BUDDIES</Link></li>
        <li class='nav-item'><Link class='nav-link' getProps={getProps} to="/profile">PROFILE</Link></li>
    </ul>
</nav>

<style>

</style>