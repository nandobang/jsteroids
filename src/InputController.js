export class InputController {
  /** @type {Gamepad} */
  #gamepad;
  #currentKeys;

  #upKeyState;
  #downKeyState;
  #leftKeyState;
  #rightKeyState;
  #actionKeyState;

  #isUpPressed;
  #isDownPressed;
  #isLeftPressed;
  #isRightPressed;
  #isActionPressed;

  #wasUpPressed;
  #wasDownPressed;
  #wasLeftPressed;
  #wasRightPressed;
  #wasActionPressed;

  #wasUpReleased;
  #wasDownReleased;
  #wasLeftReleased;
  #wasRightReleased;
  #wasActionReleased;

  constructor() {
    this.#currentKeys = [];

    this.#upKeyState = 0;
    this.#downKeyState = 0;
    this.#leftKeyState = 0;
    this.#rightKeyState = 0;
    this.#actionKeyState = 0;

    this.#isUpPressed = false;
    this.#isDownPressed = false;
    this.#isLeftPressed = false;
    this.#isRightPressed = false;
    this.#isActionPressed = false;

    this.#wasUpPressed = false;
    this.#wasDownPressed = false;
    this.#wasLeftPressed = false;
    this.#wasRightPressed = false;
    this.#wasActionPressed = false;

    this.#wasUpReleased = false;
    this.#wasDownReleased = false;
    this.#wasLeftReleased = false;
    this.#wasRightReleased = false;
    this.#wasActionReleased = false;

    document.addEventListener('keydown', (event) => {
      if (!this.#currentKeys.includes(event.key)) {
        this.#currentKeys.push(event.key);
      }
    });
    
    document.addEventListener('keyup', (event) => {
      const keyIndex = this.#currentKeys.indexOf(event.key);
      
      if (keyIndex >= 0) {
        this.#currentKeys.splice(keyIndex, 1);
      }
    });

    window.addEventListener('gamepadconnected', (event) => {
      this.#gamepad = navigator.getGamepads()[0];
    });
  }

  get isUpPressed() { return this.#isUpPressed; }
  get isDownPressed() { return this.#isDownPressed; }
  get isLeftPressed() { return this.#isLeftPressed; }
  get isRightPressed() { return this.#isRightPressed; }
  get isActionPressed() { return this.#isActionPressed; }

  get wasUpPressed() { return this.#wasUpPressed; }
  get wasDownPressed() { return this.#wasDownPressed; }
  get wasLeftPressed() { return this.#wasLeftPressed; }
  get wasRightPressed() { return this.#wasRightPressed; }
  get wasActionPressed() { return this.#wasActionPressed; }

  get wasUpReleased() { return this.#wasUpReleased; }
  get wasDownReleased() { return this.#wasDownReleased; }
  get wasLeftReleased() { return this.#wasLeftReleased; }
  get wasRightReleased() { return this.#wasRightReleased; }
  get wasActionReleased() { return this.#wasActionReleased; }

  run() {
    this.#gamepad = navigator.getGamepads()[0];
    
    this.#isUpPressed = false;
    this.#isDownPressed = false;
    this.#isLeftPressed = false;
    this.#isRightPressed = false;
    this.#isActionPressed = false;

    this.#wasUpPressed = false;
    this.#wasDownPressed = false;
    this.#wasLeftPressed = false;
    this.#wasRightPressed = false;
    this.#wasActionPressed = false;

    this.#wasUpReleased = false;
    this.#wasDownReleased = false;
    this.#wasLeftReleased = false;
    this.#wasRightReleased = false;
    this.#wasActionReleased = false;

    if (this.#currentKeys.includes('ArrowUp') || (this.#gamepad != null && this.#gamepad.axes[1] == -1)) {
      if (this.#upKeyState == 0) this.#upKeyState = 1;
      if (this.#upKeyState == 1 && this.#wasUpPressed == false) this.#wasUpPressed = true;
      
      this.#isUpPressed = true;
      this.#upKeyState = 2;
    } else {
      if (this.#upKeyState == 2 && this.#wasUpReleased == false) this.#wasUpReleased = true;

      this.#upKeyState = 0;
    }

    if (this.#currentKeys.includes('ArrowDown') || (this.#gamepad != null && this.#gamepad.axes[1] == 1)) {
      if (this.#downKeyState == 0) this.#downKeyState = 1;
      if (this.#downKeyState == 1 && this.#wasDownPressed == false) this.#wasDownPressed = true;
      
      this.#isDownPressed = true;
      this.#downKeyState = 2;
    } else {
      if (this.#downKeyState == 2 && this.#wasDownReleased == false) this.#wasDownReleased = true;

      this.#downKeyState = 0;
    }

    if (this.#currentKeys.includes('ArrowLeft') || (this.#gamepad != null && this.#gamepad.axes[0] == -1)) {
      if (this.#leftKeyState == 0) this.#leftKeyState = 1;
      if (this.#leftKeyState == 1 && this.#wasLeftPressed == false) this.#wasLeftPressed = true;
      
      this.#isLeftPressed = true;
      this.#leftKeyState = 2;
    } else {
      if (this.#leftKeyState == 2 && this.#wasLeftReleased == false) this.#wasLeftReleased = true;

      this.#leftKeyState = 0;
    }

    if (this.#currentKeys.includes('ArrowRight') || (this.#gamepad != null && this.#gamepad.axes[0] == 1)) {
      if (this.#rightKeyState == 0) this.#rightKeyState = 1;
      if (this.#rightKeyState == 1 && this.#wasRightPressed == false) this.#wasRightPressed = true;
      
      this.#isRightPressed = true;
      this.#rightKeyState = 2;
    } else {
      if (this.#rightKeyState == 2 && this.#wasRightReleased == false) this.#wasRightReleased = true;

      this.#rightKeyState = 0;
    }

    if (this.#currentKeys.includes(' ') || (this.#gamepad != null && this.#gamepad.buttons[0].pressed)) {
      if (this.#actionKeyState == 0) this.#actionKeyState = 1;
      if (this.#actionKeyState == 1 && this.#wasActionPressed == false) this.#wasActionPressed = true;
      
      this.#isActionPressed = true;
      this.#actionKeyState = 2;
    } else {
      if (this.#actionKeyState == 2 && this.#wasActionReleased == false) this.#wasActionReleased = true;

      this.#actionKeyState = 0;
    }
  }
}
