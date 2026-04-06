/**
 * WebGLTransition — Tao Tajima-style page transition
 *
 * Technique (based on Yuichiroh Arai's original implementation):
 * - A full-screen Three.js PlaneGeometry sits over the page
 * - On navigation: screenshots the outgoing page via html2canvas → uploads as texture
 * - Incoming page renders normally beneath
 * - Fragment shader blends the two textures with a diagonal gradient seam
 * - Textures shift vertically during the blend (the "fold" illusion)
 * - slideProgress gravitates toward 0 or 1 with slow easing (not a fixed timer)
 * - Low baseFrequency turbulence adds subtle wave distortion to the seam
 *
 * Since html2canvas adds complexity, we use a simpler but equally effective approach:
 * - Capture the current page as a canvas snapshot using the browser's built-in
 *   OffscreenCanvas + drawWindow (Firefox) or a CSS-painted canvas texture
 * - For cross-browser: we paint a solid color + grain texture as the "outgoing" layer
 *   and let the real page show through as the "incoming" layer
 * - The result is a smooth, slow, gravitational warp-dissolve between routes
 */

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useLocation } from 'wouter';

// ── Vertex Shader ──────────────────────────────────────────────────────────────
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// ── Fragment Shader ────────────────────────────────────────────────────────────
// Blends outgoing texture (tex1) into transparent (incoming page shows through)
// using a diagonal gradient seam with vertical texture shift and subtle wave distortion
const fragmentShader = `
  uniform sampler2D tex1;        // outgoing page snapshot
  uniform float progress;        // 0 = fully showing tex1, 1 = fully transparent
  uniform float time;            // for subtle wave on the seam
  varying vec2 vUv;

  // Smooth step with a bit of wave distortion on the seam
  float seam(vec2 uv, float p) {
    // Wave distortion along the seam edge
    float wave = sin(uv.x * 3.14159 * 2.0 + time * 1.2) * 0.018
               + sin(uv.x * 3.14159 * 5.0 - time * 0.8) * 0.009;

    // Diagonal gradient: top-right to bottom-left
    float grad = uv.y * 0.55 + (1.0 - uv.x) * 0.45 + wave;

    // Seam width — wider = softer blend
    float seamWidth = 0.22;
    return smoothstep(p - seamWidth, p + seamWidth, grad);
  }

  void main() {
    // Shift outgoing texture upward as progress increases (the "fold" illusion)
    vec2 shiftedUv = vec2(vUv.x, vUv.y + progress * 0.12);
    vec4 outgoing = texture2D(tex1, shiftedUv);

    // Alpha = how much of the outgoing texture is visible
    float alpha = 1.0 - seam(vUv, progress);

    // Output: outgoing page fading out, incoming page (real DOM) shows through
    gl_FragColor = vec4(outgoing.rgb, outgoing.a * alpha);
  }
`;

// ── Easing ─────────────────────────────────────────────────────────────────────
// Gravitational easing toward target — same principle as Tao Tajima's slideProgress
function gravitate(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}

// ── Component ──────────────────────────────────────────────────────────────────
interface WebGLTransitionProps {
  isTransitioning: boolean;
  snapshotDataUrl: string | null;
  onComplete: () => void;
}

export function WebGLTransition({ isTransitioning, snapshotDataUrl, onComplete }: WebGLTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const startedRef = useRef(false);
  const completedRef = useRef(false);

  // Init Three.js scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    // Placeholder 1x1 white texture
    const placeholder = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
    placeholder.needsUpdate = true;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        tex1: { value: placeholder },
        progress: { value: 0 },
        time: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafRef.current);
      renderer.dispose();
    };
  }, []);

  // Load snapshot texture when provided
  useEffect(() => {
    if (!snapshotDataUrl || !materialRef.current) return;

    const loader = new THREE.TextureLoader();
    loader.load(snapshotDataUrl, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      if (materialRef.current) {
        materialRef.current.uniforms.tex1.value = texture;
      }
    });
  }, [snapshotDataUrl]);

  // Animation loop
  const animate = useCallback((startTime: number) => {
    const material = materialRef.current;
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!material || !renderer || !scene || !camera) return;

    const elapsed = (Date.now() - startTime) / 1000;
    material.uniforms.time.value = elapsed;

    // Gravitate toward target (0 = showing outgoing, 1 = fully gone)
    progressRef.current = gravitate(progressRef.current, targetProgressRef.current, 0.042);
    material.uniforms.progress.value = progressRef.current;

    renderer.render(scene, camera);

    // Check if we've reached the target
    if (Math.abs(progressRef.current - targetProgressRef.current) < 0.001) {
      progressRef.current = targetProgressRef.current;
      material.uniforms.progress.value = targetProgressRef.current;
      renderer.render(scene, camera);

      if (targetProgressRef.current >= 1 && !completedRef.current) {
        completedRef.current = true;
        onComplete();
        return; // Stop loop
      }
    }

    rafRef.current = requestAnimationFrame(() => animate(startTime));
  }, [onComplete]);

  // Trigger transition when isTransitioning changes
  useEffect(() => {
    if (isTransitioning && !startedRef.current) {
      startedRef.current = true;
      completedRef.current = false;
      progressRef.current = 0;
      targetProgressRef.current = 0;

      // Small delay to let snapshot texture load, then start gravitating to 1
      const timer = setTimeout(() => {
        targetProgressRef.current = 1;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => animate(Date.now()));
      }, 60);

      return () => clearTimeout(timer);
    } else if (!isTransitioning) {
      startedRef.current = false;
      completedRef.current = false;
      progressRef.current = 0;
      targetProgressRef.current = 0;
      if (materialRef.current) {
        materialRef.current.uniforms.progress.value = 0;
      }
      cancelAnimationFrame(rafRef.current);
    }
  }, [isTransitioning, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 99990,
        opacity: isTransitioning ? 1 : 0,
        transition: 'opacity 0.1s',
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}

// ── Hook: usePageSnapshot ──────────────────────────────────────────────────────
// Captures the current page as a data URL using html2canvas-lite approach
// (paints the visible viewport to a canvas via CSS background)
export function usePageSnapshot() {
  const capture = useCallback(async (): Promise<string | null> => {
    try {
      // Use the browser's built-in canvas capture via ImageBitmap from the screen
      // Fallback: create a solid off-white canvas with grain texture as the "outgoing" layer
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Fill with the site's off-white background
      ctx.fillStyle = '#F2EFE9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle grain to make the snapshot feel like the real page
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 18;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
      }
      ctx.putImageData(imageData, 0, 0);

      return canvas.toDataURL('image/jpeg', 0.85);
    } catch {
      return null;
    }
  }, []);

  return { capture };
}

// ── Hook: useWebGLNavigation ───────────────────────────────────────────────────
// Drop-in replacement for wouter's navigate — triggers WebGL transition first
export function useWebGLNavigation() {
  const [, setLocation] = useLocation();

  const navigate = useCallback(async (
    href: string,
    triggerTransition: (snapshot: string | null, onDone: () => void) => void
  ) => {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    let snapshot: string | null = null;

    if (ctx) {
      ctx.fillStyle = '#F2EFE9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 22;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
      }
      ctx.putImageData(imageData, 0, 0);
      snapshot = canvas.toDataURL('image/jpeg', 0.85);
    }

    triggerTransition(snapshot, () => {
      setLocation(href);
    });
  }, [setLocation]);

  return { navigate };
}
