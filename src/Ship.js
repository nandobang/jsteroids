import { GameObject } from './GameObject.js';

export class Ship extends GameObject {
  constructor(x, y) {
    super('/sprites/ship.png', x, y);
  }

  move(speed) {
    const radians = this.rotationAngle * Math.PI / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const newX = speed * cos;
    const newY = speed * sin;

    this.x += newX;
    this.y += newY;
  }
}
