<script>
    import { Link } from 'svelte-routing';

    //handling active navElm
    function getProps({ isCurrent }) {
        if(isCurrent) {
            return {class: "active nav-link px-4 pt-3 mx-5"}
        }
        return {class: "nav-item nav-link px-4 pt-3 mx-5"};
    }
</script>


<nav class="navbar navbar-expand-lg navbar-dark">
    <Link getProps={() => {return {class: "nav-brand px-4 py-2 text-white d-block d-lg-none"}}} to="/explore">
        EXP
    </Link>
    <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav justify-content-around m-auto">
            <Link getProps={getProps} to="/explore">Explore</Link>
            <Link getProps={getProps} to="/library">Library</Link>
            <Link getProps={() => {return {class: "nav-brand px-4 py-2 text-white mx-5 d-none d-lg-block"}}} to="/explore">
                EXP
            </Link>
            <Link getProps={getProps} to="/buddies">Buddies</Link>
            <Link getProps={getProps} to="/profile">Profile</Link>
        </div>
    </div>
</nav>

<style>

    /* At the global stylesheet */
    
    
</style>