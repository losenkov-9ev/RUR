import { checkPage } from '../utils/checkPage.js';
import { validateParticipationForm } from '../utils/validation.js';

if (checkPage('participation-form-page')) {
  validateParticipationForm();
}
