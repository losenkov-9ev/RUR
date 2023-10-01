export const locationToggler = () => {
  const $location = document.querySelector('#universityLocation');
  const $locationItems = $location.querySelectorAll('[data-location="item"]');
  const $locationBox = $location.querySelector('[data-location="box"]');

  let $locationHeight = 0;

  if ($locationItems.length >= 3) {
    $locationHeight = [...$locationItems].reduce((acc, $item, idx) => {
      return idx < 3 ? (acc += $item.offsetHeight) : acc;
    }, 0);

    $locationBox.style.height = $locationHeight + 'px';
  }

  $location.addEventListener('click', (e) => {
    const $target = e.target.closest('[data-location="button"]');

    if ($target) {
      e.preventDefault();

      const $elText = $target.querySelector('span');

      $locationBox.classList.toggle('opened');
      $target.classList.toggle('opened');

      const clone = $locationBox.cloneNode(true);
      clone.style.overflow = 'visible';
      clone.style.height = 'auto';
      clone.style.visibility = 'hidden'; // чтобы избежать мигания

      // Вставляем клон в DOM, чтобы он занял свое место в потоке документа (но он не будет видимым)
      $locationBox.parentNode.appendChild(clone);

      // Получаем высоту текста внутри клонированного элемента
      const textHeight = clone.getBoundingClientRect().height;

      // Удаляем клон из DOM, так как он больше не нужен
      clone.parentNode.removeChild(clone);

      if ($locationBox.classList.contains('opened')) {
        $elText.innerHTML = 'Hide';
        $locationBox.style.height = textHeight + 'px';
      } else {
        $elText.innerHTML = 'Watch more';
        $locationBox.style.height = $locationHeight + 'px';
      }
    }
  });
};
