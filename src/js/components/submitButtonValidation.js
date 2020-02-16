/* eslint-disable no-underscore-dangle */
// const signinForm = document.getElementById('input-mail');
// const signupForm = document.forms.signup;
// const submitButton = document.querySelector('popup__button');

// export default function submitButtonValidity() {
//   if (!signinForm.checkValidity()) {
//     submitButton.setAttribute('disabled', true);
//   } else (submitButton.removeAttribute('disabled'));
// }

export default class FormValidation {
  constructor(form, submitButton) {
    this.form = form;
    this.submitButton = submitButton;
  }

  validate() {
    console.log(this.form[0].value);
    console.log('vaslidity');
  }
    // if (!this.form[0].validity.valid && !this.form[1].validity.valid) {
    //   this._buttonDisable();
    // } this._buttonEnable();


  _buttonDisable() {
    this.submitButton.setAttribute('disabled', true);
    this.submitButton.classList.remove('popup__button_enebled', true);
  }

  _buttonEnable() {
    this.submitButton.removeAttribute('disabled', true);
    this.submitButton.classList.add('popup__button_enebled', true);
  }
}
