import { checkPage } from '../utils/checkPage.js';
import { initNewsSlider, initTopSlider } from '../views/sliders.js';

if (checkPage('home-page')) {
  initTopSlider();
  initNewsSlider();
}
