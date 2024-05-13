export const toolbarOptions = [
  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ script: 'super' }, { script: 'sub' }], // superscript/subscript
  ['code-block', 'blockquote'],
  [{ direction: 'rtl' }], // text direction
  // [{ align: [] }],
];
