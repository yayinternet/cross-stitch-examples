class MenuItem {
  constructor(containerElement, name, id) {
    this._onClick = this._onClick.bind(this);

    this.name = name;
    this.id = id;

    containerElement.append(this._createDiv());
  }

  _onClick() {
    window.location.href = `/id/${this.id}`;
  }

  _createDiv() {
    const button = document.createElement('button');
    button.textContent = this.name || 'Untitled';
    button.addEventListener('click', this._onClick);
    return button;
  }
}
