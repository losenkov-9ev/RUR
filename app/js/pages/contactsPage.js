import { checkPage } from '../utils/checkPage.js';
import { validateContactsForm } from '../utils/validation.js';

if (checkPage('contacts-page')) {
  validateContactsForm();
}
