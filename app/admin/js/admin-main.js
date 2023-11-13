import { customInput } from './utils/custom-input.js';
import { checkPage } from '../../js/utils/checkPage.js';

export const init = () => {
  if (checkPage('admin-login')) {
    customInput();

    document.addEventListener('click', handleClick);

    function handleClick(e) {
      const loginWrapper = e.target.closest('[data-login="wrapper"]');
      const forgotButton = e.target.closest('[data-login="forgot"]');
      const backButton = e.target.closest('[data-login="back"]');
      const loginButton = e.target.closest('[data-login="button"]');

      if (loginButton) {
        handleLoginError(loginWrapper);
      }

      const mainForm = loginWrapper.querySelector('[data-login="main"]');
      const recoveryForm = loginWrapper.querySelector('[data-login="recovery"]');

      if (forgotButton && loginWrapper) {
        e.preventDefault();
        fadeOutAndSwitch(mainForm, recoveryForm);
      } else if (backButton && loginWrapper) {
        e.preventDefault();
        fadeOutAndSwitch(recoveryForm, mainForm);
      }
    }

    function handleLoginError(wrapper) {
      const inputs = wrapper.querySelectorAll('[data-input="custom"]');
      inputs.forEach((input) => input.classList.add('loginDefaultInput-error'));
    }

    function fadeOutAndSwitch(outElement, inElement) {
      outElement.style.opacity = 0;
      setTimeout(() => {
        outElement.style.display = 'none';
        inElement.style.display = 'block';
        setTimeout(() => {
          inElement.style.opacity = 1;
        }, 40);
      }, 300);
    }
  }
};
