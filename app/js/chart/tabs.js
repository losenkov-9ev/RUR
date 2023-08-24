class ChartTabs {
  constructor(options) {
    this.$controls = document.querySelector('[data-chart-controls="wrapper"]');
    this.$tabs = document.querySelector('[data-chart-tabs]');

    this.init;
  }

  get init() {
    this.controlsListener();
    this.changeControlActive('item-1');
  }

  controlsListener() {
    this.$controls.addEventListener('click', (e) => {
      const targetSelector =
        '[data-chart-controls]:not(.active):not([data-chart-controls="wrapper"])';

      const $target = e.target.closest(targetSelector);
      $target && this.changeControlActive($target.dataset.chartControls);
    });
  }

  changeControlActive(id) {
    this.$controls
      .querySelectorAll('[data-chart-controls]')
      .forEach(($c) => $c.classList.remove('active'));
    this.$controls.querySelector(`[data-chart-controls="${id}"]`).classList.add('active');

    this.changeTab(id);
  }

  async changeTab(id) {
    const tabPromises = [];

    this.$tabs.querySelectorAll('[data-chart-tab]').forEach(($c) => {
      $c.classList.remove('active');
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          $c.style.display = 'none';
          resolve();
        }, 300);
      });
      tabPromises.push(promise);
    });

    await Promise.all(tabPromises);

    const $tab = this.$tabs.querySelector(`[data-chart-tab="${id}"]`);
    $tab.style.display = 'block';

    setTimeout(() => {
      $tab.classList.add('active');
    }, 50);
  }

  // changeTab(id) {
  //   this.$tabs.querySelectorAll('[data-chart-tab]').forEach(($c) => {
  //     $c.classList.remove('active');
  //     setTimeout(() => {
  //       $c.style.display = 'none';
  //     }, 300);
  //   });
  //   const $tab = this.$tabs.querySelector(`[data-chart-tab="${id}"]`);
  //   setTimeout(() => {
  //     $tab.style.display = 'block';
  //     $tab.classList.add('active');
  //   }, 300);
  // }
}

export const chartTabsInstance = new ChartTabs();
