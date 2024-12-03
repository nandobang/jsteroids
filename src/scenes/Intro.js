import { Scene } from '../Scene.js';
import { IntroAsteroid } from '../IntroAsteroid.js';
import { GameObject } from '../GameObject.js';
import { TextObject } from '../TextObject.js';
import { Ingame } from './Ingame.js';

export class Intro extends Scene {
  #currentOption;
  #optionEasy;
  #optionMedium;
  #optionHard;

  constructor(canvas) {
    super();

    const logo = new GameObject('/sprites/logo.png', (canvas.width / 2) - (120), 20);
    const asteroid1 = new IntroAsteroid(50, 130, 1.5, 30);
    const asteroid2 = new IntroAsteroid(50, 145, 2, 40);
    const asteroid3 = new IntroAsteroid(50, 150, 2.5, 20);
    this.#optionEasy = new TextObject('Easy', (canvas.width / 4), 120, 'center');
    this.#optionMedium = new TextObject('Medium', (canvas.width / 2), 120, 'center');
    this.#optionHard = new TextObject('Hard', canvas.width - (canvas.width / 4), 120, 'center');

    this.addGameObject(logo);
    this.addGameObject(asteroid1);
    this.addGameObject(asteroid2);
    this.addGameObject(asteroid3);
    this.addGameObject(this.#optionEasy);
    this.addGameObject(this.#optionMedium);
    this.addGameObject(this.#optionHard);

    this.#currentOption = 0;
  }

  run(context) {
    if (context.input.wasLeftPressed) {
      this.#currentOption -= 1;
    } else if (context.input.wasRightPressed) {
      this.#currentOption += 1;
    }

    if (context.input.wasActionPressed) {
      context.game.changeScene(new Ingame());
    }

    if (this.#currentOption < 0) {
      this.#currentOption = 2;
    } else if (this.#currentOption > 2) {
      this.#currentOption = 0;
    }
    
    this.#optionEasy.content = this.#currentOption == 0 ? '> Easy' : 'Easy';
    this.#optionMedium.content = this.#currentOption == 1 ? '> Medium' : 'Medium';
    this.#optionHard.content = this.#currentOption == 2 ? '> Hard' : 'Hard';
    
    super.run(context);
  }
}
