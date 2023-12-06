import { useRef, useEffect } from 'react';
import UICanvas from '../../lib/canvas/UICanvas';

const useUiCanvas = (height: number, width: number, bWidth: number, bHeight: number) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const options = {
      backgroundColor: 'transparent',
      size: { width, height },
      patternImage: 'src/assets/edge_pattern.png',
      battleWidth: bWidth,
      battleHeight: bHeight,
    };

    const uiCanvas = new UICanvas(canvas, options);
    uiCanvas.setup();
  }, []);

  return canvasRef;
};

export default useUiCanvas;
