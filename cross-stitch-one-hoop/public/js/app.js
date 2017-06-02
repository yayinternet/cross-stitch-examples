class App {
  constructor() {
    this._onClear = this._onClear.bind(this);
    this._onSave = this._onSave.bind(this);
    this._loadFromDb = this._loadFromDb.bind(this);

    this.id = null;

    const paletteEl = document.querySelector('#palette');
    this.palette = new Palette(paletteEl);

    const hoopEl = document.querySelector('#hoop');
    this.hoop = new Hoop(hoopEl, this.palette);

    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', this._onClear);

    this._loadFromDb();
  }

  _onClear() {
    this.hoop.clear();
  }

  async _loadFromDb() {
    const response = await fetch('/load');
    const result =  await response.json();
    if (result) {
      const nameInput = document.querySelector('#hoop-name');
      nameInput.value = result.name;
      this.hoop.loadData(result.data);
      this.id = result._id;
    }
    // Now that we have loaded existing data, enable saving.
    const saveForm = document.querySelector('form');
    saveForm.addEventListener('submit', this._onSave);
  }

  async _onSave(event) {
    event.preventDefault();
    const nameInput = document.querySelector('#hoop-name');
    const title = nameInput.value.trim() || 'My hoop';
    nameInput.value = title;

    const data = {
      id: this.id,
      name: title,
      data: this.hoop.getData()
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    await fetch('/save', fetchOptions);
  }
}
