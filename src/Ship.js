import { GameObject } from './GameObject.js';

export class Ship extends GameObject {
  constructor(x, y) {
    super('/sprites/ship.png', x, y);
  }
}
