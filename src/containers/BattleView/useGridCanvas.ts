import { useRef, useEffect } from 'react';
import { setupGridCanvas } from '../../lib/canvas/grid';

const useGridCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    setupGridCanvas(canvas);
  }, []);

  return canvasRef;
};

export default useGridCanvas;
