export default class Card {
  constructor(id, date, image, keyword, link, source, title, text, liked) {
    this.id = id;
    this.date = date;
    this.image = image;
    this.keyword = keyword;
    this.link = link;
    this.source = source;
    this.title = title;
    this.text = text;
    this.liked = liked;
  }

  create() {
    return `<div class="card">
  <div class="card__image">
    <div class="card__backgronud"  style="background-image: url('${this.image}')"></div>
    <div class="card__bookmark card__bookmark_like ${this.liked}"></div>

    <span class="card__bookmark-notification card__bookmark-notification_loged-in">Войдите, что бы сохранять статьи</span>
  </div>
  <div class="card__content">
    <span class="card__date">${this.date}</span>
    <a class="card__link" href="${this.link}" target="_blank"><h3 class="card__title">${this.title}</h3></a>
    <p class="card__text">${this.text}</p>
    <span class="card__source">${this.source}</span>
  </div>
</div>`;
  }

  render() {
    return `<div class="card" id="${this.id}">
    <div class="card__image">
      <div class="card__backgronud"  style="background-image: url('${this.image}')"><span
          class="card__bookmark-notification card__bookmark-notification_about">${this.keyword}</span></div>
      <div class="card__bookmark card__bookmark_trash"></div>

      <span class="card__bookmark-notification card__bookmark-notification_loged-in">Убрать из
        сохранённых</span>
    </div>
    <div class="card__content">
      <span class="card__date">${this.date}</span>
      <a href="${this.link}" target="_blank"><h3 class="card__title">${this.title}</h3></a>
      <p class="card__text">${this.text}</p>
      <span class="card__source">${this.source}</span>
    </div>
  </div>`;
  }
}
