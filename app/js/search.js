export class SearchManager {
  constructor() {
    this.isOpened = false;

    this.searchWrapper = document.querySelector('[data-search="wrapper"]');
    this.searchList = this.searchWrapper.querySelector('[data-search="list"]');
    this.searchButton = this.searchWrapper.querySelector('[data-search="searchButton"]');
    this.searchOpenButton = document.querySelector('[data-search="open"]');
    this.searchInput = this.searchWrapper.querySelector('[data-search="input"]');

    this.init();
  }

  init() {
    this.addEventListeners();
    this.hideSearchList();
    this.searchWrapper.style.display = 'none';
  }

  addEventListeners() {
    this.searchOpenButton.addEventListener('click', this.toggleSearch.bind(this));
    this.searchWrapper.addEventListener('click', this.handleSearchClick.bind(this));
    this.searchInput.addEventListener('focus', this.handleInputFocus.bind(this));
  }

  async toggleSearch() {
    if (!this.isOpened) {
      await this.openSearch();
    } else {
      this.closeSearch();
    }
  }

  async openSearch() {
    document.body.classList.add('popup-opened');
    this.isOpened = true;

    this.searchWrapper.style.display = 'block';
    await this.delay(0);
    this.searchWrapper.classList.remove('closed');
    await this.delay(300);
    this.searchWrapper.querySelector('.search__field').classList.remove('closed');
  }

  async closeSearch() {
    this.isOpened = false;

    this.hideSearchList();

    this.searchWrapper.querySelector('.search__field').classList.add('closed');
    await this.delay(300);
    this.searchWrapper.classList.add('closed');
    await this.delay(300);
    this.hideSearchList();

    document.body.classList.remove('popup-opened');
    this.searchWrapper.style.display = 'none';
  }

  async showSearchList() {
    this.searchList.classList.add('opened');
    this.searchWrapper.classList.add('list-opened');
    await this.delay(300);
  }

  async hideSearchList() {
    this.searchList.classList.remove('opened');
    this.searchWrapper.classList.remove('list-opened');
    await this.delay(300);
    this.searchButton.style.transform = 'translateX(0)';
  }

  async handleInputFocus(e) {
    if (e.target.closest('[data-search="input"]')) {
      this.showSearchList();
      this.searchInput.focus();
    }
  }

  async handleSearchClick(e) {
    const closeBtn = e.target.closest('[data-search="close"]');
    const searchBtn = e.target.closest('[data-search="searchButton"]');
    const selectBtn = e.target.closest('[data-search="selectButton"]');
    const selectItem = e.target.closest('[data-search="selectItem"]');

    if (closeBtn) {
      this.closeSearch();
    }

    if (searchBtn) {
      this.showSearchList();
      this.searchInput.focus();
    }

    if (selectBtn) {
      this.toggleDropdown();
    }

    if (selectItem) {
      this.selectDropdownItem(selectItem);
    }
  }

  toggleDropdown() {
    const dropdownSelect = this.searchWrapper.querySelector('[data-search="selectWrapper"]');
    dropdownSelect.classList.toggle('opened');
  }

  selectDropdownItem(item) {
    const dropdownSelect = this.searchWrapper.querySelector('[data-search="selectWrapper"]');
    const activeItem = this.searchWrapper.querySelector('[data-search="selectItem"].active');

    if (activeItem) {
      activeItem.classList.remove('active');
    }

    item.classList.add('active');
    this.searchWrapper.querySelector('[data-search="selectButton"] span').innerHTML =
      item.innerHTML;
    dropdownSelect.classList.remove('opened');
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
