import useGridCanvas from './useGridCanvas';

function BattleView() {
  const canvasRef = useGridCanvas();

  return <canvas ref={canvasRef} />;
}

export default BattleView;
