/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import Card from './card';

const results = document.querySelector('.results');

export default class CardRender {
  constructor(container) {
    this.container = container;
  }

  clearContainer() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    results.style.display = 'none';
  }

  renderMore() {
    const arr = window.localStorage.getItem('array');
    this.render(JSON.parse(arr));
  }

  renderSavedArticles(arr) {
    let html = '';
    for (let i = 0; i < arr.length; i += 1) {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line no-underscore-dangle
      const card = new Card(arr[i].date, arr[i].image, arr[i].keyword, arr[i].link, arr[i].source, arr[i].title, arr[i].text, arr[i]._id);
      html += card.render();
      this._renderSubtitle(arr);
    }


    return this.container.insertAdjacentHTML('beforeend', html);
  }

  _renderSubtitle(arr) {
    const name = document.querySelector('.header__title-name');
    const count = document.querySelector('.header__title-count');
    const key = document.querySelector('.header__description-key');
    const otherCount = document.querySelector('.header__description-count');
    const keyWordList = arr.map(function (keyword) {
      return keyword.keyword;
    });
    const uniqueKeyWordList = keyWordList.filter(function (elem, pos) {
      return keyWordList.indexOf(elem) === pos;
    });
    const userName = window.localStorage.getItem('userName');
    name.textContent = JSON.parse(userName);
    count.textContent = keyWordList.length;
    if (uniqueKeyWordList.length > 2) {
      key.textContent = `${uniqueKeyWordList[0]}, ${uniqueKeyWordList[1]}`;
      otherCount.textContent = `и ${uniqueKeyWordList.length - 2} другим`;}
    if (uniqueKeyWordList.length > 1 && uniqueKeyWordList.length < 2) {
      key.textContent = `${uniqueKeyWordList[0]}, ${uniqueKeyWordList[1]}`;
    } else (key.textContent = `${uniqueKeyWordList[0]}`);
  }

  _checkIsLiked(arr) {
    const isLiked = JSON.parse(window.localStorage.getItem('isLiked')).data;
    for (let i = 0; i < arr.length; i += 1) {
      for (let j = 0; j < isLiked.length; j += 1) {
        if (arr[i] === isLiked[j]) {
          // eslint-disable-next-line no-param-reassign
          arr[i].liked = 'card__bookmark_marked';
        }
      }
    }
  }

  render(array) {
    this.array = array;
    let html = '';
    window.localStorage.setItem('searchResults', JSON.stringify(this.array));
    const arr = this.array.splice(0, 3);
    window.localStorage.setItem('array', JSON.stringify(this.array));

    this._checkIsLiked(array);

    for (let i = 0; i < arr.length; i += 1) {
      const card = new Card(arr[i].date, arr[i].image, arr[i].keyword, arr[i].link, arr[i].source, arr[i].title, arr[i].text, arr[i].liked);
      html += card.create();
    }
    return this.container.insertAdjacentHTML('beforeend', html);
  }
}
