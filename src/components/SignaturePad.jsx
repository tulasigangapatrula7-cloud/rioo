import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const INK = '#1B3A9E';
const MIN_LENGTH = 24; // a tiny accidental tap is not a signature

function pathLength(strokes) {
  let len = 0;
  for (const s of strokes) {
    for (let i = 1; i < s.length; i++) len += Math.hypot(s[i].x - s[i - 1].x, s[i].y - s[i - 1].y);
  }
  return len;
}

/* Touch + mouse signature pad. Strokes are kept in memory so resizing never loses the signature. */
const SignaturePad = forwardRef(function SignaturePad({ disabled, onChange }, ref) {
  const canvasRef = useRef(null);
  const strokes = useRef([]);
  const drawing = useRef(false);
  const lastOk = useRef(false);

  const paint = () => {
    const c = canvasRef.current;
    if (!c || !c.clientWidth) return;
    const dpr = window.devicePixelRatio || 1;
    if (c.width !== Math.round(c.clientWidth * dpr) || c.height !== Math.round(c.clientHeight * dpr)) {
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
    }
    const ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
    ctx.strokeStyle = INK;
    ctx.fillStyle = INK;
    ctx.lineWidth = 2.6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const s of strokes.current) {
      if (s.length === 1) {
        ctx.beginPath();
        ctx.arc(s[0].x, s[0].y, 1.3, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      ctx.beginPath();
      ctx.moveTo(s[0].x, s[0].y);
      for (let i = 1; i < s.length - 1; i++) {
        const mx = (s[i].x + s[i + 1].x) / 2;
        const my = (s[i].y + s[i + 1].y) / 2;
        ctx.quadraticCurveTo(s[i].x, s[i].y, mx, my);
      }
      ctx.lineTo(s[s.length - 1].x, s[s.length - 1].y);
      ctx.stroke();
    }
  };

  const report = () => {
    const ok = pathLength(strokes.current) >= MIN_LENGTH;
    if (ok !== lastOk.current) {
      lastOk.current = ok;
      onChange(ok);
    }
  };

  useImperativeHandle(ref, () => ({
    clear() {
      strokes.current = [];
      paint();
      report();
    },
  }));

  useEffect(() => {
    const c = canvasRef.current;
    paint();
    const ro = new ResizeObserver(paint);
    ro.observe(c);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const point = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const down = (e) => {
    if (disabled) return;
    e.preventDefault();
    canvasRef.current.setPointerCapture?.(e.pointerId);
    drawing.current = true;
    strokes.current.push([point(e)]);
    paint();
  };
  const move = (e) => {
    if (!drawing.current || disabled) return;
    e.preventDefault();
    const s = strokes.current[strokes.current.length - 1];
    s.push(point(e));
    paint();
  };
  const up = () => {
    if (!drawing.current) return;
    drawing.current = false;
    report();
  };

  return (
    <canvas
      ref={canvasRef}
      className="sig-canvas"
      data-testid="signature-canvas"
      aria-label="Signature pad. Draw your signature with your finger or mouse."
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onPointerLeave={up}
    />
  );
});

export default SignaturePad;
