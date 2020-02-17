/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import './index.css';
import { signup, signin } from './js/constants/consts';
import PopupRender from './js/components/popupRender';
import Api from './js/api/api';
import ApiNews from './js/api/apiNews';
import Header from './js/components/header';
import parm from './js/constants/parm';
import CardRender from './js/components/card-render';

const popupForm = document.querySelector('.popup-form');
const resultsContiner = document.querySelector('.results__continer');
const container = document.querySelector('.popup-form');
const searchInput = document.getElementById('searchInput');
const error = document.querySelector('.popup__err');
const searchButton = document.querySelector('.header-search__button');
const authorisationLink = document.querySelector('.menu__link-auth');
const searchForm = document.forms.search;
const savedArticlesLink = document.getElementById('stored-articles');
const logoutIcon = document.querySelector('.menu__logout-icon');
const mobileMenuIcon = document.querySelector('.menu__mobile');
const popupRender = new PopupRender(container);
const headerCallback = new Header(savedArticlesLink, logoutIcon, authorisationLink);
const api = new Api(parm.parm.apiBackUrl, headerCallback);

function popupClose(e) {
  if (
    e.target.classList.contains('popup__close')
  ) {
    e.target.closest('.popup-form').removeChild(e.target.closest('.popup-form').children[0]);
  }
}
// Получение данных из формы входа
function signInData(e) {
  e.preventDefault();
  const form = e.target.closest('form');
  api.signin(form.elements[0].value, form.elements[1].value);
  form.reset();
  e.target.closest('.popup-form').removeChild(e.target.closest('.popup-form').children[0]);
}

// Logout
function logout() {
  api.logout();
}

// Получение данных из формы регистрации
function signUpData(e) {
  e.preventDefault();
  const form = e.target.closest('form');
  api.signup(form.elements[0].value, form.elements[1].value, form.elements[2].value);
  form.reset();
  e.target.closest('.popup-form').removeChild(e.target.closest('.popup-form').children[0]);
}

// Активация кнопки submit в формах входа и регистрации
function signInValidation() {
  const form = document.forms.signin;
  const signinSubmit = document.getElementById('signin');
  const signIpSubmitButton = document.getElementById('signin-submit');
  signinSubmit.addEventListener('input', () => {
    if (!form.elements[0].validity.valid || !form.elements[1].validity.valid) {
      signIpSubmitButton.setAttribute('disabled', true);
    } else (signIpSubmitButton.removeAttribute('disabled', true));
  });
}

function signUpValidation() {
  const form = document.forms.signup;
  const signupSubmit = document.getElementById('signup');
  const signUpSubmitButton = document.getElementById('signup-submit');
  signupSubmit.addEventListener('input', () => {
    // eslint-disable-next-line max-len
    if (!form.elements[0].validity.valid || !form.elements[1].validity.valid || !form.elements[2].validity.valid) {
      signUpSubmitButton.setAttribute('disabled', true);
    } else (signUpSubmitButton.removeAttribute('disabled', true));
  });
}

// Смена форм Входа и регистрации
function formsCall(e) {
  if (e.target.classList.contains('popup_callReg')) {
    e.target.closest('.popup-form').removeChild(e.target.closest('.popup-form').children[0]);
    popupRender.render(signup());
    const signupSubmit = document.getElementById('signup');
    signUpValidation();
    signupSubmit.addEventListener('submit', signUpData);
  }
  if (e.target.classList.contains('popup__callSignin')) {
    e.target.closest('.popup-form').removeChild(e.target.closest('.popup-form').children[0]);
    popupRender.render(signin());
    const signinSubmit = document.getElementById('signin');
    signInValidation();
    signinSubmit.addEventListener('submit', signInData);
  }
}


// Сохранение у удаление статьи в избранных
document.addEventListener('click', (e) => {
  const link = e.target.closest('.card').querySelector('.card__link').getAttribute('href');
  if (e.target.classList.contains('card__bookmark_marked')) {
    e.target.classList.remove('card__bookmark_marked');
    const savedArticles = JSON.parse(window.localStorage.getItem('isLiked')).data;
    for (let i = 0; i < savedArticles.length; i += 1) {
      if (savedArticles[i].link === link) {
        const id = savedArticles[i]._id;
        console.log(id);
        api.deleteArticle(id);
        break;
      }
    }
  } else if (e.target.classList.contains('card__bookmark_like') && !e.target.classList.contains('card__bookmark_marked')) {
    const arr = JSON.parse(window.localStorage.getItem('searchResults'));
    const res = arr.find((card) => card.link === link);
    e.target.classList.add('card__bookmark_marked');
    api.saveArticle(res);
    api.getAllArticles();
  }
});


// Отправка заброса к серверу NEWS API и отрисовка карточек
function print(e) {
  e.preventDefault();
  const req = searchForm.elements.query.value;
  const apiNewsCallback = new CardRender(resultsContiner);
  apiNewsCallback.clearContainer();
  const search = new ApiNews(parm.parm.apiUrl, apiNewsCallback);
  api.getAllArticles();
  search.getNews(req);
  searchForm.reset();
  searchButton.setAttribute('disabled', true);
}

searchInput.addEventListener('input', () => {
  if (!searchInput.validity.valid) {
    error.setAttribute('style', 'display : block;');
    searchButton.setAttribute('disabled', true);
  }
  if (searchInput.validity.valid) {
    error.setAttribute('style', 'display : none;');
    searchButton.removeAttribute('disabled', true);
  }
});

searchForm.addEventListener('submit', print);

// Открытие формы регистрации
authorisationLink.addEventListener('click', () => {
  popupRender.render(signin());
  const signinSubmit = document.getElementById('signin');
  signInValidation();
  signinSubmit.addEventListener('submit', signInData);
});

// Закрытие попапа с формой
popupForm.addEventListener('click', popupClose);
logoutIcon.addEventListener('click', logout);
popupForm.addEventListener('click', formsCall);

// Раскрытие меню на мобильном устройстве

mobileMenuIcon.addEventListener('click', () => {

});

api.getUser();
