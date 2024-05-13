import Quill from 'quill';
import { toolbarOptions } from './toolbar.js';
import { defaultOptions } from './defaultOptions.js';

export class Editor {
  constructor(options = defaultOptions) {
    const {
      editorElementSelector,
      charactersCounterSelector,
      maxLength,
      errorClass,
      clearButtonSelector,
      editorID,
      placeholder,
    } = options;

    this.editorElementSelector = editorElementSelector;

    this.$editorElement = document.querySelector(editorElementSelector);
    this.$clearButton = document.querySelector(clearButtonSelector);
    this.$charactersCounter =
      this.$editorElement.parentNode.querySelector(charactersCounterSelector);

    this.maxLength = maxLength;
    this.errorClass = errorClass;
    this.initializeEditor(editorID, placeholder);
    this.attachEventListeners();
  }

  initializeEditor = (id, placeholder) => {
    this.editor = new Quill(id, {
      modules: { toolbar: toolbarOptions },
      theme: 'snow',
      placeholder,
    });
  };

  attachEventListeners = () => {
    this.editor.on('text-change', this.handleTextChange);
    this.$clearButton?.addEventListener('click', this.clearForm);
  };

  handleTextChange = (delta, oldDelta, source) => {
    this.updateCharacterCount();

    if (source === 'user') {
      this.handleUserTextChange();
    }
  };

  updateCharacterCount = () => {
    const remainingCharacters = this.maxLength - this.editor.getLength();
    this.$charactersCounter.innerHTML = remainingCharacters + 1;
  };

  handleUserTextChange = () => {
    const length = this.editor.getLength();
    length > this.maxLength ? this.handleTextOverflow(length) : this.resetErrorState();
  };

  handleTextOverflow = (length) => {
    this.editor.deleteText(this.maxLength, length - this.maxLength);
    this.$editorElement.classList.add(this.errorClass);
  };

  resetErrorState = () => {
    this.$editorElement.classList.remove(this.errorClass);
  };

  clearForm = () => {
    this.editor.setText('');
    this.editor.removeFormat(0, this.editor.getLength());
    this.$charactersCounter.innerHTML = this.maxLength;
  };
}
