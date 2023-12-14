export const adminInput = () => {
  document.addEventListener('input', (e) => {
    const $field = e.target.closest('[data-admin-counter="field"]');

    const $counter = $field.parentNode.querySelector('[data-admin-counter-value]');
    if ($field && $counter) {
      $counter.innerHTML = +$counter.getAttribute('data-admin-counter-value') - $field.value.length;
      $field.classList.toggle('error', +$counter.innerHTML < 0);
    }
  });
};
