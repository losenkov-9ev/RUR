import { AdminRankingTable } from './admin-ranking-table.js';

export class AdminRankingBar extends AdminRankingTable {
  constructor() {
    super();
    this.statusObserver.subscribe(this.changeBarProgresValue.bind(this));

    this.barProgress = 0;
    this.$bar = document.querySelector('[data-bar-progress]');
    this.$barValue = document.querySelectorAll('[data-bar-progress-value]');
  }

  changeBarProgresValue() {
    const correctFields = [...this.allFields].filter(($field) => {
      const $status = $field.querySelector(this.selectors.status);
      return $status.classList.contains(this.statusClassNames.correct);
    });

    this.barProgress = Math.round((correctFields.length / this.allFields.length) * 100);
    this.changeBarProgres();
  }

  changeBarProgres() {
    const value = this.barProgress + '%';

    this.$bar.style.width = value;
    this.$barValue.forEach(($b) => ($b.innerHTML = value));
  }
}
