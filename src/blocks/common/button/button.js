const button = document.querySelector('.button');

function buttonDisable() {
  button.setAttribute('disabled', true);
  button.classList.remove('popup__button_enebled');
}

function buttonEnable() {
  button.removeAttribute('disabled');
  button.classList.add('popup__button_enebled');
}

export { buttonDisable, buttonEnable };
