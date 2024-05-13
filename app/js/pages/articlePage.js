import { initArticleSlider } from '../views/sliders.js';
import { checkPage } from '../utils/checkPage.js';
import { Aside } from '../views/Aside.js';

if (checkPage('article-page')) {
  new Aside(true);
  initArticleSlider();
}
