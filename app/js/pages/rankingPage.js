import { RankingFilterMobile } from '../views/rankingFilter.js';
import { checkPage } from '../utils/checkPage.js';
import { Aside } from '../views/Aside.js';

if (checkPage('ranking-page')) {
  const $rankigItemsBox = document.querySelector('.ranking__items-box');
  const first10Items = [...$rankigItemsBox.querySelectorAll('.rankingItem')].slice(0, 10);

  const resHeight = first10Items.reduce((acc, $el) => {
    return acc + $el.offsetHeight + parseFloat(window.getComputedStyle($el).marginBottom) - 1;
  }, 0);

  $rankigItemsBox.style.height = resHeight + 'px';

  new RankingFilterMobile();
  new Aside(false);
}
