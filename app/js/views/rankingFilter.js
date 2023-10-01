export const rankingFilter = () => {
  const $backdrop = document.querySelector('[data-filter="backdrop"]');
  const $wrapper = document.querySelector('[data-filter="wrapper"]');
  const $button = document.querySelector('[data-filter="button"]');

  const openFilter = () => {
    $backdrop.style.display = 'block';
    setTimeout(() => {
      $backdrop.classList.add('opened');
    }, 10);

    $wrapper.classList.add('opened');
    document.body.classList.add('popup-opened');
  };

  const closeFilter = () => {
    $backdrop.classList.remove('opened');
    setTimeout(() => {
      $backdrop.style.display = 'none';
    }, 300);

    $wrapper.classList.remove('opened');
    document.body.classList.remove('popup-opened');
  };

  $button.addEventListener('click', openFilter);
  $backdrop.addEventListener('click', closeFilter);

  $wrapper.addEventListener('click', (e) => {
    e.target.closest('[data-filter="close"]') && closeFilter();
  });
};
