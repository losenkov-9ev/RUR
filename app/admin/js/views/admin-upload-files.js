import { Observer } from '../../../js/utils/Observer.js';

export class AdminFileUploader {
  constructor() {
    document.addEventListener('click', this.uploadFiles);
    this.fileObserver = new Observer();
    this.initDragAndDrop();
  }

  readImageFile = (file, callback) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageURL = e.target.result;
      callback({
        fileName: file.name,
        imageURL,
      });
    };

    reader.readAsDataURL(file);
  };

  handleFileUpload = ($input, callback, file) => {
    if (file) {
      this.readImageFile(file, callback);
    } else {
      this.handleFileNotSelected();
      callback(null);
    }
  };

  getFile = ($input) => {
    return $input.files[0];
  };

  handleFileNotSelected = () => {
    const FILE_NOT_SELECTED_MESSAGE = 'Файл не выбран.';
    console.log(FILE_NOT_SELECTED_MESSAGE);
  };

  updateUI = ($target, fileData) => {
    const $label = $target.querySelector('label');
    const $image = $target.querySelector('img');

    if (!$label.initialText) {
      $label.initialText = $label.textContent;
    }

    $label.textContent = fileData.fileName;
    $target.querySelector('.dataUpload__field').classList.add('uploaded');
    $image.src = fileData.imageURL;
  };

  handleDeleteClick = (e) => {
    const $target = e.target.closest('.dataUpload');
    this.deleteImage($target);
  };

  deleteImage = ($target) => {
    const $image = $target.querySelector('img');
    const $label = $target.querySelector('label');

    // Восстанавливаем начальное значение лейбла
    $label.textContent = $label.initialText || '';
    delete $label.initialText;

    $target.querySelector('.dataUpload__field').classList.remove('uploaded');
    setTimeout(() => {
      $image.src = ''; // Очищаем изображение
    }, 300);
  };

  handleFileChange = (event) => {
    const $input = event.target;
    const $target = $input.closest('.dataUpload');

    if ($input.closest('.dataUpload').dataset.uploadType !== 'doc') {
      this.handleFileUpload(
        $input,
        (fileData) => {
          if (fileData) {
            this.updateUI($target, fileData);
            $input.removeEventListener('change', this.handleFileChange);
          }
        },
        this.getFile($input),
      );
    } else {
      this.fileObserver.notify({
        $input,
        file: this.getFile($input),
      });
    }
  };

  uploadFiles = (e) => {
    const $target = e.target.closest('.dataUpload:not([data-type="file"])');

    if ($target && !$target.querySelector('.dataUpload__field.uploaded')) {
      const $input = $target.querySelector('input');
      $input.click();

      $input.addEventListener('change', this.handleFileChange);
    } else if ($target) {
      this.deleteImage($target);
    }
  };

  initDragAndDrop() {
    document.addEventListener('dragenter', this.handleDragEnter, false);
    document.addEventListener('dragover', this.handleDragOver, false);
    document.addEventListener('dragleave', this.handleDragLeave, false);
    document.addEventListener('drop', this.handleDrop.bind(this), false);
  }

  handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.highlight(e.target.closest('.dataUpload__field'));
  };

  handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.unhighlight(e.target.closest('.dataUpload__field'));
  };

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    this.unhighlightAll();

    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
      const $target = e.target.closest('.dataUpload');
      const $input = $target.querySelector('input');

      if ($input.closest('.dataUpload').dataset.uploadType !== 'doc') {
        this.handleFileUpload(
          $input,
          (fileData) => {
            if (fileData) {
              this.updateUI($target, fileData);
              $input.removeEventListener('change', this.handleFileChange);
            }
          },
          files[0],
        );
      } else {
        this.fileObserver.notify({
          $input,
          file: files[0],
        });
      }
    }
  }

  highlight($target) {
    if ($target) {
      $target.classList.add('highlight');
    }
  }

  unhighlight($target) {
    if ($target) {
      $target.classList.remove('highlight');
    }
  }

  unhighlightAll() {
    const dropAreas = document.querySelectorAll('.dataUpload__field');
    dropAreas.forEach((area) => area.classList.remove('highlight'));
  }
}
