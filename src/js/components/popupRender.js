// Вставляет и удаляет разметку форм в DOM

export default class PopupRender {
  constructor(container) {
    this.container = container;
  }

  render(markup) {
    this.markup = markup;
    const html = `${this.markup}`;
    return this.container.insertAdjacentHTML('beforeend', html);
  }

  // eslint-disable-next-line class-methods-use-this
  remove(element) {
    // eslint-disable-next-line prefer-arrow-callback
    element.addEventListener('click', function (e) {
      if (e.target.classList.contains('popup__close')) {
        element.removeChild(element.firstChild);
      }
    });
  }
}
