import { isWebp, checkPage } from './utils.js';
import { Header } from './header.js';
import { initArticleSlider, initNewsSlider, initTopSlider } from './sliders.js';
import { readMore } from './readMore.js';
import { SearchManager } from './search.js';
import { Aside } from './Aside.js';

import NiceSelect from './plugins/nice-select2.js';

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

const header = new Header();
new SearchManager();

// header paddings
['.content', '.search'].forEach((selector) => {
  document.querySelector(selector).style.paddingTop = header.headerHeight + 'px';
});

document.onclick = (e) => {
  readMore(e);
};

document.querySelectorAll('.page-select').forEach(($s) => {
  new NiceSelect($s, {
    placeholder: 'Select',
  });
});

if (checkPage('home-page')) {
  initTopSlider();
  initNewsSlider();
} else if (checkPage('university-page')) {
  async function loadUniversity() {
    try {
      const universityModule = await import('./university/university.js');
      const initUniversityFn = universityModule.initUniversity;

      initUniversityFn();
    } catch (error) {
      console.error('Ошибка при загрузке модуля:', error);
    }
  }

  loadUniversity();
} else if (checkPage('news-page')) {
  new Aside(false);
} else if (checkPage('ranking-page')) {
  new Aside(false);
} else if (checkPage('article-page')) {
  new Aside(true);
  initArticleSlider();
}
