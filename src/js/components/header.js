export default class Header {
  constructor(savedArticlesLink, logoutIcon, authorisationLink) {
    this.savedArticlesLink = savedArticlesLink;
    this.logoutIcon = logoutIcon;
    this.authorisationLink = authorisationLink;
  }

  async nameSet(name) {
    this.authorisationLink.textContent = name;
    this.logoutIcon.style.display = 'block';
    this.savedArticlesLink.classList.remove('menu__column-link_hidden', true);
  }

  async nameRemove(name) {
    this.authorisationLink.textContent = name;
    this.logoutIcon.style.display = 'none';
    this.savedArticlesLink.classList.add('menu__column-link_hidden', true);
  }
}
