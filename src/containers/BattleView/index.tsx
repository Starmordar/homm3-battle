import useGridCanvas from './useGridCanvas';
import useHeroCanvas from './useHeroCanvas';
import useTerrarianCanvas from './useTerrarianCanvas';
import useUiCanvas from './uiCanvas';
import { useEffect } from 'react';

import ResourceController from '../../controllers/ResourceController';

function BattleView() {
  const height = window.innerHeight - 25;
  const width = Math.min(window.innerHeight * 1.5, window.innerWidth);

  useEffect(() => {
    const resource = new ResourceController();
    console.log('resource :>> ', resource, resource.__proto__);
    resource.loadUISprites();
  }, []);

  const canvasRef = useGridCanvas(height, width);
  const terrarianCanvas = useTerrarianCanvas(height, width);
  const heroCanvas = useHeroCanvas(height, width);
  const uiCanvas = useUiCanvas(window.innerHeight, window.innerWidth, width, height);

  return (
    <div className="canvas-wrapper">
      <canvas className="ui-canvas cursor-default" ref={uiCanvas} />

      <canvas className="hero-canvas" ref={heroCanvas} />
      <canvas className="background-canvas" ref={terrarianCanvas} />
      <canvas className="grid-canvas" ref={canvasRef} />
    </div>
  );
}

export default BattleView;
