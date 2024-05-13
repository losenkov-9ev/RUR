import { Editor } from './editor.js';

export class ProfilesEditor extends Editor {
  constructor(options) {
    super(options);
    this.init();
  }

  init() {
    this.$editorElement.addEventListener('click', (e) => {
      this.$editorElement.classList.remove('unfocused');
    });
  }
}
