import Swiper from 'swiper';

export const initSwiper = () => {
    return new Swiper('.swiper-container',{ 
        spaceBetween: 100,
        slidesPerView: 'auto',
        centeredSlides: true,
        
        breakpoints: {
            576: {
                centeredSlides: false
            }
        }
    });
}

