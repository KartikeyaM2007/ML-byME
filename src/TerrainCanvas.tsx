import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Props = {
  className?: string;
  /** @deprecated use fullViewport */
  heroOnly?: boolean;
  /** Fixed full-screen layer like tensortonic.com; pauses after scrolling past hero */
  fullViewport?: boolean;
};

/**
 * Animated 3D wireframe terrain (matches tensortonic.com Three.js hero).
 */
export function TerrainCanvas({
  className = 'terrain-canvas',
  heroOnly = false,
  fullViewport = false,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 18, 55);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120);
    const lookAt = new THREE.Vector3(0, -2, -12);

    const buildTerrain = (width: number, depth: number, segW: number, segD: number, color: number, opacity: number) => {
      const geo = new THREE.PlaneGeometry(width, depth, segW, segD);
      geo.rotateX(-Math.PI / 2);
      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const base = new Float32Array(pos.array.length);
      base.set(pos.array);
      return { mesh, geo, pos, base, mat };
    };

    const layerA = buildTerrain(70, 42, 96, 56, 0x00ff94, 0.95);
    const layerB = buildTerrain(90, 52, 72, 44, 0x00cc77, 0.35);
    layerB.mesh.position.y = -0.4;
    layerB.mesh.position.z = -6;
    scene.add(layerA.mesh, layerB.mesh);

    const displace = (
      pos: THREE.BufferAttribute,
      base: Float32Array,
      t: number,
      amp: number,
      speed: number,
      phase: number,
    ) => {
      for (let i = 0; i < pos.count; i += 1) {
        const ix = i * 3;
        const x = base[ix];
        const z = base[ix + 2];
        const d = Math.sqrt(x * x + z * z) * 0.04;
        const wave =
          Math.sin(x * 0.28 + t * speed + phase) * amp * (1 - d * 0.3) +
          Math.sin(z * 0.22 + t * speed * 0.85 + phase * 1.3) * amp * 0.9 +
          Math.sin((x * 0.15 + z * 0.18) + t * speed * 1.2) * amp * 0.55 +
          Math.cos(x * 0.08 - z * 0.1 + t * speed * 0.6) * amp * 0.4;
        pos.array[ix + 1] = base[ix + 1] + wave;
      }
      pos.needsUpdate = true;
    };

    let running = true;
    let raf = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 1 || h < 1) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!running) return;

      const t = clock.getElapsedTime();

      displace(layerA.pos, layerA.base, t, 2.2, 1.1, 0);
      displace(layerB.pos, layerB.base, t, 1.6, 0.9, 1.8);

      const sway = Math.sin(t * 0.22) * 0.35;
      const drift = Math.sin(t * 0.15) * 1.2;
      camera.position.set(sway + drift * 0.3, 5.5 + Math.sin(t * 0.18) * 0.4, 14 + Math.cos(t * 0.12) * 1.5);
      camera.lookAt(lookAt.x + sway * 0.5, lookAt.y, lookAt.z);

      layerA.mesh.rotation.y = Math.sin(t * 0.08) * 0.04;
      layerB.mesh.rotation.y = Math.sin(t * 0.06 + 0.5) * 0.03;

      renderer.render(scene, camera);
    };

    const syncRunning = () => {
      if (fullViewport) {
        running = window.scrollY < window.innerHeight * 1.15;
        return;
      }
      if (heroOnly) {
        const rect = wrap.getBoundingClientRect();
        running = rect.bottom > 0 && rect.top < window.innerHeight;
      }
    };

    const observer =
      heroOnly && !fullViewport && typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(() => syncRunning(), { threshold: 0 })
        : null;
    observer?.observe(wrap);

    const onScroll = () => syncRunning();

    resize();
    syncRunning();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      layerA.geo.dispose();
      layerA.mat.dispose();
      layerB.geo.dispose();
      layerB.mat.dispose();
      renderer.dispose();
    };
  }, [heroOnly, fullViewport]);

  return (
    <div ref={wrapRef} className={`terrain-canvas-wrap ${className}-wrap`} aria-hidden="true">
      <canvas ref={canvasRef} className={className} />
      <img
        className="terrain-static-fallback"
        src="/images/hero-terrain-reference.png"
        alt=""
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
