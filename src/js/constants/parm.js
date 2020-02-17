const parm = {
  url: 'https://api.news2explorer.tk',
  signin: 'https://news2explorer.tk/signin',
  logout: 'https://news2explorer.tk/logout',
  signup: 'https://news2explorer.tk/signup',
  getUser: 'https://news2explorer.tk/users/me',
  articles: 'https://news2explorer.tk/article',
  git: 'https://api.github.com/repos/VBulanyi/news-explorer-frontend/commits',
  apiUrl: 'https://newsapi.org/v2/everything?sortBy=popularity&apiKey=d5db312b866b40439eb2b70875053a9d&language=ru&pageSize=100',
  maxGitCommits: 15,
  apiBackUrl: 'https://api.news2explorer.tk/',
};

const cardMarkup = `            <div class="card">
<div class="card__image">
  <div class="card__backgronud"><span
      class="card__bookmark-notification card__bookmark-notification_about">Природа</span></div>
  <div class="card__bookmark card__bookmark_trash"></div>

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

export default { parm, cardMarkup };
