// gsap
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)
    // gsap code here!
    console.log('ddd');

});

// Projects 스와이퍼
var projectSlide = new Swiper("#projects .mySwiper", {
    slidesPerView: 1.5,
    spaceBetween: 20,
    loop: true,
    looppedAdditionalSlide: 1,
    breakpoints: {
        1024: {
            slidesPerView: 3.5,
            spaceBetween: 40,
        },
        768: {
            slidesPerView: 2.5,
            spaceBetween: 30,
        },
        600: {
            slidesPerView: 2.2,
            spaceBetween: 20,
        },
    }
});