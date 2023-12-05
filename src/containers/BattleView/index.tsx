import useGridCanvas from './useGridCanvas';
import useHeroCanvas from './useHeroCanvas';
import useTerrarianCanvas from './useTerrarianCanvas';

function BattleView() {
  const height = window.innerHeight - 25;
  const width = Math.min(window.innerHeight * 1.5, window.innerWidth);

  const canvasRef = useGridCanvas(height, width);
  const terrarianCanvas = useTerrarianCanvas(height, width);
  const heroCanvas = useHeroCanvas(height, width);

  return (
    <div className="canvas-wrapper">
      <canvas className="hero-canvas" ref={heroCanvas} />
      <canvas className="background-canvas" ref={terrarianCanvas} />
      <canvas className="grid-canvas" ref={canvasRef} />
    </div>
  );
}

export default BattleView;
