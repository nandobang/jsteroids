export class GameObject {
  #sprite;
  #x;
  #y;

  constructor(sprite, x = 0, y = 0) {
    this.#sprite = new Image();
    this.#sprite.src = sprite;
    this.#x = x;
    this.#y = y;
  }

  get sprite() {
    return this.#sprite;
  }

  get x() {
    return this.#x;
  }

  set x(value) {
    this.#x = value;
  }

  get y() {
    return this.#y;
  }

  set y(value) {
    this.#y = value;
  }

  get w() {
    return this.#sprite.width;
  }

  get h() {
    return this.#sprite.height;
  }

  run() {}
}
