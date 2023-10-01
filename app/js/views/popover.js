export const popover = ({ $mainArray, dropdownSelector, display }) => {
  $mainArray.forEach(($el) => {
    const $dropdown = $el.querySelector(dropdownSelector);

    $el.addEventListener('mouseenter', () => showDropdown($dropdown));
    $el.addEventListener('mouseleave', () => hideDropdown($dropdown));
  });

  function showDropdown($dropdown) {
    $dropdown.style.display = display || 'block';
    setTimeout(() => {
      $dropdown.classList.add('opened');
    }, 0);
  }

  function hideDropdown($dropdown) {
    $dropdown.classList.remove('opened');
    setTimeout(() => {
      $dropdown.style.display = 'none';
    }, 300);
  }
};
