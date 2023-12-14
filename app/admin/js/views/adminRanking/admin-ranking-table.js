import { Observer } from '../../../../js/utils/Observer.js';

export class AdminRankingTable {
  constructor() {
    this.statusClassNames = {
      noData: 'noData',
      correct: 'correct',
      incorrect: 'incorrect',
    };

    this.selectors = {
      table: '[data-admin-table="wrapper"]',
      row: '[data-admin-table="row"]',
      input: '[data-admin-table="info"]',
      status: '[data-admin-table="status"]',
    };

    this.isNumeric = (value) => value && !isNaN(value);
    this.statusObserver = new Observer();
    this.allFields = document.querySelectorAll(this.selectors.row);

    document.addEventListener('input', this.handleInput);
  }

  updateStatus($status, statusClass) {
    $status.classList.remove(...Object.values(this.statusClassNames));
    $status.classList.add(statusClass);

    this.isItemFilled($status);
    this.statusObserver.notify(true);
  }

  handleInput = (e) => {
    const $target = e.target.closest(this.selectors.row);

    if ($target) {
      const $status = $target.querySelector(this.selectors.status);
      const $inputs = $target.querySelectorAll(this.selectors.input);

      const areAllNumeric = Array.from($inputs).every((input) =>
        this.isNumeric(input.innerHTML.trim()),
      );
      const areNoData = Array.from($inputs).every((input) => !input.innerHTML.trim());

      this.updateStatus(
        $status,
        areAllNumeric
          ? this.statusClassNames.correct
          : areNoData
          ? this.statusClassNames.noData
          : this.statusClassNames.incorrect,
      );
    }
  };

  isItemFilled($status) {
    const $item = $status.closest('.rankingDataItem');
    const $table = $item.querySelector(this.selectors.table);

    const $rows = $table.querySelectorAll(`${this.selectors.row}:not(.rankingDataTable__head)`);
    const allFieldsCorrect = Array.from($rows).every(($row) => {
      return $row
        .querySelector(this.selectors.status)
        .classList.contains(this.statusClassNames.correct);
    });

    allFieldsCorrect && $item.classList.add('filled');
  }
}
