import Api from '../api/api';

export default class formData {
  constructor(url) {
    this.url = url;
  }

  async signInData(form, name, pass) {
    this.form = form;
    this.name = name;
    this.pass = pass;
    this.form.preventDefault();
    const api = new Api(this.url);
    api.signin(this.name.value, this.pass.value);
    this.form.reset();
  }
}
