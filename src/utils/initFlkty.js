export const initFlkty = () => {
    if(window.innerWidth >= 576) {
        return new Flickity( '.main-carousel', {
            // options
            cellAlign: 'left',
            prevNextButtons: false,
            pageDots: false,
            contain: true,
            percentPosition: false
        });
    }else {
        return new Flickity( '.main-carousel', {
            // options
            cellAlign: 'center',
            prevNextButtons: false,
            pageDots: false,
            contain: false,
            percentPosition: false,
        });
    }
    
    
}

