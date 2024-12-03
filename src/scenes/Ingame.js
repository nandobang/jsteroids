import { Scene } from '../Scene.js';
import { Ship } from '../Ship.js';

export class Ingame extends Scene {
  #ship;

  constructor() {
    super();

    this.#ship = new Ship(120, 90);

    this.addGameObject(this.#ship);
  }

  run(context) {
    if (context.input.isLeftPressed) {
      this.#ship.rotationAngle -= 3;
    } else if (context.input.isRightPressed) {
      this.#ship.rotationAngle += 3;
    } else if (context.input.isUpPressed) {
      const radians = this.#ship.rotationAngle * Math.PI / 180;
      const cos = Math.cos(radians);
      const sin = Math.sin(radians);
      const newX = 3 * cos;
      const newY = 3 * sin;

      this.#ship.x += newX;
      this.#ship.y += newY;
    }
    
    super.run(context);
  }
}
