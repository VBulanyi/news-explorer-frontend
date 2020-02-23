/* eslint-disable arrow-parens */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import PopupRender from '../components/popupRender';
import { success } from '../constants/consts';

export default class Api {
  constructor(url, headerCallback, callback) {
    this.url = url;
    this.headerCallback = headerCallback;
    this.callback = callback;
  }

  async signin(email, password) {
    this.email = email;
    this.password = password;

    return fetch(`${this.url}signin/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        email: `${this.email}`,
        password: `${this.password}`,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((result) => {
        this.headerCallback.nameSet(result.name);
        return result;
      })
      .then((result) => {
        try {
          window.localStorage.setItem('userName', JSON.stringify(result.name));
          window.localStorage.setItem('isLogedIn', JSON.stringify(result.isLogedIn));
        } catch (err) {
          throw new Error(err.message);
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  async signup(email, password, name) {
    this.email = email;
    this.password = password;
    this.name = name;

    return fetch(`${this.url}signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        email: `${this.email}`,
        password: `${this.password}`,
        name: `${this.name}`,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((arr) => {
        const container = document.querySelector('.popup-form');
        const popupRender = new PopupRender(container);
        popupRender.render(success());
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  async logout() {
    return fetch(`${this.url}logout/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка выхода: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        this.getUser();
        return res;
      })
      .then((res) => {
        this.headerCallback.nameRemove('Авторизоваться');
        return res;
      })
      .then((res) => {
        try {
          window.localStorage.setItem('isLogedIn', JSON.stringify(res.isLogedIn));
        } catch (err) {
          throw new Error(err.message);
        }
        return res;
      })
      .then((res) => {
        location.href='../';
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  async getUser() {
    return fetch(`${this.url}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((res) => {
        const { name } = res.data[0];
        this.headerCallback.nameSet(name);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  async saveArticle(data) {
    return fetch(`${this.url}articles/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка сохранения карточки ${res.status}`);
        return res.json();
      })
      .then((res) => {
        const arr = JSON.parse(window.localStorage.getItem('searchResults'));
        arr.push(res.data);
        window.localStorage.setItem('isLiked', JSON.stringify(arr));
        return res;
      })
      .then((res) => res._id)
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  async getAllArticles() {
    return fetch(`${this.url}articles/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) {
          window.localStorage.setItem('isLiked', JSON.stringify(''));
          throw new Error(`Ошибка чтения карточек ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        try {
          window.localStorage.setItem('isLiked', JSON.stringify(data.data));
        } catch (err) { throw new Error(err.message); }
        return data;
      })
      // .then((data) => {
      //   const render = this.callback;
      //   if (!data.length > 0) {
      //     console.log('нет сохранённых карточек');
      //   } else {
      //     render.renderSavedArticles(data.data);
      //   }
      // })
      .then((data) => {
        const render = this.callback;
        render.renderSavedArticles(data.data);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  async deleteArticle(id) {
    return fetch(`${this.url}articles/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка удаления карточки ${res.status}`);
        return res.json();
      })
      .then((res) => {
        document.getElementById(res._id).remove();
        return res;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  async checkLiked() {
    return fetch(`${this.url}articles/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) {
          window.localStorage.setItem('isLiked', JSON.stringify(''));
          throw new Error(`Ошибка чтения карточек ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.data);
        try {
          window.localStorage.setItem('isLiked', JSON.stringify(data.data));
        } catch (err) { throw new Error(err.message); }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
