"use client";

import { useEffect, useRef } from "react";

/* ── Brand colors (shader uniforms) ─────────────────────────────────────── */
const C = {
  base: "#4ADED7",
  glow: "#FA99DB",
  mid: "#FDF500",
} as const;

type Preset = {
  amplitude: number;
  frequency: number;
  speed: number;
  colorBase: string;
  colorGlow: string;
  colorMid: string;
};

const PRESETS: Preset[] = [
  /* 0 — Hero: bioluminescent glass */
  {
    amplitude: 0.38,
    frequency: 1.15,
    speed: 0.14,
    colorBase: C.base,
    colorGlow: C.glow,
    colorMid: C.mid,
  },
  /* 1 — Work / About: brushed chrome */
  {
    amplitude: 0.26,
    frequency: 1.85,
    speed: 0.2,
    colorBase: "#4ADED7",
    colorGlow: "#A8B4C4",
    colorMid: "#523EE7",
  },
  /* 2 — Services / Contact: molten warmth */
  {
    amplitude: 0.44,
    frequency: 0.95,
    speed: 0.1,
    colorBase: "#FA99DB",
    colorGlow: "#FDF500",
    colorMid: "#4ADED7",
  },
];

const LERP = 0.05;
const THREE_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

function hexToVec3(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function lerpValue(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}

function lerpColor(
  current: [number, number, number],
  target: [number, number, number],
  factor: number,
): [number, number, number] {
  return [
    lerpValue(current[0], target[0], factor),
    lerpValue(current[1], target[1], factor),
    lerpValue(current[2], target[2], factor),
  ];
}

function lerpPreset(a: Preset, b: Preset, t: number) {
  const k = Math.min(1, Math.max(0, t));
  return {
    amplitude: a.amplitude + (b.amplitude - a.amplitude) * k,
    frequency: a.frequency + (b.frequency - a.frequency) * k,
    speed: a.speed + (b.speed - a.speed) * k,
    colorBase: lerpColor(hexToVec3(a.colorBase), hexToVec3(b.colorBase), k),
    colorGlow: lerpColor(hexToVec3(a.colorGlow), hexToVec3(b.colorGlow), k),
    colorMid: lerpColor(hexToVec3(a.colorMid), hexToVec3(b.colorMid), k),
  };
}

/** Morph across presets using #hero-pin scrub progress (0→1 over 1vh). */
function morphFromPinScrub() {
  const pin = document.getElementById("hero-pin");
  if (!pin) return lerpPreset(PRESETS[0], PRESETS[0], 0);

  const total = pin.offsetHeight - window.innerHeight;
  if (total <= 0) return lerpPreset(PRESETS[0], PRESETS[0], 0);

  const scrolled = -pin.getBoundingClientRect().top;
  const t = Math.min(1, Math.max(0, scrolled / total));

  if (t < 0.5) return lerpPreset(PRESETS[0], PRESETS[1], t * 2);
  return lerpPreset(PRESETS[1], PRESETS[2], (t - 0.5) * 2);
}

/* Ashima 3D simplex noise (vertex shader, inlined) */
const SIMPLEX_NOISE = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const VERTEX_SHADER = /* glsl */ `
${SIMPLEX_NOISE}

uniform float uTime;
uniform float uAmplitude;
uniform float uFrequency;
uniform float uSpeed;

varying vec3 vPos;
varying vec3 vNormal;

void main() {
  float t = uTime * uSpeed;
  float n1 = snoise(position * uFrequency + vec3(t, t * 0.7, t * 0.4));
  float n2 = snoise(position * uFrequency * 2.35 + vec3(-t * 0.5, t, t * 0.3)) * 0.5;
  float displacement = (n1 + n2) * uAmplitude;
  vec3 displaced = position + normal * displacement;

  vNormal = normalMatrix * normal;
  vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
  vPos = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

varying vec3 vPos;
varying vec3 vNormal;

uniform vec3 uColorBase;
uniform vec3 uColorGlow;
uniform vec3 uColorMid;
uniform vec3 uLightA;
uniform vec3 uLightB;

void main() {
  vec3 facetNormal = normalize(cross(dFdx(vPos), dFdy(vPos)));

  vec3 viewDir = normalize(cameraPosition - vPos);
  float fresnel = pow(1.0 - clamp(dot(facetNormal, viewDir), 0.0, 1.0), 2.8);

  float ndlA = max(dot(facetNormal, normalize(uLightA)), 0.0);
  float ndlB = max(dot(facetNormal, normalize(uLightB)), 0.0);
  float lighting = 0.42 + ndlA * 0.38 + ndlB * 0.22;

  float facetAngle = dot(facetNormal, vec3(0.57735026919)) * 0.5 + 0.5;
  float paletteT = facetAngle + fresnel * 0.55;

  vec3 palette = uColorBase
    + uColorMid * cos(6.2831853 * (vec3(0.55, 0.35, 0.25) * paletteT + uColorGlow * 0.15));

  vec3 rim = uColorGlow * fresnel * 1.1;
  vec3 col = palette * (lighting * 1.15) + rim;

  vec3 deep = vec3(0.06, 0.07, 0.11);
  col = mix(deep, col, clamp(lighting + fresnel * 0.65, 0.45, 1.0));

  gl_FragColor = vec4(col, 1.0);
}
`;

/* Minimal Three.js r128 surface (loaded from CDN at runtime). */
type ThreeNS = {
  Scene: new () => ThreeScene;
  PerspectiveCamera: new (
    fov: number,
    aspect: number,
    near: number,
    far: number,
  ) => ThreeCamera;
  WebGLRenderer: new (params: {
    canvas: HTMLCanvasElement;
    antialias: boolean;
    alpha: boolean;
  }) => ThreeRenderer;
  IcosahedronGeometry: new (radius: number, detail: number) => ThreeGeometry;
  ShaderMaterial: new (params: ThreeShaderParams) => ThreeMaterial;
  Mesh: new (geometry: ThreeGeometry, material: ThreeMaterial) => ThreeMesh;
  Vector3: new (x: number, y: number, z: number) => ThreeVector3;
  Clock: new () => ThreeClock;
};

type ThreeVector3 = {
  set: (x: number, y: number, z: number) => void;
  normalize: () => ThreeVector3;
};

type ThreeUniforms = Record<
  string,
  { value: number | ThreeVector3 }
>;

type ThreeShaderParams = {
  uniforms: ThreeUniforms;
  vertexShader: string;
  fragmentShader: string;
  extensions?: { derivatives: boolean };
};

type ThreeGeometry = { dispose: () => void };
type ThreeMaterial = {
  uniforms: ThreeUniforms;
  extensions: { derivatives: boolean };
  dispose: () => void;
};
type ThreeMesh = {
  rotation: { x: number; y: number; z: number };
  geometry: ThreeGeometry;
};
type ThreeScene = { add: (obj: ThreeMesh) => void };
type ThreeCamera = {
  position: { set: (x: number, y: number, z: number) => void };
  aspect: number;
  updateProjectionMatrix: () => void;
};
type ThreeRenderer = {
  setPixelRatio: (ratio: number) => void;
  setSize: (w: number, h: number, updateStyle: boolean) => void;
  setClearColor: (color: number, alpha: number) => void;
  render: (scene: ThreeScene, camera: ThreeCamera) => void;
  dispose: () => void;
};
type ThreeClock = { getElapsedTime: () => number };

function loadThree(): Promise<ThreeNS> {
  return new Promise((resolve, reject) => {
    if (window.THREE) {
      resolve(window.THREE);
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-hero-webgl="three"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(window.THREE!));
      existing.addEventListener("error", () =>
        reject(new Error("Three.js failed to load")),
      );
      return;
    }
    const script = document.createElement("script");
    script.src = THREE_CDN;
    script.async = true;
    script.dataset.heroWebgl = "three";
    script.onload = () => resolve(window.THREE!);
    script.onerror = () => reject(new Error("Three.js failed to load"));
    document.head.appendChild(script);
  });
}

declare global {
  interface Window {
    THREE?: ThreeNS;
  }
}

export function HeroWebGL() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let raf = 0;
    let renderer: ThreeRenderer | null = null;

    const mouse = { x: 0, y: 0 };
    const targetRot = { x: 0, y: 0 };
    const currentRot = { x: 0, y: 0 };

    const current = {
      amplitude: PRESETS[0].amplitude,
      frequency: PRESETS[0].frequency,
      speed: PRESETS[0].speed,
      colorBase: hexToVec3(PRESETS[0].colorBase),
      colorGlow: hexToVec3(PRESETS[0].colorGlow),
      colorMid: hexToVec3(PRESETS[0].colorMid),
    };

    let target = morphFromPinScrub();

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      targetRot.x = mouse.y * 0.45;
      targetRot.y = mouse.x * 0.65;
    };

    const onScroll = () => {
      target = morphFromPinScrub();
    };

    const onResize = () => {
      if (!renderer) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    let camera: ThreeCamera;
    let material: ThreeMaterial;
    let mesh: ThreeMesh;

    loadThree()
      .then((THREE) => {
        if (disposed) return;

        const scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.1,
          100,
        );
        camera.position.set(0, 0, 5.2);

        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        renderer.setClearColor(0x000000, 0);

        const geometry = new THREE.IcosahedronGeometry(1.6, 32);
        material = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uAmplitude: { value: current.amplitude },
            uFrequency: { value: current.frequency },
            uSpeed: { value: current.speed },
            uColorBase: { value: new THREE.Vector3(...current.colorBase) },
            uColorGlow: { value: new THREE.Vector3(...current.colorGlow) },
            uColorMid: { value: new THREE.Vector3(...current.colorMid) },
            uLightA: { value: new THREE.Vector3(0.6, 0.9, 0.5).normalize() },
            uLightB: { value: new THREE.Vector3(-0.4, -0.3, 0.85).normalize() },
          },
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
        });
        material.extensions.derivatives = true;

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize, { passive: true });
        onScroll();

        const clock = new THREE.Clock();

        const tick = () => {
          if (disposed) return;
          raf = requestAnimationFrame(tick);

          const elapsed = clock.getElapsedTime();
          material.uniforms.uTime.value = elapsed;

          current.amplitude = lerpValue(current.amplitude, target.amplitude, LERP);
          current.frequency = lerpValue(current.frequency, target.frequency, LERP);
          current.speed = lerpValue(current.speed, target.speed, LERP);
          current.colorBase = lerpColor(current.colorBase, target.colorBase, LERP);
          current.colorGlow = lerpColor(current.colorGlow, target.colorGlow, LERP);
          current.colorMid = lerpColor(current.colorMid, target.colorMid, LERP);

          material.uniforms.uAmplitude.value = current.amplitude;
          material.uniforms.uFrequency.value = current.frequency;
          material.uniforms.uSpeed.value = current.speed;
          (material.uniforms.uColorBase.value as ThreeVector3).set(
            ...current.colorBase,
          );
          (material.uniforms.uColorGlow.value as ThreeVector3).set(
            ...current.colorGlow,
          );
          (material.uniforms.uColorMid.value as ThreeVector3).set(
            ...current.colorMid,
          );

          currentRot.x = lerpValue(currentRot.x, targetRot.x, LERP);
          currentRot.y = lerpValue(currentRot.y, targetRot.y, LERP);
          mesh.rotation.x = currentRot.x;
          mesh.rotation.y = currentRot.y + elapsed * 0.12;
          mesh.rotation.z = elapsed * 0.04;

          renderer!.render(scene, camera);
        };

        tick();
      })
      .catch((err) => {
        console.error("[HeroWebGL]", err);
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (renderer) {
        renderer.dispose();
        mesh?.geometry.dispose();
        material?.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
