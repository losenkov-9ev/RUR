export class Tabs {
  constructor(options) {
    this.options = options;
    this.$controls = document.querySelector(options.controlsSelector);
    this.$tabs = document.querySelector(options.tabsSelector);

    if (!this.$controls || !this.$tabs) {
      throw new Error('Controls or tabs not found');
    }

    this.init(options.defaultTabId);
  }

  init(defaultTabId) {
    this.controlsListener();
    this.changeControlActive(defaultTabId, true);
  }

  controlsListener() {
    this.$controls.addEventListener('click', (e) => {
      const targetSelector = `[${this.options.controlsItem}]:not(.${this.options.activeClass}):not(${this.options.controlsSelector})`;

      const $target = e.target.closest(targetSelector);
      $target && this.changeControlActive($target.getAttribute(this.options.controlsItem));
    });
  }

  changeControlActive(id, skipTimeout = false) {
    this.$controls
      .querySelectorAll(`[${this.options.controlsItem}]`)
      .forEach(($c) => $c.classList.remove(this.options.activeClass));
    this.$controls
      .querySelector(`[${this.options.controlsItem}="${id}"]`)
      .classList.add(this.options.activeClass);

    this.changeTab(id, skipTimeout);
  }

  async changeTab(id, skipTimeout) {
    const tabPromises = [];

    if (skipTimeout) {
      this.$tabs.querySelectorAll(`[${this.options.tabItem}]`).forEach(($c) => {
        $c.classList.remove(this.options.activeClass);
        $c.style.display = 'none';
      });
      const $tab = this.$tabs.querySelector(`[${this.options.tabItem}="${id}"]`);
      $tab.style.display = this.options.defaultDisplay;
      $tab.classList.add(this.options.activeClass);
    } else {
      this.$tabs.querySelectorAll(`[${this.options.tabItem}]`).forEach(($c) => {
        $c.classList.remove(this.options.activeClass);
        const promise = new Promise((resolve) => {
          setTimeout(() => {
            $c.style.display = 'none';
            resolve();
          }, 300);
        });
        tabPromises.push(promise);
      });

      await Promise.all(tabPromises);

      const $tab = this.$tabs.querySelector(`[${this.options.tabItem}="${id}"]`);
      $tab.style.display = this.options.defaultDisplay;

      setTimeout(() => {
        $tab.classList.add(this.options.activeClass);
      }, 50);
    }
  }
}
