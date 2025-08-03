import { GameObject } from './GameObject.js';

export class Plasma extends GameObject {
  #directionAngle;

  constructor(x, y, directionAngle) {
    super('/sprites/plasma.png', x, y);

    this.#directionAngle = directionAngle;
  }

  run(context) {
    const speed = 6;
    const radians = this.#directionAngle * Math.PI / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const newX = speed * cos;
    const newY = speed * sin;

    this.x += newX;
    this.y += newY;
  }
}
