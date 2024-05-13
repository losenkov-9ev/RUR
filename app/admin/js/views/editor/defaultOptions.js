const MAX_LENGTH = 2000;
const ERROR_CLASS = 'editor-error';

export const defaultOptions = {
  editorElementSelector: '.caveatStatement__editor',
  editorID: '#editor',
  charactersCounterSelector: '[data-caveat-counter="characters"]',
  maxLength: MAX_LENGTH,
  errorClass: ERROR_CLASS,
  clearButtonSelector: '.caveatStatement__button',
  placeholder: 'Write something awesome...',
};
