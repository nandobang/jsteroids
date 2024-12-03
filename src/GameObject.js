import { SceneObject } from './SceneObject.js';

export class GameObject extends SceneObject {
  #sprite;

  constructor(sprite, x = 0, y = 0) {
    super(x, y);

    this.#sprite = new Image();
    this.#sprite.src = sprite;
  }

  get sprite() { return this.#sprite; }

  get w() { return this.#sprite.width; }
  get h() { return this.#sprite.height; }

  render(canvas, debug) {
    canvas.translate(this.x, this.y);

    if (debug) {
      canvas.strokeStyle = 'hsl(120, 100%, 50%)';
      canvas.strokeRect(0, 0, this.w, this.h);
    }
    
    canvas.translate(this.w / 2, this.h / 2);
    canvas.rotate(this.rotationAngle * Math.PI / 180);
    canvas.scale(this.scale / 100, this.scale / 100);
    canvas.translate(-(this.w / 2), -(this.h / 2));
    
    if (debug) {
      canvas.strokeStyle = 'hsl(210, 100%, 50%)';
      canvas.strokeRect(0, 0, this.w, this.h);
    }

    canvas.drawImage(this.sprite, 0, 0);
    
    canvas.resetTransform();
  }
}
