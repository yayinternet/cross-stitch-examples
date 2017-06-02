class Palette {
  constructor(containerElement) {
    this.selectedColor = '';

    this.onSetColor = this.onSetColor.bind(this);

    const colorDisplay = containerElement.querySelector('.color-display');
    for (const colorName of COLOR_NAMES) {
      const color = new Color(colorDisplay, colorName, this.onSetColor);
    }
    this.previewColor  = containerElement.querySelector('.preview');

    this._setColor('black');
  }

  onSetColor(colorName) {
    this.previewColor.classList.remove(this.selectedColor);
    this._setColor(colorName);
  }

  _setColor(colorName) {
    this.previewColor.classList.add(colorName);
    this.selectedColor = colorName;
  }

  getSelectedColor() {
    return this.selectedColor;
  }
}

const COLOR_NAMES = [
  'black',
  'gray',
  'white',
  'red',
  'pink',
  'darkbrown',
  'brown',
  'orange',
  'yellow',
  'darkgreen',
  'green',
  'lightgreen',
  'darkblue',
  'mediumblue',
  'blue',
  'lightblue'
];
