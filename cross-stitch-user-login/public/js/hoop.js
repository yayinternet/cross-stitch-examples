const HOOP_SIZE = 25;

class Hoop {
  constructor(containerElement, palette) {
    this.containerElement = containerElement;
    this.pixels = [];

    for (let col = 0; col < HOOP_SIZE; col++) {
      this.pixels[col] = [];
      for (let row = 0; row < HOOP_SIZE; row++) {
        const pixel = new Pixel(containerElement, palette, row, col);
        this.pixels[col][row] = pixel;
      }
    }
  }

  loadData(pixelData) {
    if (!pixelData) {
      return;
    }
    for (const info of pixelData) {
      const pixel = this.pixels[info.col][info.row];
      pixel.setColor(info.color);
    }
  }

  getData() {
    const pixelData = [];
    for (let col = 0; col < HOOP_SIZE; col++) {
      for (let row = 0; row < HOOP_SIZE; row++) {
        const pixel = this.pixels[col][row];
        const data = pixel.getData()
        if (data) {
          pixelData.push(data);
        }
      }
    }
    return pixelData;
  }

  clear() {
    for (let col = 0; col < HOOP_SIZE; col++) {
      for (let row = 0; row < HOOP_SIZE; row++) {
        const pixel = this.pixels[col][row];
        pixel.clear();
      }
    }
  }
}
