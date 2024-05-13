// Подключаем библиотеку html2pdf.js
import html2pdf from 'html2pdf.js';

// Создаем опции для генерации PDF
const opt = {
  margin: 1,
  filename: 'my-pdf-file.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: 'px', format: [1200, 3000], orientation: 'p' },
};

export const pdf = () => {
  const $saveButton = document.getElementById('universityAsideButtons-save');
  const $printButton = document.getElementById('universityAsideButtons-print');

  $saveButton.addEventListener('click', async (e) => {
    e.preventDefault();

    // Загружаем другую страницу
    const response = await fetch('../print-university-main.html');
    const html = await response.text();
    const parser = new DOMParser();

    const doc = parser.parseFromString(html, 'text/html');

    const $contentFromAnotherPage = doc.querySelector('body');

    html2pdf().from($contentFromAnotherPage).set(opt).save();
  });

  $printButton.addEventListener('click', (e) => {
    e.preventDefault();

    window.print();
  });
};
