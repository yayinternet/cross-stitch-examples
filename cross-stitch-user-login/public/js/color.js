class Color {
  constructor(containerElement, colorName, onSetColor) {
    this.colorName = colorName;
    this.onSetColor = onSetColor;

    this._onClick = this._onClick.bind(this);

    const colorDiv = this._createDiv();
    containerElement.append(colorDiv);
  }

  _onClick() {
    this.onSetColor(this.colorName);
  }

  _createDiv() {
    const color = document.createElement('div');
    color.classList.add('color');
    color.classList.add(this.colorName);
    color.addEventListener('click', this._onClick);
    return color;
  }
}
