/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import Card from './card';
import { loginStatus } from '../constants/parm';

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
    try {
      const arr = window.localStorage.getItem('array');
      this.render(JSON.parse(arr));
    } catch (err) {
      throw new Error(err.message);
    }
  }

  renderSavedArticles(arr) {
    let html = '';
    for (let i = 0; i < arr.length; i += 1) {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line no-underscore-dangle
      const card = new Card(arr[i]._id, arr[i].date, arr[i].image, arr[i].keyword, arr[i].link, arr[i].source, arr[i].title, arr[i].text);
      html += card.render();
      this.renderSubtitle(arr);
    }

    return this.container.insertAdjacentHTML('beforeend', html);
  }

  renderName() {
    const name = document.querySelector('.header__title-name');
    try {
      const userName = window.localStorage.getItem('userName');
      name.textContent = JSON.parse(userName);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  renderSubtitle(arr) {
    const count = document.querySelector('.header__title-count');
    const key = document.querySelector('.header__description-key');
    const otherCount = document.querySelector('.header__description-count');
    const keyWordList = arr.map(function (keyword) {
      return keyword.keyword;
    });
    const uniqueKeyWordList = keyWordList.filter(function (elem, pos) {
      return keyWordList.indexOf(elem) === pos;
    });
    this.renderName();
    count.textContent = keyWordList.length;
    key.textContent = `${uniqueKeyWordList[0]}, ${uniqueKeyWordList[1]}`;

    if (uniqueKeyWordList.length > 2) {
      key.textContent = `${uniqueKeyWordList[0]}, ${uniqueKeyWordList[1]}`;
      otherCount.textContent = `и ${uniqueKeyWordList.length - 2} другим`;
    } if (uniqueKeyWordList.length > 1 && uniqueKeyWordList.length < 2) {
      key.textContent = `${uniqueKeyWordList[0]}, ${uniqueKeyWordList[1]}`;
    } if (uniqueKeyWordList.length === 1) {
      key.textContent = `${uniqueKeyWordList[0]}`;
    }
    if (uniqueKeyWordList.length === 0) {
      key.textContent = `${''}`;
    }
  }

  // eslint-disable-next-line consistent-return
  _checkIsLiked(arr) {
    try {
      const isLiked = JSON.parse(window.localStorage.getItem('isLiked'));
      if (isLiked) {
        for (let i = 0; i < arr.length; i += 1) {
          for (let j = 0; j < isLiked.length; j += 1) {
            if (arr[i].link === isLiked[j].link) {
              // eslint-disable-next-line no-param-reassign
              arr[i].liked = 'card__bookmark_marked';
            }
          }
        } return arr;
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  render(array) {
    this.array = array;
    let html = '';
    try {
      window.localStorage.setItem('searchResults', JSON.stringify(this.array));
    } catch (err) {
      throw new Error(err.message);
    }
    const arr = this.array.splice(0, 3);
    try {
      window.localStorage.setItem('array', JSON.stringify(this.array));
    } catch (err) {
      throw new Error(err.message);
    }
    this._checkIsLiked(arr);
    for (let i = 0; i < arr.length; i += 1) {
      const card = new Card('', arr[i].date, arr[i].image, arr[i].keyword, arr[i].link, arr[i].source, arr[i].title, arr[i].text, arr[i].liked);
      if (loginStatus() === true) {
        html += card.logedIn();
      } else html += card.create();
    }
    return this.container.insertAdjacentHTML('beforeend', html);
  }
}
