export class Main {
  /** @type { HTMLCanvasElement } */
  #canvas;
  #width;
  #height;
  #fpsCount;
  #fpsDeltaTime;
  #fps;

  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   */
  constructor(canvas) {
    this.#canvas = canvas.getContext('2d');
    this.#width = canvas.width;
    this.#height = canvas.height;

    this.#fpsCount = 0;
    this.#fps = 0;

    this.run = this.run.bind(this);
  }

  run(ts) {
    if (this.#fpsDeltaTime === undefined) {
      this.#fpsDeltaTime = Date.now();
    }

    if ((Date.now() - this.#fpsDeltaTime) > 1000) {
      this.#fpsDeltaTime = Date.now();
      this.#fps = this.#fpsCount;
      this.#fpsCount = 0;
    }
    
    this.#canvas.fillStyle = '#000000';
    this.#canvas.fillRect(0, 0, this.#width, this.#height);

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
