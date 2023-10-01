import JustValidate from 'just-validate';

export const validateParticipationForm = () => {
  const $form = document.querySelector('[data-form-participation]');
  const validate = new JustValidate($form);

  validate
    .addField('[data-input="university"]', [
      {
        rule: 'required',
        errorMessage: 'Input university official full name in English',
      },
      {
        rule: 'minLength',
        value: 10,
        errorMessage: 'min length must be at least 10 characters',
      },
    ])
    .addField('[data-input="name"]', [
      {
        rule: 'required',
        errorMessage: 'Input name and surname of contact person',
      },
      {
        rule: 'minLength',
        value: 4,
        errorMessage: 'min length must be at least 4 characters',
      },
    ])
    .addField('[data-input="email"]', [
      {
        rule: 'required',
        errorMessage: 'Input e-mail of contact person',
      },
      {
        rule: 'email',
      },
    ])
    .addField('[data-input="phone"]', [
      {
        rule: 'required',
        errorMessage: 'Input phone number of contact person',
      },
      {
        rule: 'number',
      },
      {
        rule: 'minLength',
        value: 6,
        errorMessage: 'min length must be at least 6 characters',
      },
    ]);

  validate.onSuccess(() => {
    alert('success');
  });
};
export const validateContactsForm = () => {
  const $form = document.querySelector('[data-form-contacts]');
  const validate = new JustValidate($form);

  validate
    .addField('[data-input="name"]', [
      {
        rule: 'required',
        errorMessage: 'Input name and surname of contact person',
      },
      {
        rule: 'minLength',
        value: 4,
        errorMessage: 'min length must be at least 4 characters',
      },
    ])
    .addField('[data-input="email"]', [
      {
        rule: 'required',
        errorMessage: 'Input e-mail of contact person',
      },
      {
        rule: 'email',
      },
    ])
    .addField('[data-input="phone"]', [
      {
        rule: 'required',
        errorMessage: 'Input phone number of contact person',
      },
      {
        rule: 'number',
      },
      {
        rule: 'minLength',
        value: 6,
        errorMessage: 'min length must be at least 6 characters',
      },
    ])
    .addField('[data-input="message"]', [
      {
        rule: 'required',
        errorMessage: 'Input your message',
      },
      {
        rule: 'minLength',
        value: 10,
        errorMessage: 'min length must be at least 10 characters',
      },
    ]);

  validate.onSuccess(() => {
    alert('success');
  });
};
