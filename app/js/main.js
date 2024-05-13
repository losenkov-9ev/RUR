import { getScrollbarWidth } from './utils/getScrollbarWidth.js';
import { getDocumentHeight } from './utils/getDocumentHeight.js';
import { isWebp } from './utils/isWebp.js';

import { SearchManager } from './views/search.js';
import { Header } from './views/header.js';

import NiceSelect from './plugins/nice-select2.js';

import './pages/initPages.js';
import './globalListeners.js';
import { checkPage } from './utils/checkPage.js';

isWebp();
getDocumentHeight();
getScrollbarWidth();

const header = new Header();
!checkPage('admin-help-page') && new SearchManager();

// header paddings
['.content', '.search'].forEach((selector) => {
  const $hItem = document.querySelector(selector);
  $hItem && ($hItem.style.paddingTop = header.headerHeight + 'px');
});

document.querySelectorAll('.page-select').forEach(($s) => {
  new NiceSelect($s, {
    placeholder: 'Select',
  });
});
