export const customInput = () => {
  document.addEventListener('input', (e) => {
    if (e.target.closest('[data-input="custom"]')) {
      e.target.value.trim() !== ''
        ? e.target.classList.add('loginDefaultInput-field')
        : e.target.classList.remove('loginDefaultInput-field');
    }
  });
  document.addEventListener('click', (e) => {
    const $inputWrapper = e.target.closest('[data-input="custom"]');
    if ($inputWrapper && e.target.closest('[data-input="toggleVisibility"]')) {
      const $input = $inputWrapper.querySelector('input');
      $input.getAttribute('type') === 'text'
        ? $input.setAttribute('type', 'password')
        : $input.setAttribute('type', 'text');
    }
  });
};
