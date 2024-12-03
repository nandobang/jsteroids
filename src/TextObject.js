import { SceneObject } from './SceneObject.js';

export class TextObject extends SceneObject {
  #content;
  #alignment;

  constructor(content, x, y, alignment = 'left') {
    super(x, y);

    this.#content = content;
    this.#alignment = alignment;
  }

  get content() { return this.#content; }
  set content(value) { this.#content = value; }

  render(canvas, debug) {
    canvas.fillStyle = '#ffffff';
    canvas.textAlign = this.#alignment;
    canvas.fillText(this.#content, this.x, this.y);
  }
}
