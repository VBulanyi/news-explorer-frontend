import '../../vendor/normalize.css';
import './index.css';
import parm from '../../js/constants/parm';
import CardRender from '../../js/components/card-render';
import Api from '../../js/api/api';
import Header from '../../js/components/header';

const savedArticlesLink = document.getElementById('.stored-articles');
const logoutIcon = document.querySelector('.menu__logout-icon');
const authorisationLink = document.querySelector('.menu__link-auth');
const container = document.querySelector('.results__continer');


const headerCallback = new Header(savedArticlesLink, logoutIcon, authorisationLink);
const callback = new CardRender(container);
const api = new Api(parm.parm.apiBackUrl, headerCallback, callback);

api.getAllArticles();

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('card__bookmark_trash')) {
    const id = e.target.closest('.card').getAttribute('id');
    api.deleteArticle(id);
  }
});


// Logout
function logout() {
  api.logout();
}

api.getUser();
logoutIcon.addEventListener('click', logout);
