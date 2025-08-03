import { GameObject } from './GameObject.js';

export class Asteroid extends GameObject {
  #speed;
  #directionAngle;
  #size;

  constructor(size, x, y, directionAngle) {
    if (size == 0) super('/sprites/asteroid-16.png', x, y);
    else if (size == 1) super('/sprites/asteroid-32.png', x, y);
    else if (size == 2) super('/sprites/asteroid-64.png', x, y);
    else if (size == 3) super('/sprites/asteroid-128.png', x, y);

    this.#speed = (4 - size) / 10;
    this.#directionAngle = directionAngle;
    this.#size = size;
  }

  get size() { return this.#size; }

  run(context) {
    const radians = this.#directionAngle * Math.PI / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const newX = this.#speed * cos;
    const newY = this.#speed * sin;

    this.x += newX;
    this.y += newY;
  }
}
