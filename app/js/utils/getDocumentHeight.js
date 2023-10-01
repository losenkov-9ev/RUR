const doc = document.documentElement;
export const getDocumentHeight = () => {
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
};
