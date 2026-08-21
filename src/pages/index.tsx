import { useEffect, useRef } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 0.5;
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          life: 1,
          maxLife: Math.random() * 55 + 35,
          size: Math.random() * 4.5 + 1,
          hue: Math.random() * 80 + 190, // blue → purple range
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.045; // gravity
        p.vx *= 0.98;
        p.life -= 1 / p.maxLife;

        const alpha = p.life * 0.85;
        const radius = Math.max(0, p.size * p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 68%, ${alpha})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Hello AI</title>
        <meta name="description" content="Hello AI — an interactive particle experience." />
        <link rel="canonical" href="/" />
      </Helmet>

      <div
        className="relative w-screen h-screen overflow-hidden flex items-center justify-center"
        style={{ background: '#050510' }}
      >
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(99,102,241,0.13) 0%, transparent 70%)',
            zIndex: 0,
          }}
        />

        {/* Centered text */}
        <div className="relative z-10 text-center select-none pointer-events-none">
          <h1
            className="font-bold tracking-tight"
            style={{
              fontSize: 'clamp(3.5rem, 13vw, 10rem)',
              background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
            }}
          >
            Hello AI World!
          </h1>
          <p
            className="mt-5 text-xs tracking-[0.3em] uppercase font-mono"
            style={{ color: 'rgba(148, 163, 184, 0.45)' }}
          >
            Move your cursor
          </p>
          <p
            className="mt-8 text-xs font-mono"
            style={{ color: 'rgba(147, 197, 253, 0.8)' }}
          >
            Built with Airo Builder
          </p>
        </div>
      </div>
    </>
  );
}
