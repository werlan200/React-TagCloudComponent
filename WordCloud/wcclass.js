class Rect {
  constructor(centerX, centerY, width, height, properties) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.width = width;
    this.height = height;
    this.diagonalLength = Math.sqrt(
      this.width * this.width + this.height * this.height
    );
    this.properties = properties || {};
  }
  calculateBounds() {
    //call this function when you create a new Rect Obj (not necessary when cloning)
    this.left = this.centerX - this.width / 2;
    this.right = this.centerX + this.width / 2;
    this.top = this.centerY - this.height / 2;
    this.bottom = this.centerY + this.height / 2;
  }
  clone() {
    const cloneRect = new Rect(
      this.centerX,
      this.centerY,
      this.width,
      this.height,
      this.properties
    );
    cloneRect.calculateBounds();
    return cloneRect;
  }
  setNewProperty(property, value) {
    this.properties[property] = value;
  }
}

export { Rect };
