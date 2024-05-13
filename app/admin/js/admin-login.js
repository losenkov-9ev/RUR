import { customInput } from './views/custom-input.js';

export const adminLoginInit = () => {
  customInput();

  document.addEventListener('click', handleClick);

  function handleClick(e) {
    const loginWrapper = e.target.closest('[data-login="wrapper"]');
    if (!loginWrapper) return;

    const { forgotButton, backButton, loginButton } = getButtons(e.target);
    const mainForm = loginWrapper.querySelector('[data-login="main"]');
    const recoveryForm = loginWrapper.querySelector('[data-login="recovery"]');

    if (loginButton) {
      // handleLoginError(loginWrapper);
    }

    if (forgotButton) {
      e.preventDefault();
      fadeOutAndSwitch(mainForm, recoveryForm).then(() => {
        // Дополнительные действия после завершения анимации
      });
    } else if (backButton) {
      e.preventDefault();
      fadeOutAndSwitch(recoveryForm, mainForm).then(() => {
        // Дополнительные действия после завершения анимации
      });
    }
  }

  function getButtons(target) {
    return {
      forgotButton: target.closest('[data-login="forgot"]'),
      backButton: target.closest('[data-login="back"]'),
      loginButton: target.closest('[data-login="button"]'),
    };
  }

  function handleLoginError(wrapper) {
    const inputs = wrapper.querySelectorAll('[data-input="custom"]');
    inputs.forEach((input) => input.classList.add('loginDefaultInput-error'));
  }

  function fadeOutAndSwitch(outElement, inElement) {
    const fadeOut = () => {
      return new Promise((resolve) => {
        outElement.style.opacity = 0;
        setTimeout(() => {
          outElement.style.display = 'none';
          resolve();
        }, 300);
      });
    };

    const fadeIn = () => {
      return new Promise((resolve) => {
        inElement.style.display = 'block';
        setTimeout(() => {
          inElement.style.opacity = 1;
          resolve();
        }, 40);
      });
    };

    return fadeOut().then(() => fadeIn());
  }
};
