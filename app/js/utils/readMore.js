export const readMore = (e) => {
  if (e.target.closest('[data-readMore="button"]')) {
    e.preventDefault();

    const $readMore = e.target.closest('[data-readMore="button"]');
    toggleText($readMore);
  }

  function toggleText($el) {
    const $elText = $el.querySelector('span');

    const $text = $el.closest('[data-readMore="wrapper"]').querySelector('[data-readMore="text"]');
    $text.classList.toggle('opened');
    $el.classList.toggle('opened');

    const clone = $text.cloneNode(true);
    clone.style.overflow = 'visible';
    clone.style.height = 'auto';
    clone.style.visibility = 'hidden'; // чтобы избежать мигания

    // Вставляем клон в DOM, чтобы он занял свое место в потоке документа (но он не будет видимым)
    $text.parentNode.appendChild(clone);

    // Получаем высоту текста внутри клонированного элемента
    const textHeight = clone.getBoundingClientRect().height;

    $text.style.height = textHeight + 'px';
    // Удаляем клон из DOM, так как он больше не нужен
    clone.parentNode.removeChild(clone);

    !$text.classList.contains('opened')
      ? ($elText.innerHTML = 'Watch more')
      : ($elText.innerHTML = 'Hide');
  }
};
