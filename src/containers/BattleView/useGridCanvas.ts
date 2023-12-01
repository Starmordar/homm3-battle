import { useRef, useEffect } from 'react';

import { fillCanvas, setCanvasSize } from '../../lib/canvas';
import { drawHexGrid, getGridLayout, setHexagonHoverEvent } from '../../lib/canvas/drawHex';

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const canvasSize = { width: window.innerWidth, height: window.innerHeight };

    setCanvasSize(canvas, canvasSize);
    fillCanvas(canvas, 'transparent');

    const layout = getGridLayout(canvasSize);
    drawHexGrid(ctx, layout);
    setHexagonHoverEvent(canvas, layout);
  }, []);

  return canvasRef;
};
export default useCanvas;
