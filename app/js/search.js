export const initSearch = () => {
  let isOpened = false;

  const $searchWrapper = document.querySelector('[data-search="wrapper"]');
  const $searchList = $searchWrapper.querySelector('[data-search="list"]');
  const $searchButton = $searchWrapper.querySelector('[data-search="searchButton"]');
  const $searchOpen = document.querySelector('[data-search="open"]');
  const $searchInput = $searchWrapper.querySelector('[data-search="input"]');

  window.onload = () => {
    $searchWrapper.style.display = 'none';
  };

  $searchOpen.addEventListener('click', () => {
    !isOpened ? searchOpen() : searchClose();
  });

  $searchWrapper.addEventListener('click', (e) => {
    if (e.target.closest('[data-search="close"]')) {
      searchClose();
    }
    searchFocused(e);
    seacrchSelect(e);
  });

  $searchInput.onfocus = (e) => searchFocused(e, 'inputFocused');

  function searchOpen() {
    document.body.classList.add('popup-opened');
    isOpened = true;

    $searchWrapper.style.display = 'block';
    setTimeout(() => {
      $searchWrapper.classList.remove('closed');
    }, 0);
    setTimeout(() => {
      $searchWrapper.querySelector('.search__field').classList.remove('closed');
    }, 300);
  }
  function searchClose() {
    isOpened = false;

    $searchList.classList.remove('opened');
    if ($searchWrapper.classList.contains('list-opened')) {
      $searchWrapper.classList.remove('list-opened');
      setTimeout(() => {
        $searchWrapper.querySelector('.search__field').classList.add('closed');
      }, 300);
      setTimeout(() => {
        $searchButton.style.transform = 'translateX(0)';
        $searchWrapper.classList.add('closed');
        document.body.classList.remove('popup-opened');
      }, 600);
      setTimeout(() => {
        $searchWrapper.style.display = 'none';
      }, 900);
    } else {
      $searchWrapper.querySelector('.search__field').classList.add('closed');

      setTimeout(() => {
        $searchWrapper.classList.add('closed');
      }, 300);
      setTimeout(() => {
        $searchWrapper.style.display = 'none';
        document.body.classList.remove('popup-opened');
      }, 600);
    }
  }
  function searchFocused(e, eventName) {
    if (eventName && eventName === 'inputFocused') {
      $searchList.classList.add('opened');
      $searchWrapper.classList.add('list-opened');

      setTimeout(() => {
        $searchButton.style.transform = 'translateX(1000px)';
      }, 300);
    } else if (e.target.closest('[data-search="searchButton"]')) {
      $searchList.classList.add('opened');
      $searchWrapper.classList.add('list-opened');
      $searchInput.focus();
      setTimeout(() => {
        $searchButton.style.transform = 'translateX(1000px)';
      }, 300);
    }
  }
  function seacrchSelect(e) {
    const $dropdownSelect = $searchWrapper.querySelector('[data-search="selectWrapper"]');
    const dropdownSelectors = {
      button: '[data-search="selectButon"]',
      item: '[data-search="selectItem"]',
    };

    if (e.target.closest(dropdownSelectors.button)) {
      $dropdownSelect.classList.toggle('opened');
    } else if (e.target.closest(dropdownSelectors.item)) {
      $searchWrapper.querySelector(`${dropdownSelectors.item}.active`).classList.remove('active');

      e.target.classList.add('active');
      $searchWrapper.querySelector(`${dropdownSelectors.button} span`).innerHTML =
        e.target.innerHTML;

      $dropdownSelect.classList.remove('opened');
    }
  }
};
