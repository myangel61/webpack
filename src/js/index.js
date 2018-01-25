import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import '../scss/main.scss';

$('#owl-one').owlCarousel({
  items: 1,
  startPosition: 1,
  loop: true,
  nav: true,
  dots: true,
  dotsEach: true,
  navText: [],
  smartSpeed: 1000,
});
