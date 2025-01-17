// gsap
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)
    // gsap code here!
    console.log('ddd');

});

// Projects 스와이퍼
var projectSlide = new Swiper("#projects .mySwiper", {
    slidesPerView: 3.5,
    spaceBetween: 40,
    loop: true,
    looppedAdditionalSlide: 1,
});
