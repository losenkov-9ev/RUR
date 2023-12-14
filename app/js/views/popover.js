export class Popover {
  constructor({ $mainArray, dropdownSelector, display, onClick = false }) {
    this.$mainArray =
      $mainArray instanceof NodeList
        ? Array.from($mainArray)
        : Array.from(document.querySelectorAll($mainArray));

    this.dropdownSelector = dropdownSelector;
    this.display = display;

    this.animationDelay = 10;
    this.animationDuration = 300;

    this.onClick = onClick;

    this.init();
  }

  init = () => {
    !this.onClick
      ? this.$mainArray.forEach(($el) => {
          $el.addEventListener('mouseenter', this.handleMouseEnter);
          $el.addEventListener('mouseleave', this.handleMouseLeave);
        })
      : this.$mainArray.forEach(($el) => {
          $el.addEventListener('click', (e) => {
            !e.target.closest(this.dropdownSelector) &&
              this.toggleDropdownPopover(
                $el,
                !$el.querySelector(this.dropdownSelector).classList.contains('opened'),
              );
          });
        });
  };

  handleMouseEnter = (event) => {
    const $el = event.currentTarget;
    this.toggleDropdownPopover($el, true);
  };

  handleMouseLeave = (event) => {
    const $el = event.currentTarget;
    this.toggleDropdownPopover($el, false);
  };

  toggleDropdownPopover = ($el, isOpen) => {
    const $dropdown = $el.querySelector(this.dropdownSelector);

    if (isOpen) {
      $dropdown.style.display = this.display || 'block';
      setTimeout(() => {
        $dropdown.classList.add('opened');
      }, this.animationDelay);
    } else {
      $dropdown.classList.remove('opened');
      setTimeout(() => {
        $dropdown.style.display = 'none';
      }, this.animationDuration);
    }
  };

  update = ($newArray) => {
    this.destroy();
    this.$mainArray =
      $newArray instanceof NodeList
        ? Array.from($newArray)
        : Array.from(document.querySelectorAll($newArray));

    this.init();
  };

  destroy = () => {
    !this.onClick
      ? this.$mainArray.forEach(($el) => {
          this.toggleDropdownPopover($el, false);

          $el.removeEventListener('mouseenter', this.handleMouseEnter);
          $el.removeEventListener('mouseleave', this.handleMouseLeave);
        })
      : this.$mainArray.forEach(($el) => {
          $el.removeEventListener('click', (e) => {
            !e.target.closest(this.dropdownSelector) &&
              this.toggleDropdownPopover(
                $el,
                !$el.querySelector(this.dropdownSelector).classList.contains('opened'),
              );
          });
        });
  };
}
