/* eslint-disable prefer-arrow-callback */
/* eslint-disable quotes */
const preloader = document.querySelector('.preloader__wrapper_search');
const preloaderNotFound = document.querySelector('.preloader__wrapper_not-found');
const results = document.querySelector('.results');
const swowMoreButton = document.querySelector('.results__show-more');


export default class ApiNews {
  constructor(apiUrl, callback) {
    this.apiUrl = apiUrl;
    this.callback = callback;
  }

  async getNews(query) {
    const dateNow = new Date();
    const timeInMilSecInWeek = 7 * 24 * 3600 * 1000;
    const dateSearchFrom = new Date(dateNow - timeInMilSecInWeek);
    const dateFrom = `${dateSearchFrom.getFullYear()}-${dateSearchFrom.getMonth() + 1}-${dateSearchFrom.getDate()}`;
    const dateTo = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`;
    const url = `${this.apiUrl}&q=${query}&from=${dateFrom}&to=${dateTo}`;
    // eslint-disable-next-line no-undef
    return fetch(url)
      .then((res) => {
        preloader.style.display = "flex";
        preloaderNotFound.style.display = "none";
        if (!res.ok) throw new Error('Can not read news query');
        return res.json();
      })
      .then((sourse) => {
        const news = [];
        for (let i = 0; i < sourse.articles.length; i += 1) {
          news.push({
            date: new Date(Date.parse(sourse.articles[i].publishedAt)),
            image: sourse.articles[i].urlToImage,
            keyword: query,
            link: sourse.articles[i].url,
            source: sourse.articles[i].source.name,
            title: sourse.articles[i].title,
            text: sourse.articles[i].description,
          });
        }
        return news;
      })
      .then((news) => {
        if (news.length < 1) {
          preloader.style.display = "none";
          preloaderNotFound.style.display = "flex";
          const render = this.callback;
          render.clearContainer();
        }
        return news;
      })
      .then((news) => {
        if (news.length > 0) {
          preloader.style.display = "none";
          results.style.display = "block";
          const render = this.callback;
          render.render(news);
          swowMoreButton.addEventListener('click', function renderMoreListener() {
            render.renderMore();
          });
        }
        return news;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
