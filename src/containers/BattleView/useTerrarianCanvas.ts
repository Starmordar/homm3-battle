import { useRef, useEffect } from 'react';
import TerrarianCanvas from '../../lib/canvas/TerrarianCanvas';

const useTerrarianCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const options = {
      backgroundColor: 'transparent',
      size: {
        width: Math.min(window.innerHeight * 1.5, window.innerWidth),
        height: window.innerHeight - 100,
      },
      backgroundImage: 'src/assets/battlefields/1_0.jpg',
    };

    const hexCanvas = new TerrarianCanvas(canvas, options);
    hexCanvas.setup();
  }, []);

  return canvasRef;
};

export default useTerrarianCanvas;
