const DEFAULT_NAME = 'My hoop';
class EditView {
  constructor(id) {
    this._onClear = this._onClear.bind(this);
    this._onSave = this._onSave.bind(this);
    this.id = id;

    const paletteEl = document.querySelector('#palette');
    this.palette = new Palette(paletteEl);

    const hoopEl = document.querySelector('#hoop');
    this.hoop = new Hoop(hoopEl, this.palette);

    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', this._onClear);

    this._loadFromDb(id);
  }

  _onClear() {
    this.hoop.clear();
  }

  async _loadFromDb(id) {
    const response = await fetch(`/load/${id}`);
    const result =  await response.json();
    if (result) {
      const nameInput = document.querySelector('#hoop-name');
      nameInput.value = result.name || DEFAULT_NAME;
      this.hoop.loadData(result.data);
    }
    // Now that we have loaded existing data, enable saving.
    const saveForm = document.querySelector('form');
    saveForm.addEventListener('submit', this._onSave);
  }

  async _onSave(event) {
    event.preventDefault();
    const nameInput = document.querySelector('#hoop-name');
    const title = nameInput.value.trim() || DEFAULT_NAME;
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
