import { readMore } from './utils/readMore.js';
import { accordeon } from './views/accordeon.js';

document.addEventListener('change', ({ target }) => {
  const $s = target.nextElementSibling;

  if ($s && $s.classList.contains('nice-select')) {
    target.selectedIndex ? $s.classList.add('selected') : $s.classList.remove('selected');
  }
});

document.onclick = (e) => {
  readMore(e);
  accordeon(e);

  !e.target.closest('.caveatStatement__editor') &&
    document.querySelectorAll('.caveatStatement__editor').forEach(($el) => {
      $el.classList.add('unfocused');
    });
};
