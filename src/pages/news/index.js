/* eslint-disable no-undef */
import '../../vendor/normalize.css';
import './index.css';
import { parm } from '../../js/constants/parm';
import CardRender from '../../js/components/card-render';
import Api from '../../js/api/api';
import Header from '../../js/components/header';

const savedArticlesLink = document.querySelector('.menu__item_stored-articles');

const logoutIcon = document.querySelector('.menu__logout-icon');
const authorisationLink = document.querySelector('.menu__link-auth');
const container = document.querySelector('.results__continer');

const headerCallback = new Header(savedArticlesLink, logoutIcon, authorisationLink);
const callback = new CardRender(container);
const api = new Api(parm.apiBackUrl, headerCallback, callback);

callback.renderName();
api.getAllArticles();

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('card__bookmark_trash')) {
    const id = e.target.closest('.card').getAttribute('id');
    api.deleteArticle(id);
  }
});

function loginStatus() {
  try {
    return JSON.parse(window.localStorage.getItem('isLogedIn'));
  } catch (err) {
    throw new Error(err.message);
  }
}

if (loginStatus() !== true) {
  window.location.href = '../';
}


// Logout
function logout() {
  api.logout();
}

api.getUser();
logoutIcon.addEventListener('click', logout);
