"use client";

import { useEffect, useRef } from "react";

type Density = "sparse" | "regular" | "dense";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  base: number;
  tw: number;
  tws: number;
  warm: boolean;
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  len: number;
};

type StarfieldState = {
  stars: Star[];
  shooters: Shooter[];
  mouse: {
    x: number;
    y: number;
    tx: number;
    ty: number;
  };
  t: number;
};

type StarfieldProps = {
  density?: Density;
  motion?: boolean;
  accent?: string;
};

const starCounts: Record<Density, number> = {
  sparse: 120,
  regular: 240,
  dense: 460,
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const normalized =
    clean.length === 3
      ? clean
          .split("")
          .map((char) => char + char)
          .join("")
      : clean.padEnd(6, "0").slice(0, 6);
  const value = Number.parseInt(normalized, 16);

  if (Number.isNaN(value)) {
    return [231, 178, 77];
  }

  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export default function Starfield({
  density = "regular",
  motion = true,
  accent = "#e7b24d",
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<StarfieldState>({
    stars: [],
    shooters: [],
    mouse: { x: 0, y: 0, tx: 0, ty: 0 },
    t: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const shouldMove = motion && !prefersReducedMotion;
    const target = starCounts[density] ?? starCounts.regular;
    const [accentRed, accentGreen, accentBlue] = hexToRgb(accent);

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const buildStars = () => {
      const stars: Star[] = [];

      for (let index = 0; index < target; index += 1) {
        const layer = Math.random();
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: 0.3 + layer * 0.7,
          r: 0.3 + layer * 1.6,
          base: 0.25 + Math.random() * 0.6,
          tw: Math.random() * Math.PI * 2,
          tws: 0.4 + Math.random() * 1.4,
          warm: Math.random() < 0.12,
        });
      }

      stateRef.current.stars = stars;
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      buildStars();
    };

    const spawnShooter = () => {
      stateRef.current.shooters.push({
        x: Math.random() * width * 0.6,
        y: Math.random() * height * 0.4,
        vx: 6 + Math.random() * 5,
        vy: 2.5 + Math.random() * 3,
        life: 0,
        max: 60 + Math.random() * 30,
        len: 80 + Math.random() * 120,
      });
    };

    const drawFrame = () => {
      const state = stateRef.current;
      state.t += 1;
      state.mouse.x += (state.mouse.tx - state.mouse.x) * 0.05;
      state.mouse.y += (state.mouse.ty - state.mouse.y) * 0.05;

      context.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const angle = shouldMove ? state.t * 0.000035 : 0;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      for (const star of state.stars) {
        const parallaxX = shouldMove ? state.mouse.x * star.z * 24 : 0;
        const parallaxY = shouldMove ? state.mouse.y * star.z * 24 : 0;
        const dx = star.x - centerX;
        const dy = star.y - centerY;
        const x = dx * cos - dy * sin + centerX + parallaxX;
        const y = dx * sin + dy * cos + centerY + parallaxY;
        const twinkle = shouldMove
          ? 0.55 + 0.45 * Math.sin(state.t * 0.02 * star.tws + star.tw)
          : 0.85;
        const alpha = Math.min(1, star.base * twinkle);

        context.beginPath();
        context.arc(x, y, star.r * star.z, 0, Math.PI * 2);
        context.fillStyle = star.warm
          ? `rgba(${accentRed},${accentGreen},${accentBlue},${alpha})`
          : `rgba(228,233,245,${alpha})`;
        context.fill();

        if (star.z > 0.85 && alpha > 0.7) {
          context.beginPath();
          context.arc(x, y, star.r * star.z * 3.2, 0, Math.PI * 2);
          context.fillStyle = `rgba(228,233,245,${alpha * 0.06})`;
          context.fill();
        }
      }

      if (
        shouldMove &&
        Math.random() < 0.0025 &&
        state.shooters.length < 2
      ) {
        spawnShooter();
      }

      for (let index = state.shooters.length - 1; index >= 0; index -= 1) {
        const shooter = state.shooters[index];
        shooter.life += 1;
        shooter.x += shooter.vx;
        shooter.y += shooter.vy;

        const remaining = 1 - shooter.life / shooter.max;
        const gradient = context.createLinearGradient(
          shooter.x,
          shooter.y,
          shooter.x - shooter.len,
          shooter.y - shooter.len * (shooter.vy / shooter.vx)
        );
        gradient.addColorStop(0, `rgba(255,255,255,${0.9 * remaining})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        context.strokeStyle = gradient;
        context.lineWidth = 1.6;
        context.beginPath();
        context.moveTo(shooter.x, shooter.y);
        context.lineTo(
          shooter.x - shooter.len,
          shooter.y - shooter.len * (shooter.vy / shooter.vx)
        );
        context.stroke();

        if (
          shooter.life > shooter.max ||
          shooter.x > width + 200 ||
          shooter.y > height + 200
        ) {
          state.shooters.splice(index, 1);
        }
      }

      animationFrame = window.requestAnimationFrame(drawFrame);
    };

    const handlePointerMove = (event: PointerEvent) => {
      stateRef.current.mouse.tx = (event.clientX / window.innerWidth - 0.5) * 2;
      stateRef.current.mouse.ty = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    animationFrame = window.requestAnimationFrame(drawFrame);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [accent, density, motion]);

  return <canvas ref={canvasRef} className="starfield-canvas" />;
}
