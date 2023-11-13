export async function loadModule(path) {
  try {
    const _module = await import(path);
    const initModuleFn = _module.init;

    initModuleFn();
  } catch (error) {
    console.error('Ошибка при загрузке модуля:', error);
  }
}
