import { checkPage } from '../utils/checkPage.js';

if (checkPage('university-page')) {
  (async function () {
    try {
      const _module = await import('../university/university.js');
      const initModuleFn = _module.init;

      initModuleFn();
    } catch (error) {
      console.error('Ошибка при загрузке модуля:', error);
    }
  })();
}
