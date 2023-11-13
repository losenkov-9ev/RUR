import { validateParticipationForm, validateContactsForm } from './utils/validation.js';

import { getScrollbarWidth } from './utils/getScrollbarWidth.js';
import { getDocumentHeight } from './utils/getDocumentHeight.js';
import { loadModule } from './utils/loadModule.js';
import { checkPage } from './utils/checkPage.js';
import { readMore } from './utils/readMore.js';
import { isWebp } from './utils/isWebp.js';

import { initArticleSlider, initNewsSlider, initTopSlider } from './views/sliders.js';
import { rankingFilter } from './views/rankingFilter.js';
import { SearchManager } from './views/search.js';
import { accordeon } from './views/accordeon.js';
import { Header } from './views/header.js';
import { Aside } from './views/Aside.js';

import NiceSelect from './plugins/nice-select2.js';

isWebp();
getDocumentHeight();
getScrollbarWidth();

const header = new Header();
new SearchManager();

// header paddings
['.content', '.search'].forEach((selector) => {
  const $hItem = document.querySelector(selector);
  $hItem && ($hItem.style.paddingTop = header.headerHeight + 'px');
});

document.onclick = (e) => {
  readMore(e);
  accordeon(e);
};

document.querySelectorAll('.page-select').forEach(($s) => {
  new NiceSelect($s, {
    placeholder: 'Select',
  });
});

if (checkPage('home-page')) {
  initTopSlider();
  initNewsSlider();
} else if (checkPage('news-page')) {
  new Aside(false);
} else if (checkPage('ranking-page')) {
  rankingFilter();
  new Aside(false);
} else if (checkPage('article-page')) {
  new Aside(true);
  initArticleSlider();
} else if (checkPage('participation-form-page')) {
  validateParticipationForm();
} else if (checkPage('contacts-page')) {
  validateContactsForm();

  // асинхронная загрузка js модулей (исправить по DRY)
} else if (checkPage('university-page')) {
  (async function () {
    try {
      const _module = await import('./university/university.js');
      const initModuleFn = _module.init;

      initModuleFn();
    } catch (error) {
      console.error('Ошибка при загрузке модуля:', error);
    }
  })();
} else if (checkPage('admin-page')) {
  (async function () {
    try {
      const _module = await import('../admin/js/admin-main.js');
      const initModuleFn = _module.init;

      initModuleFn();
    } catch (error) {
      console.error('Ошибка при загрузке модуля:', error);
    }
  })();
}
