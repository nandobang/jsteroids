export class Scene {
  #gameObjects;

  constructor() {
    this.#gameObjects = [];
  }

  addGameObject(gameObject) {
    this.#gameObjects.push(gameObject);
  }

  removeGameObject(gameObject) {
    const index = this.#gameObjects.indexOf(gameObject);

    if (index >= 0) {
      this.#gameObjects.splice(index, 1);
    }
  }

  get gameObjects() { return this.#gameObjects; }

  run(context) {
    this.#gameObjects.forEach((gameObject) => {
      gameObject.run(context);
    });
  }

  render(canvas, debug = false) {
    this.#gameObjects.forEach((gameObject) => {
      gameObject.render(canvas, debug);
    });
  }
}
