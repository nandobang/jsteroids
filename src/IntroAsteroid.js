import { GameObject } from './GameObject.js';

export class IntroAsteroid extends GameObject {
  #speed;
  #direction;
  #changingDirection;

  constructor(x, y, speed, scale) {
    super('/sprites/asteroid-32.png', x, y);

    this.#speed = speed;
    this.scale = scale;
    this.#direction = 1;
    this.#changingDirection = false;
  }
  
  run(context) {
    this.x += this.#speed * this.#direction;

    if (this.x > (context.canvas.width - this.w) || this.x < 0) {
      this.#changingDirection = true;
    }

    if (this.#changingDirection == true) {
      this.#direction = this.#direction * -1;
      this.#changingDirection = false;
    }

    this.rotationAngle += 0.05;
  }
}
