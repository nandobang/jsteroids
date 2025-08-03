import { Asteroid } from '../Asteroid.js';
import { Game } from '../Game.js';
import { Plasma } from '../Plasma.js';
import { Scene } from '../Scene.js';
import { Ship } from '../Ship.js';
import { TextObject } from '../TextObject.js';

export class Ingame extends Scene {
  #ship;
  #scoreText;
  #asteroidLastTimestamp;
  #asteroidInterval;
  #gameOver;

  constructor() {
    super();

    this.#ship = new Ship(120, 90);

    this.addGameObject(this.#ship);

    this.#scoreText = new TextObject(0, 10, 10);

    this.addGameObject(this.#scoreText);

    this.#asteroidLastTimestamp = Date.now();
    this.#asteroidInterval = 3000;
    this.#gameOver = false;
  }

  cleanUpPlasmas(context) {
    this.gameObjects.forEach((gameObject) => {
      if (gameObject instanceof Plasma) {
        if (gameObject.x < 0 || gameObject.y < 0 || gameObject.x > context.canvas.width || gameObject.y > context.canvas.height) {
          this.removeGameObject(gameObject);
        }
      }
    });
  }

  canCreateAsteroid() {
    return Date.now() - this.#asteroidLastTimestamp > this.#asteroidInterval;
  }

  getAsteroidSize() {
    const percent = Math.random() * 100;

    if (percent <= 25) return 0;
    else if (percent <= 50) return 1;
    else if (percent <= 75) return 2;
    else if (percent <= 100) return 3;
  }

  createAsteroid(centerX, centerY, distance, size = this.getAsteroidSize()) {
    const angle = Math.random() * 360;
    const directionAngle = angle - 180;
    const angleRadians = angle * Math.PI / 180;
    const x = (distance * Math.cos(angleRadians)) + centerX;
    const y = (distance * Math.sin(angleRadians)) + centerY;

    this.addGameObject(new Asteroid(size, x, y, directionAngle));
  }

  isPointInsideRect(px, py, rx, ry, rw, rh) {
    if ((px >= rx && px <= (rx + rw)) && (py >= ry && py <= (ry + rh))) return true;

    return false;
  }

  areRectsIntersecting(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    if (this.isPointInsideRect(r1x, r1y, r2x, r2y, r2w, r2h)) return true;
    else if (this.isPointInsideRect(r1x + r1w, r1y, r2x, r2y, r2w, r2h)) return true;
    else if (this.isPointInsideRect(r1x + r1w, r1y + r1h, r2x, r2y, r2w, r2h)) return true;
    else if (this.isPointInsideRect(r1x, r1y + r1h, r2x, r2y, r2w, r2h)) return true;
    
    return false;
  }

  detectPlasmaCollisions() {
    this.gameObjects.forEach((gameObject) => {
      if (gameObject instanceof Plasma) {
        this.gameObjects.forEach((gameObject2) => {
          if (gameObject2 instanceof Asteroid) {
            if (this.areRectsIntersecting(gameObject.x, gameObject.y, gameObject.w, gameObject.h, gameObject2.x, gameObject2.y, gameObject2.w, gameObject2.h)) {
              this.removeGameObject(gameObject);
              this.removeGameObject(gameObject2);

              Game.instance.score += 50;
              
              if (gameObject2.size > 0) {
                for (let i = 0; i < 4; i++) {
                  this.createAsteroid(gameObject2.x + (gameObject2.w / 2), gameObject2.y + (gameObject2.h / 2), 0, gameObject2.size - 1);
                }
              }
            }
          }
        });
      }
    });
  }

  detectShipCollision(context) {
    this.gameObjects.forEach((gameObject) => {
      if (gameObject instanceof Asteroid) {
        if (this.areRectsIntersecting(this.#ship.x, this.#ship.y, this.#ship.w, this.#ship.h, gameObject.x, gameObject.y, gameObject.w, gameObject.h)) {
          this.#gameOver = true;
          this.addGameObject(new TextObject('GAME OVER', context.canvas.width / 2, context.canvas.height / 2, 'center'))
        }
      }
    });
  }

  run(context) {
    this.cleanUpPlasmas(context);
    this.detectPlasmaCollisions();

    if (this.canCreateAsteroid()) {
      this.#asteroidLastTimestamp = Date.now();

      this.createAsteroid(context.canvas.width / 2, context.canvas.height / 2, context.canvas.width);
    }

    if (!this.#gameOver) {
      this.detectShipCollision(context);
    
      if (context.input.isLeftPressed) {
        this.#ship.rotationAngle -= 3;
      }
      
      if (context.input.isRightPressed) {
        this.#ship.rotationAngle += 3;
      }
      
      if (context.input.isUpPressed) {
        this.#ship.move(3);
      }
      
      if (context.input.isDownPressed) {
        this.#ship.move(-3);
      }
      
      if (context.input.wasActionPressed) {
        const plasma = new Plasma(this.#ship.x + (this.#ship.w / 2), this.#ship.y + (this.#ship.h / 2), this.#ship.rotationAngle);

        this.addGameObject(plasma);
      }
    }
    
    super.run(context);

    this.#scoreText.content = Game.instance.score;
  }
}
