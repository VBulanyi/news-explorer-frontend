function signup() {
  return `<div class="popup popupReg">
  <div class="popup__content">
  <img src="./images/close.svg" alt="закрытие формы" class="popup__close">
    <h3 class="popup__title">Регистрация</h3>
    <form novalidate class="popup__form" id="signup" name="signup">
      <span class="popup__tip">Email</span>
      <input required type="email" name="name" class="popup__input popup__input_type_name"
        placeholder="Введите почту">
      <span class="popup__input-name-err popup__err" aria-live="polite">Неправильный формат
        email</span>
      <span class="popup__tip">Пароль</span>
      <input required type="password" minlength="8" name="pass"
        class="popup__input popup__input_type_link-url" placeholder="Введите пароль">
      <span class="popup__input-pass-err popup__err" aria-live="polite">Минимум 8 символов</span>
      <span class="popup__tip">Имя</span>
      <input required type="text" minlength="2" name="link" class="popup__input popup__input_type_link-url"
        placeholder="Введите имя">
      <span class="popup__input-pass-err popup__err" aria-live="polite">Минимум 2 символа</span>
      <button type="submit" disabled id="signup-submit" class="popup__button">Зарегистрироваться</button>
    </form>
    <div class="popup__reg">
    <span class="popup__reg-sp">или </span> <span class="popup__reg-link popup__callSignin">Войти</span></div>
  </div>
</div>`;
}

function signin() {
  return `<div class="popup popupAdd">
  <div class="popup__content">
  <img src="./images/close.svg" alt="закрытие формы" class="popup__close">
    <h3 class="popup__title">Вход</h3>
    <form novalidate class="popup__form" id="signin" name="signin">
      <span class="popup__tip">Email</span>
      <input required type="email" name="name" class="popup__input popup__input_type_name"
        placeholder="Введите почту">
      <span class="popup__input-name-err popup__err" aria-live="polite">Неправильный формат
        email</span>
      <span class="popup__tip">Пароль</span>
      <input required type="password" name="link" minlength="8"
        class="popup__input popup__input_type_link-url" placeholder="Введите пароль, минимум 8 символов">
      <span class="popup__err" aria-live="polite">Необходимо ввести пароль</span>
      <button type="submit" disabled id="signin-submit" class="popup__button">Войти</button>
    </form>
    <div class="popup__reg">
    <span class="popup__reg-sp">или </span> <span class="popup__reg-link popup_callReg" id="open-signin-form">Зарегистрироваться</span></div>
  </div>
</div>`;
}

function success() {
  return `<div class="popup popupSucceded">
  <div class="popup__content-succeeded">
    <img src="./images/close.svg" alt="закрытие формы" class="popup__close">
    <h3 class="popup__title">Пользователь успешно зарегистрирован!</h3>
    <div class="popup__reg">
    <span class="popup__reg-sp">или </span> <span class="popup__reg-link popup__callSignin" >Войти</span></div>
  </div>
</div>`;
}

function card() {
  return `            <div class="card">
  <div class="card__image">
    <div class="card__backgronud"><span
        class="card__bookmark-notification card__bookmark-notification_about">Природа</span></div>
    // <div class="card__bookmark card__bookmark_trash"></div>
    <div class="card__bookmark"></div>
    <span class="card__bookmark-notification card__bookmark-notification_loged-in">Убрать из
      сохранённых</span>
  </div>
  <div class="card__content">
    <span class="card__date">2 августа, 2019</span>
    <h3 class="card__title">Национальное достояние – парки</h3>
    <p class="card__text">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала
      складываться система национальных парков – охраняемых территорий, где и сегодня каждый может
      приобщиться к природе.</p>
    <span class="card__source">ЛЕНТА.РУ</span>
  </div>
</div>`;
}

export {
  signup, signin, success, card,
};
