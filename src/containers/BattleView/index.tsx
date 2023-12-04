import useGridCanvas from './useGridCanvas';
import useHeroCanvas from './useHeroCanvas';
import useTerrarianCanvas from './useTerrarianCanvas';

function BattleView() {
  const canvasRef = useGridCanvas();
  const terrarianCanvas = useTerrarianCanvas();
  const heroCanvas = useHeroCanvas();

  return (
    <div className="canvas-wrapper">
      <canvas className="hero-canvas" ref={heroCanvas} />
      <canvas className="background-canvas" ref={terrarianCanvas} />
      <canvas className="grid-canvas" ref={canvasRef} />
    </div>
  );
}

export default BattleView;
