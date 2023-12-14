import { AdminFileUploader } from '../admin-upload-files.js';

export class AdminCaveatFiles extends AdminFileUploader {
  constructor() {
    super();

    this.fileCounter = document.querySelector('[data-caveat-counter="file"]');
    this.fileObserver.subscribe(this.onFileUpload.bind(this));
  }

  onFileUpload(file) {
    this.fileCounter.innerHTML = +this.fileCounter.innerHTML + 1;
  }
}
