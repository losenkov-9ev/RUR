import { isWebp, checkPage } from './utills.js';
import { initHeader } from './header.js';
import { initNewsSlider, initTopSlider } from './sliders.js';

const doc = document.documentElement;
const documentHeight = () => {
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
};

const scrollbarWidth = () => {
  let div = document.createElement('div');

  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';

  document.body.append(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;

  div.remove();
  doc.style.setProperty('--scrollbar-width', `${scrollWidth}px`);
};
isWebp();
documentHeight();
scrollbarWidth();

initHeader();

if (checkPage('home-page')) {
  console.log('home');
  initTopSlider();
  initNewsSlider();
}
