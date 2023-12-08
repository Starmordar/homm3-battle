import { useRef, useEffect } from 'react';
import TerrarianCanvas from '../../lib/canvas/TerrarianCanvas';

const useTerrarianCanvas = (height: number, width: number) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const options = {
      backgroundColor: 'transparent',
      size: { width, height },
      backgroundImage: 'src/assets/battlefields/1_0.jpg',
    };

    const hexCanvas = new TerrarianCanvas(options);
    hexCanvas.setup();
  }, []);

  return canvasRef;
};

export default useTerrarianCanvas;
