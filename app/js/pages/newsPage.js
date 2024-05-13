import { checkPage } from '../utils/checkPage.js';
import { Aside } from '../views/Aside.js';

if (checkPage('news-page')) {
  new Aside(false);
}
