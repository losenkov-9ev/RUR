import Quill from 'quill';
import { toolbarOptions } from './toolbar.js';

const maxLength = 2000;
const errorClass = 'editor-error';

const $editor = document.querySelector('.caveatStatement__editor');

export const editor = () => {
  const $characters = document.querySelector('[data-caveat-counter="characters"]');
  const $files = document.querySelector('[data-caveat-counter="file"]');

  const editor = initQuillEditor();

  editor.on('text-change', (delta, oldDelta, source) => {
    updateCharacterCount(editor, $characters);
    handleTextChange(editor, $characters, source);
  });

  document.querySelector('.caveatStatement__button').addEventListener('click', (e) => {
    clearForm(editor);

    $characters.innerHTML = maxLength;
    $files.innerHTML = 0;
  });
};

const initQuillEditor = () => {
  return new Quill('#editor', {
    modules: { toolbar: toolbarOptions },
    theme: 'snow',
    placeholder: 'Write something awesome...',
  });
};

const updateCharacterCount = (editor, $characters) => {
  $characters.innerHTML = maxLength - editor.getLength() + 1;
};

const handleTextChange = (editor, $characters, source) => {
  if (source === 'user') {
    handleUserTextChange(editor, $characters);
  }
};

const handleUserTextChange = (editor, $characters) => {
  const length = editor.getLength();
  if (length > maxLength) {
    handleTextOverflow(editor, $characters, length);
  } else {
    resetErrorState($editor, errorClass);
  }
};

const handleTextOverflow = (editor, $characters, length) => {
  editor.deleteText(maxLength, length - maxLength);
  $editor.classList.add(errorClass);
};

const resetErrorState = ($editor, errorClass) => {
  $editor.classList.remove(errorClass);
};

const clearForm = (editor) => {
  editor.setText('');

  // Удаление всех форматирований
  editor.removeFormat(0, editor.getLength());
};
