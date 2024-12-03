export class SceneObject {
  #x;
  #y;
  #rotationAngle;
  #scale;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
    this.#rotationAngle = 0;
    this.#scale = 100;
  }

  get x() { return this.#x; }
  set x(value) { this.#x = value; }

  get y() { return this.#y; }
  set y(value) { this.#y = value; }

  get rotationAngle() { return this.#rotationAngle; }
  set rotationAngle(value) {
    let newValue;

    if (value > 360) {
      newValue = value - 360;
    } else if (value < 0) {
      newValue = 360 - value;
    } else {
      newValue = value;
    }
    
    this.#rotationAngle = newValue;
  }

  get scale() { return this.#scale; }
  set scale(value) { this.#scale = value; }

  run(context) {}

  render(canvas, debug) {}
}
