<script>
    import { Link } from 'svelte-routing';

    //handling active navElm
    function getProps({ isCurrent }) {
        if(isCurrent) {
            return {class: "active nav-item nav-link px-5 mx-xxl-5"}
        }
        return {class: "nav-item nav-link px-5 mx-xxl-5"};
    }
</script>


<nav class="navbar navbar-expand-lg navbar-dark">
    <Link getProps={() => {return {class: "navbar-brand pl-3 d-block d-lg-none"}}} to="/explore">EXP</Link>
    <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav justify-content-around m-auto">
            <Link getProps={getProps} to="/explore">Explore</Link>
            <Link getProps={getProps} to="/library">Library</Link>
            <Link getProps={() => {return {class: "navbar-brand d-none d-lg-block px-4", style:"margin: 0 150px 0 150px;"}}} to="/explore">EXP</Link>
            <Link getProps={getProps} to="/buddies">Buddies</Link>
            <Link getProps={getProps} to="/profile">Profile</Link>
        </div>
    </div>
</nav>

<style>

    nav {
        background-color: transparent;
        border: none;
    }
    @media only screen and (max-width: 576px) {
        nav {
            background-image: url('/img/brand-icon.png');
            background-position: 50% 50px;
            background-size: 50%;
            background-repeat: no-repeat;
        }
    }
    

</style>