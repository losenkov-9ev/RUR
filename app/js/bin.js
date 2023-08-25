// mobile header

const $burger = document.querySelector('.header__top-burger');
const $headerMobile = document.querySelector('.header__mobile');

$burger.addEventListener('click', (e) => {
  $burger.classList.toggle('active');
  $headerMobile.classList.toggle('active');

  document.body.classList.toggle('modal-opened');

  setTimeout(() => {
    stickyHeader(false);
    mobileHeaderShadow();
  }, 20);
});
$headerMobile.addEventListener('click', (e) => {
  if (e.target.closest('.header__mobile-link')) {
    $burger.classList.remove('active');
    $headerMobile.classList.remove('active');

    document.body.classList.remove('modal-opened');

    setTimeout(() => mobileHeaderShadow(), 20);
  }
});

function mobileHeaderShadow() {
  $burger.classList.contains('active')
    ? $header.classList.remove('scrolled')
    : $header.classList.add('scrolled');
}
