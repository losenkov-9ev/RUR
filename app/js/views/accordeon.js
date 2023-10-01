export const accordeon = (e) => {
  if (e.target.closest('.methodologyAccordeon__head')) {
    const $wrapper = e.target.closest('.methodologyAccordeon__item');
    const $body = $wrapper.querySelector('.methodologyAccordeon__body');

    $wrapper.classList.toggle('opened');
    $body.style.maxHeight = $wrapper.classList.contains('opened') ? $body.scrollHeight + 'px' : 0;
  }
};
