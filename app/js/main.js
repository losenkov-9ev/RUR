import { isWebp, checkPage } from './utills.js';
import { initHeader } from './header.js';
import { initNewsSlider, initTopSlider } from './sliders.js';
import { readMore } from './readMore.js';
import { rankingsPopover } from './rankingsPopover.js';
import { doughnutChart } from './chart/chart.js';

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

document.onclick = (e) => {
  readMore(e);
};

if (checkPage('home-page')) {
  initTopSlider();
  initNewsSlider();
} else if (checkPage('university-page')) {
  rankingsPopover();
  doughnutChart();
}
