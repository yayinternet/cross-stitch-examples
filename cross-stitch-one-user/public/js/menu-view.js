class MenuView {
  constructor() {
    this._onCreate = this._onCreate.bind(this);

    this.newButton = document.querySelector('#new-button');
    this.newButton.addEventListener('click', this._onCreate);
    this._loadOptions();
  }

  async _loadOptions() {
    const response = await fetch('/load');
    const result =  await response.json();
    const menuContainer = document.querySelector('#menu');
    if (result) {
      const items = result.response;
      for (const item of items) {
        new MenuItem(menuContainer, item.name, item._id);
      }
    }
  }

  async _onCreate() {
    const response = await fetch('/create', { method: 'POST'} );
    const result =  await response.json();
    if (result) {
      window.location.href = `/id/${result.id}`;
    }
  }
}
