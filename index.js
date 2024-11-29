import { Main } from './src/Main.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#canvas');
  const main = new Main(canvas);

  window.requestAnimationFrame(main.run);
});
