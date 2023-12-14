import { materialsEmpty } from '../templates/materialsEmpty.js';
import { materialsItem } from '../templates/materialsItem.js';

import { AdminFileUploader } from './admin-upload-files.js';

export class AdminMaterials extends AdminFileUploader {
  constructor() {
    super();

    this.$materialItems = document.querySelector('.universityMaterials__slide');
    this.setupEventListeners();
    this.fileObserver.subscribe(this.onFileUpload.bind(this));
  }

  setupEventListeners() {
    this.$materialItems.addEventListener('click', (e) => this.handleItemClick(e));
  }

  onFileUpload({ $input, file }) {
    if ($input.closest('.profilesDataMaterials')) {
      this.renderFile(file);
    }
  }

  renderFile(file) {
    const html = materialsItem(file.name);
    this.hasItems
      ? (this.$materialItems.innerHTML = html)
      : this.$materialItems.insertAdjacentHTML('beforeend', html);
  }

  handleItemClick(event) {
    const { target } = event;
    const $controlsItem = target.closest('.universityMaterials__item-controlsItem');

    if ($controlsItem && $controlsItem.dataset.materialControl === 'delete') {
      event.preventDefault();
      this.deleteMaterialItem($controlsItem);
    }
  }

  deleteMaterialItem($controlsItem) {
    const $materialItem = $controlsItem.closest('.universityMaterials__item');
    $materialItem.remove();

    this.hasItems && this.showEmptyFilesMessage();
  }

  get hasItems() {
    const materialItemsCount = this.$materialItems.querySelectorAll(
      '.universityMaterials__item',
    ).length;
    return materialItemsCount <= 0;
  }

  showEmptyFilesMessage() {
    this.$materialItems.innerHTML = materialsEmpty();
  }
}
