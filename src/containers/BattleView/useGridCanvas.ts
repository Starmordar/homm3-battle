import { useRef, useEffect } from 'react';
import HexagonalCanvas from '../../lib/canvas/HexagonalCanvas';
import { hexObstacles } from '../../constants/hex';

const useGridCanvas = (height: number, width: number) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const options = {
      backgroundColor: 'transparent',
      size: { width, height },
      obstacles: hexObstacles,
      backgroundImage: 'src/assets/battlefields/1_0.jpg',
    };

    const hexCanvas = new HexagonalCanvas(canvas, options);
    hexCanvas.setupCanvas();
  }, []);

  return canvasRef;
};

export default useGridCanvas;
