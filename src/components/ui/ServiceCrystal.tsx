"use client";

import { useEffect, useId, useRef } from "react";
import type { ServiceTone } from "@/data/services";

type Vec3 = [number, number, number];
type Face = number[];

type Palette = {
  shadow: Vec3;
  light: Vec3;
  rim: Vec3;
  mid: Vec3;
};

const PALETTES: Record<ServiceTone, Palette> = {
  mist: {
    shadow: [0.19, 0.11, 0.58],
    light: [0.29, 0.87, 0.84],
    rim: [0.98, 0.6, 0.86],
    mid: [0.32, 0.24, 0.91],
  },
  stone: {
    shadow: [0.16, 0.18, 0.2],
    light: [0.66, 0.71, 0.77],
    rim: [0.29, 0.87, 0.84],
    mid: [0.32, 0.24, 0.91],
  },
  fog: {
    shadow: [0.1, 0.11, 0.13],
    light: [0.29, 0.87, 0.84],
    rim: [0.79, 0.72, 0.96],
    mid: [0.32, 0.24, 0.91],
  },
  paper: {
    shadow: [0.19, 0.11, 0.58],
    light: [0.29, 0.87, 0.84],
    rim: [0.98, 0.6, 0.86],
    mid: [0.98, 0.6, 0.86],
  },
};

const PHI = (1 + Math.sqrt(5)) / 2;
const FACE_POOL = 20;
const LIGHT: Vec3 = [0.6, 0.9, 0.5];
const LIGHT_B: Vec3 = [-0.4, -0.3, 0.85];

function sub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function dot(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

function lerp(a: Vec3, b: Vec3, t: number): Vec3 {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function rgb(v: Vec3): string {
  const c = (n: number) => Math.round(Math.min(1, Math.max(0, n)) * 255);
  return `rgb(${c(v[0])} ${c(v[1])} ${c(v[2])})`;
}

function rotate(v: Vec3, ax: number, ay: number): Vec3 {
  const sx = Math.sin(ax);
  const cx = Math.cos(ax);
  const y1 = v[1] * cx - v[2] * sx;
  const z1 = v[1] * sx + v[2] * cx;
  const sy = Math.sin(ay);
  const cy = Math.cos(ay);
  return [v[0] * cy + z1 * sy, y1, -v[0] * sy + z1 * cy];
}

function project(v: Vec3): [number, number] {
  const persp = 1.85 / (3.1 - v[2]);
  return [v[0] * persp, -v[1] * persp];
}

const SOLIDS: Record<ServiceTone, { verts: Vec3[]; faces: Face[] }> = {
  mist: {
    verts: (
      [
        [-1, PHI, 0],
        [1, PHI, 0],
        [-1, -PHI, 0],
        [1, -PHI, 0],
        [0, -1, PHI],
        [0, 1, PHI],
        [0, -1, -PHI],
        [0, 1, -PHI],
        [PHI, 0, -1],
        [PHI, 0, 1],
        [-PHI, 0, -1],
        [-PHI, 0, 1],
      ] as Vec3[]
    ).map(normalize),
    faces: [
      [0, 11, 5],
      [0, 5, 1],
      [0, 1, 7],
      [0, 7, 10],
      [0, 10, 11],
      [1, 5, 9],
      [5, 11, 4],
      [11, 10, 2],
      [10, 7, 6],
      [7, 1, 8],
      [3, 9, 4],
      [3, 4, 2],
      [3, 2, 6],
      [3, 6, 8],
      [3, 8, 9],
      [4, 9, 5],
      [2, 4, 11],
      [6, 2, 10],
      [8, 6, 7],
      [9, 8, 1],
    ],
  },
  stone: {
    verts: [
      [-0.72, -0.72, -0.72],
      [0.72, -0.72, -0.72],
      [0.72, 0.72, -0.72],
      [-0.72, 0.72, -0.72],
      [-0.72, -0.72, 0.72],
      [0.72, -0.72, 0.72],
      [0.72, 0.72, 0.72],
      [-0.72, 0.72, 0.72],
    ],
    faces: [
      [0, 3, 2, 1],
      [4, 5, 6, 7],
      [0, 1, 5, 4],
      [3, 7, 6, 2],
      [0, 4, 7, 3],
      [1, 2, 6, 5],
    ],
  },
  fog: {
    verts: [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ],
    faces: [
      [0, 2, 4],
      [2, 1, 4],
      [1, 3, 4],
      [3, 0, 4],
      [0, 5, 2],
      [2, 5, 1],
      [1, 5, 3],
      [3, 5, 0],
    ],
  },
  paper: {
    verts: (
      [
        [0.82, 0.82, 0.82],
        [0.82, -0.82, -0.82],
        [-0.82, 0.82, -0.82],
        [-0.82, -0.82, 0.82],
      ] as Vec3[]
    ).map(normalize),
    faces: [
      [0, 1, 2],
      [0, 3, 1],
      [0, 2, 3],
      [1, 3, 2],
    ],
  },
};

const POSE: Record<ServiceTone, { ax: number; ay: number; speed: number }> = {
  mist: { ax: 0.42, ay: 0.55, speed: 0.16 },
  stone: { ax: 0.55, ay: 0.72, speed: 0.11 },
  fog: { ax: 0.35, ay: 0.9, speed: 0.14 },
  paper: { ax: 0.62, ay: 0.4, speed: 0.13 },
};

function faceFill(normal: Vec3, palette: Palette): string {
  const n = normalize(normal);
  const ndlA = Math.max(dot(n, normalize(LIGHT)), 0);
  const ndlB = Math.max(dot(n, normalize(LIGHT_B)), 0);
  const lighting = 0.5 + ndlA * 0.4 + ndlB * 0.2;
  const fresnel = (1 - Math.max(n[2], 0)) ** 2.4;
  const facet = n[0] * 0.5 + 0.5;
  const midMix = (Math.cos(facet * Math.PI * 2) * 0.5 + 0.5) * 0.32;
  let col = lerp(palette.shadow, palette.light, lighting);
  col = lerp(col, palette.mid, midMix);
  col = lerp(col, palette.rim, fresnel * 0.58);
  return rgb(col);
}

function paint(
  verts: Vec3[],
  faces: Face[],
  ax: number,
  ay: number,
  palette: Palette,
) {
  const rotated = verts.map((v) => rotate(v, ax, ay));
  const painted = faces
    .map((face) => {
      const pts = face.map((i) => rotated[i]).filter((p): p is Vec3 => Boolean(p));
      if (pts.length < 3) return null;
      const n = cross(sub(pts[1], pts[0]), sub(pts[2], pts[0]));
      if (n[2] <= 0) return null;
      const depth = pts.reduce((sum, p) => sum + p[2], 0) / pts.length;
      const points = pts
        .map((p) => {
          const [x, y] = project(p);
          return `${x.toFixed(4)},${y.toFixed(4)}`;
        })
        .join(" ");
      return { points, fill: faceFill(n, palette), depth };
    })
    .filter((face): face is { points: string; fill: string; depth: number } =>
      Boolean(face),
    );

  painted.sort((a, b) => a.depth - b.depth);
  return painted;
}

type ServiceCrystalProps = {
  tone: ServiceTone;
};

export function ServiceCrystal({ tone }: ServiceCrystalProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const clipId = useId();
  const { verts, faces } = SOLIDS[tone];
  const pose = POSE[tone];
  const palette = PALETTES[tone];
  const initial = paint(verts, faces, pose.ax, pose.ay, palette);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = [...svg.querySelectorAll("polygon")];
    let raf = 0;
    let running = false;
    let inView = true;
    let pageVisible = !document.hidden;
    const start = performance.now();

    const apply = (ax: number, ay: number) => {
      const next = paint(verts, faces, ax, ay, palette);
      next.forEach((face, i) => {
        const node = nodes[i];
        if (!node) return;
        node.setAttribute("points", face.points);
        node.setAttribute("fill", face.fill);
        node.setAttribute("opacity", "1");
      });
      for (let i = next.length; i < nodes.length; i += 1) {
        nodes[i]?.setAttribute("opacity", "0");
      }
    };

    const tick = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      const hovered = svg.closest(".group")?.matches(":hover") ?? false;
      const t = (now - start) / 1000;
      const speed = pose.speed * (hovered ? 1.8 : 1);
      apply(pose.ax + t * speed * 0.35, pose.ay + t * speed);
    };

    const startLoop = () => {
      if (running || !inView || !pageVisible) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting);
        if (inView) startLoop();
        else stopLoop();
      },
      { threshold: 0.05 },
    );
    observer.observe(svg);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) startLoop();
      else stopLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);
    startLoop();

    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [faces, palette, pose.ax, pose.ay, pose.speed, verts]);

  return (
    <svg
      ref={svgRef}
      viewBox="-1.35 -1.35 2.7 2.7"
      className="size-full"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="-1.35" y="-1.35" width="2.7" height="2.7" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {Array.from({ length: FACE_POOL }, (_, i) => {
          const face = initial[i];
          return (
            <polygon
              key={i}
              points={face?.points ?? "0,0"}
              fill={face?.fill ?? "transparent"}
              opacity={face ? 1 : 0}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="0.012"
              strokeLinejoin="round"
            />
          );
        })}
      </g>
    </svg>
  );
}
