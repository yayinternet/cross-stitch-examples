class Pixel {
  constructor(containerElement, paintBrush, row, col) {
    this.containerElement = containerElement;
    this.paintBrush = paintBrush;
    this.row = row;
    this.col = col;
    this.color = null;

    this._onClick = this._onClick.bind(this);

    this.pixelDiv = this._createDiv();
    this.containerElement.append(this.pixelDiv);
  }

  clear() {
    const oldColor = this.color;
    if (oldColor) {
      this.pixelDiv.classList.remove(oldColor);
    }
    this.color = null;
  }

  setColor(newColor) {
    const oldColor = this.color;
    this.clear();
    if (oldColor !== newColor) {
      this.color = newColor;
      if (this.color) {
        this.pixelDiv.classList.add(this.color);
      }
    }
  }

  getData() {
    if (!this.color) {
      return null;
    }
    return {
      color: this.color,
      row: this.row,
      col: this.col
    };
  }

  _onClick() {
    const newColor = this.paintBrush.getSelectedColor();
    this.setColor(newColor);
  }

  _createDiv() {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.dataset.row = this.row;
    pixel.dataset.col = this.col;
    pixel.addEventListener('click', this._onClick);
    return pixel;
  }
}
