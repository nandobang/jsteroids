export class Game {
  static #instance;

  static get instance() {
    if (this.#instance == null) {
      this.#instance = new Game();
    }

    return this.#instance;
  }

  #score;
  #difficulty;

  constructor() {
    this.#score = 0;
  }

  get score() { return this.#score; }
  set score(value) { this.#score = value; }

  get difficulty() { return this.#difficulty; }
  set difficulty(value) { this.#difficulty = value; }
}
