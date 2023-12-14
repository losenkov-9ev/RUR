const toggleCheckboxState = ($checkbox, state) => {
  $checkbox.checked = state;
};

const updateRowDisplay = ($row, shouldDisplay) => {
  $row.style.display = shouldDisplay ? 'block' : 'none';
};

export const adminTableFilter = () => {
  document.querySelectorAll('.adminHelpTable__popover').forEach(($popover) => {
    $popover.addEventListener('change', (e) => {
      const $allInputs = $popover.querySelectorAll('input');
      const isSelectAllCheckbox = e.target.dataset.helpCheckbox === 'all';

      if (isSelectAllCheckbox) {
        $allInputs.forEach(($i) => toggleCheckboxState($i, e.target.checked));
      } else {
        const selectAllCheckbox = [...$allInputs].find(($i) => $i.dataset.helpCheckbox === 'all');
        !e.target.checked && toggleCheckboxState(selectAllCheckbox, false);
      }

      const selectedInputs = [...$allInputs]
        .filter(($i) => $i.checked)
        .map(($i) => $i.dataset.helpCheckbox);

      const dataTableRows = $popover
        .closest('.rankingDataTable')
        .querySelectorAll('[data-help-table-item]');

      dataTableRows.forEach(($row) => {
        const shouldDisplay = selectedInputs.includes($row.dataset.helpTableItem);
        updateRowDisplay($row, shouldDisplay);
      });
    });
  });
};
