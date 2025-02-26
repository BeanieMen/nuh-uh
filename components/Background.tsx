"use client"
import { useRef, useEffect } from 'react';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let boxes: {
      x: number;
      y: number;
      size: number;
      t: number;
      target: number;
    }[] = [];

    const gridInfo = {
      columns: 0,
      boxSize: 0,
      rows: 0,
      gridHeight: 0
    };

    let isAnimating = false;
    let lastTimestamp = 0;
    let resizeTimeout: number;

    function calculateGrid() {
      if (!ctx || !canvas) return;
      const w = window.innerWidth;

      const docHeight = Math.max(document.body.scrollHeight, window.innerHeight);
      gridInfo.gridHeight = docHeight;


      gridInfo.columns = w < 768 ? 10 : 12;
      gridInfo.boxSize = w / gridInfo.columns;
      gridInfo.rows = Math.ceil(docHeight / gridInfo.boxSize);


sw      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${docHeight}px`;
      canvas.width = w * dpr;
      canvas.height = docHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Create grid boxes.
      boxes = [];
      for (let r = 0; r < gridInfo.rows; r++) {
        for (let c = 0; c < gridInfo.columns; c++) {
          boxes.push({
            x: c * gridInfo.boxSize,
            y: r * gridInfo.boxSize,
            size: gridInfo.boxSize,
            t: 0,
            target: 0
          });
        }
      }
      draw();
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, gridInfo.gridHeight);
      boxes.forEach((box) => {
        const base = 22;
        const diff = 29; // 51 - 22
        const colorVal = Math.round(base + diff * box.t);
        ctx.fillStyle = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;
        ctx.fillRect(box.x, box.y, box.size, box.size);
        ctx.strokeStyle = '#262626';
        ctx.lineWidth = 1;
        ctx.strokeRect(box.x, box.y, box.size, box.size);
      });
    }

    function animate(timestamp: number) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const dt = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      let needsRedraw = false;

      boxes.forEach((box) => {
        if (box.t < box.target) {
          box.t = Math.min(box.target, box.t + dt / 75);
          needsRedraw = true;
        } else if (box.t > box.target) {
          box.t = Math.max(box.target, box.t - dt / 700);
          needsRedraw = true;
        }
      });

      draw();

      if (needsRedraw) {
        isAnimating = true;
        requestAnimationFrame(animate);
      } else {
        isAnimating = false;
        lastTimestamp = 0;
      }
    }

    function startAnimation() {
      if (!isAnimating) {
        requestAnimationFrame(animate);
        isAnimating = true;
      }
    }

    function handleMouseMove(e: MouseEvent) {
      const mouseX = e.pageX;
      const mouseY = e.pageY;
      const { boxSize, columns, gridHeight } = gridInfo;

      if (mouseX < 0 || mouseX > window.innerWidth || mouseY < 0 || mouseY > gridHeight) {
        boxes.forEach((box) => (box.target = 0));
      } else {
        const col = Math.floor(mouseX / boxSize);
        const row = Math.floor(mouseY / boxSize);
        const hoveredIndex = row * columns + col;
        boxes.forEach((box, index) => {
          box.target = index === hoveredIndex ? 1 : 0;
        });
      }
      startAnimation();
    }

    function handleMouseLeave() {
      boxes.forEach((box) => (box.target = 0));
      startAnimation();
    }

    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        calculateGrid();
        startAnimation();
      }, 100);
    }

    calculateGrid();
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}
