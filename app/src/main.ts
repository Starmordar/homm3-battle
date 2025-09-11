import './style.css';
import { Application } from 'pixi.js';

import 'reflect-metadata';
import { Homm3 } from './game/Homm3';

(async () => {
  const app = new Application();
  // @ts-expect-error enable pixi devtools
  window.__PIXI_DEVTOOLS__ = { app: app };

  await app.init({ background: '#7cbbe7ff', resizeTo: window });
  document.querySelector('#app')?.appendChild(app.canvas);

  const homm3 = new Homm3(app);
  homm3.start();
})();
