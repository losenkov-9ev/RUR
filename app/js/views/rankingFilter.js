import NiceSelect from '../plugins/nice-select2.js';

const bubbleTemplate = (name, id) => `
<div class="rankingAsideFilter__bubble-item">
  <div class="rankingAsideFilter__bubble-itemName">${name}</div>
  <div class="rankingAsideFilter__bubble-itemClose" data-bubble-close="${id}">&times;</div>
</div>
`;

const placeholder = (name) => {
  const $placeholder = document.createElement('div');
  $placeholder.classList.add('placeholder');
  $placeholder.innerHTML = name;

  setTimeout(() => {
    $placeholder.style.opacity = '1';
  }, 100);

  return {
    element: $placeholder,
    deleteElement: () => {
      $placeholder.remove();
    },
  };
};

const setPlaceholder = ($wrapper, name) => {
  $wrapper.insertAdjacentElement('beforeend', placeholder(name).element);
};

class RankingFilter {
  constructor() {
    this.$wrapper = document.querySelector('[data-filter="wrapper"]');
    this.$backdrop = document.querySelector('[data-filter="backdrop"]');
    this.$button = document.querySelector('[data-filter="button"]');

    this.$counter = document.querySelector('[data-filter="counter"]');
    this.$bubbles = this.$wrapper.querySelector('[data-filter="bubbles"]');
    this.$clearAll = this.$wrapper.querySelector('[data-filter="clear-all"]');

    this.init();
  }

  init() {
    this.selectPluginInstances = this.selectListener();
    this.bubblesListener();
    this.clearAll();

    const yearSelect = new NiceSelect(document.querySelector('.ranking-select-year'), {
      placeholder: 'Select',
    });

    setPlaceholder(yearSelect.dropdown, 'Year');
  }

  clearAll() {
    this.$clearAll.addEventListener('click', () => {
      this.$selectElements.forEach((obj, idx) => {
        obj.isChecked = false;
        obj.element.selectedIndex = 0;

        this.selectPluginInstances[idx].update();
      });

      this.updateUI();
    });
  }

  updateSearchElements() {
    this.$selectElements = [...document.querySelectorAll('.ranking-select:not(.nice-select)')].map(
      ($el) => {
        const isChecked = !($el.selectedIndex === 0);

        return {
          element: $el,
          isChecked,
        };
      },
    );
  }

  updateUI() {
    this.updateSearchElements();

    const checkedCount = this.$selectElements.filter((obj) => {
      if (obj.isChecked) {
        obj.element.nextElementSibling.classList.add('selected');
        return true;
      }
    }).length;

    [this.$counter, this.$bubbles, this.$clearAll].forEach(($e) =>
      checkedCount > 0 ? $e.classList.add('has-filters') : $e.classList.remove('has-filters'),
    );
  }

  selectListener() {
    this.updateSearchElements();

    const selectPluginInstances = this.$selectElements.map(($s) => {
      return new NiceSelect($s.element, {
        placeholder: 'Select',
        searchable: true,
      });
    });

    const onChangeFilter = (e) => {
      const $target = e.target.closest('.ranking-select');

      if ($target) {
        this.$selectElements.find((obj) => obj.element === $target).isChecked = true;
        this.setFilters();

        if ($target.selectedIndex) {
          const $select = $target.nextElementSibling;
          const selectPlaceholderName = $target[0].textContent;

          setPlaceholder($select, selectPlaceholderName);
        }
      }
    };

    this.$wrapper.addEventListener('change', onChangeFilter);

    return selectPluginInstances;
  }

  setFilters(update) {
    const $checkedItems = this.$selectElements.filter((obj) => obj.isChecked);
    const checkedCount = $checkedItems.length;

    this.$counter.innerHTML = checkedCount;

    !update && this.setBubbles($checkedItems);
    this.updateUI(checkedCount);
  }

  bubblesListener() {
    this.$bubbles.addEventListener('click', (e) => {
      const $target = e.target.closest('[data-bubble-close]');

      if ($target) {
        const id = $target.getAttribute('data-bubble-close');
        const currentSelectedIndex = 0;

        const $bubble = $target.closest('.rankingAsideFilter__bubble-item');
        $bubble.remove();

        this.$wrapper.querySelector('#' + id).selectedIndex = currentSelectedIndex;

        const currentInstance = this.selectPluginInstances.find(
          (instance) => instance.el.getAttribute('id') === id,
        );

        currentInstance.update();

        this.updateUI();
        this.setFilters(true);
      }
    });
  }

  setBubbles(activeFilters) {
    this.$bubbles.innerHTML = activeFilters
      .map((filter) => {
        const selectedIndex = filter.element.selectedIndex;
        if (selectedIndex === 0) return '';

        const selectedOption = filter.element.options[selectedIndex];
        const selectedText = selectedOption.textContent;

        return bubbleTemplate(selectedText, filter.element.id);
      })
      .join('');
  }
}

export class RankingFilterMobile extends RankingFilter {
  constructor() {
    super();

    this.$button.addEventListener('click', () => this.openFilter());
    this.$backdrop.addEventListener('click', () => this.closeFilter());
    this.$wrapper.addEventListener('click', (e) => this.handleWrapperClick(e));
  }

  openFilter() {
    this.$backdrop.style.display = 'block';
    setTimeout(() => {
      this.$backdrop.classList.add('opened');
    }, 10);

    this.$wrapper.classList.add('opened');
    document.body.classList.add('popup-opened');
  }

  closeFilter() {
    this.$backdrop.classList.remove('opened');
    setTimeout(() => {
      this.$backdrop.style.display = 'none';
    }, 300);

    this.$wrapper.classList.remove('opened');
    document.body.classList.remove('popup-opened');
  }

  handleWrapperClick(e) {
    if (e.target.closest('[data-filter="close"]')) {
      this.closeFilter();
    }
  }
}
