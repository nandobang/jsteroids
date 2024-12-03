import { InputController } from './InputController.js';
import { Intro } from './scenes/Intro.js';

export class Main {
  /** @type { HTMLCanvasElement } */
  #canvas;
  #width;
  #height;
  #fpsCount;
  #fpsDeltaTime;
  #fps;
  #scene;
  #context;
  #debug = false;
  #input;

  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   */
  constructor(canvas) {
    /** @type {HTMLCanvasElement} */
    this.#canvas = canvas.getContext('2d');
    this.#width = canvas.width;
    this.#height = canvas.height;
    this.#input = new InputController();

    this.#fpsCount = 0;
    this.#fps = 0;

    this.#scene = new Intro(this);

    this.#context = {
      canvas: this.#canvas.canvas,
      input: this.#input,
      game: this
    };

    this.run = this.run.bind(this);
  }

  get width() { return this.#width; }
  get height() { return this.#height; }

  changeScene(scene) {
    this.#scene = scene;
  }

  run(ts) {
    this.#input.run();

    if (this.#fpsDeltaTime === undefined) {
      this.#fpsDeltaTime = Date.now();
    }

    if ((Date.now() - this.#fpsDeltaTime) > 1000) {
      this.#fpsDeltaTime = Date.now();
      this.#fps = this.#fpsCount;
      this.#fpsCount = 0;
    }

    //
    this.#scene.run(this.#context);
    //
    
    this.#canvas.fillStyle = '#000000';
    this.#canvas.fillRect(0, 0, this.#width, this.#height);

    //
    this.#scene.render(this.#canvas, this.#debug);
    //

    this.#canvas.fillStyle = '#ffffff';
    this.#canvas.textAlign = 'left';
    this.#canvas.fillText('Hello!', 5, 12);

    this.#canvas.fillStyle = '#ffcc00';
    this.#canvas.textAlign = 'right';
    this.#canvas.fillText(`${ this.#fps } FPS`, this.#width - 5, 12);

    this.#fpsCount++;

    window.requestAnimationFrame(this.run);
  }
}
