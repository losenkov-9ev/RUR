import { checkPage } from '../utils/checkPage.js';

if (checkPage('admin-page')) {
  (async function () {
    try {
      const _module = await import('../../admin/js/admin-main.js');
      const initModuleFn = _module.init;

      initModuleFn();
    } catch (error) {
      console.error('Ошибка при загрузке модуля:', error);
    }
  })();
}
