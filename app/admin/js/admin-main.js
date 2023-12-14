import { checkPage } from '../../js/utils/checkPage.js';
import { Popover } from '../../js/views/popover.js';

import { adminLoginInit } from './admin-login.js';
import { adminInput } from './views/admin-input.js';
import { AdminMaterials } from './views/admin-materials.js';
import { adminTableFilter } from './views/admin-table-filter.js';
import { AdminFileUploader } from './views/admin-upload-files.js';
import { AdminCaveatFiles } from './views/adminCaveat/AdminCaveatFiles.js';
import { AdminRankingAccordion } from './views/adminRanking/admin-ranking-accordion.js';
import { AdminRankingBar } from './views/adminRanking/admin-ranking-bar.js';
import { editor } from './views/editor/editor.js';

import MicroModal from 'micromodal';

export const init = () => {
  const adminPopover = new Popover({
    $mainArray: document.querySelectorAll('.dataInput__info'),
    dropdownSelector: '.dataInput__info-popover',
  });

  if (checkPage('admin-login')) {
    adminLoginInit();
  }

  if (checkPage('admin-profiles-data')) {
    new AdminMaterials();
  }

  if (checkPage('admin-profiles-data-abbreviated')) {
    new AdminFileUploader();
  }

  if (checkPage('admin-profiles-page')) {
    document.querySelector('.profilesDataGeo__add').addEventListener('click', (e) => {
      const $box = e.target.closest('.profilesDataGeo').querySelector('.profilesDataGeo__box');
      $box.insertAdjacentHTML('afterend', $box.outerHTML);

      adminPopover.update('.dataInput__info');
    });
  }

  if (checkPage('admin-ranking-data')) {
    new AdminRankingAccordion();
    new AdminRankingBar();
  }

  if (checkPage('admin-contact-page')) {
    document.querySelector('.profilesDataGeo__add').addEventListener('click', (e) => {
      const $box = document.querySelector('.contactRecipient');
      $box.closest('.add-items-wrapper').insertAdjacentHTML('beforeend', $box.outerHTML);

      adminPopover.update('.dataInput__info');
    });
    document.addEventListener('click', (e) => {
      const $target = e.target.closest('[data-contact-recipient="delete"]');
      const itemsCount = document.querySelectorAll('.contactRecipient').length;

      $target && itemsCount > 1 && $target.closest('.contactRecipient').remove();
    });
  }

  if (checkPage('admin-caveat-page')) {
    editor();
    new AdminCaveatFiles();
  }

  if (checkPage('admin-export-page')) {
    try {
      MicroModal.init({
        awaitCloseAnimation: true,
      });
    } catch (e) {
      console.log('micromodal error: ', e);
    }
  }

  if (checkPage('admin-help-page')) {
    new AdminRankingAccordion();
    const adminTableHelpPopover = new Popover({
      $mainArray: document.querySelectorAll(
        '.rankingDataTable__head-item.adminHelpTable__row-item--area',
      ),
      dropdownSelector: '.adminHelpTable__popover',
      display: 'block',
      onClick: true,
    });

    adminTableFilter();
  }

  adminInput();
};
