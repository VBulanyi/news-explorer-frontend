// Принимает и созвращает разметку форм

export default class Popup {
  constructor(markup) {
    this.markup = markup;
  }

  signup() {
    return `${this.markup}`;
  }
}
