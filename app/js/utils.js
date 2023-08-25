export function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}

export const checkPage = (name) => document.body.classList.contains(name);

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
