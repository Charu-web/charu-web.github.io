import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Hero3DCanvasProps {
  mouseX: number;
  mouseY: number;
  isHovered?: boolean;
  className?: string;
}

const checkWebglSupported = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
};

/**
 * Generates an interconnected continuous 3D harmonic loop representing software architecture,
 * interconnected systems, APIs, and data flows.
 */
function createArchitecturalCurve(): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [];
  const segments = 120;
  for (let i = 0; i < segments; i++) {
    const phi = (i / segments) * Math.PI * 2;
    const cu = Math.cos(3 * phi);
    const su = Math.sin(3 * phi);
    const cv = Math.cos(2 * phi);
    const sv = Math.sin(2 * phi);

    const r = 1.22 + 0.30 * cu;
    const x = r * cv * 1.05;
    const y = r * sv * 0.96;
    const z = su * 0.70 + Math.sin(4 * phi) * 0.18;
    points.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(points, true);
}

/**
 * Generates an interlocking slender stream that weaves perpendicularly through the main architecture,
 * representing real-time API integrations and data packets.
 */
function createDataStreamCurve(): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [];
  const segments = 100;
  for (let i = 0; i < segments; i++) {
    const phi = (i / segments) * Math.PI * 2;
    const x = Math.sin(phi) * 1.48 + Math.cos(3 * phi) * 0.20;
    const y = Math.cos(phi) * 0.85;
    const z = Math.sin(2 * phi) * 0.78;
    points.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(points, true);
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({
  mouseX,
  mouseY,
  isHovered = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglAvailable] = useState(checkWebglSupported);
  const animFrameRef = useRef<number | null>(null);

  // Parallax rotation values (capped to 3-5 degrees ~ 0.05-0.08 rad)
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const targetHoverScale = useRef(1);
  const currentHoverScale = useRef(1);

  // Update target rotation from parent mouse coordinates
  useEffect(() => {
    // 0.065 rad is approx 3.7 degrees maximum tilt
    targetRotation.current.x = (mouseY / 500) * 0.065;
    targetRotation.current.y = (mouseX / 500) * 0.075;
  }, [mouseX, mouseY]);

  useEffect(() => {
    targetHoverScale.current = isHovered ? 1.03 : 1.0;
  }, [isHovered]);

  useEffect(() => {
    if (!webglAvailable) return;

    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let sculptureGroup: THREE.Group;
    let mainGeometry: THREE.TubeGeometry;
    let streamGeometry: THREE.TubeGeometry;
    const nodeGeometries: THREE.BufferGeometry[] = [];
    let alabasterMaterial: THREE.MeshPhysicalMaterial;
    let streamMaterial: THREE.MeshStandardMaterial;
    let nodeMaterial: THREE.MeshStandardMaterial;

    try {
      scene = new THREE.Scene();

      // Camera configured for comfortable, breathing 3D framing
      camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
      camera.position.set(0, 0, 5.2);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.10;
      renderer.domElement.style.background = 'transparent';
      container.appendChild(renderer.domElement);

      // Studio Lighting System
      // 1. Ambient baseline
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
      scene.add(ambientLight);

      // 2. Warm Key Light (top-right studio spotlight)
      const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.8);
      keyLight.position.set(3.8, 4.2, 3.2);
      scene.add(keyLight);

      // 3. Cool Fill Light (bottom-left bounce)
      const fillLight = new THREE.DirectionalLight(0xdbe6f6, 1.5);
      fillLight.position.set(-3.5, -1.8, 2.2);
      scene.add(fillLight);

      // 4. Rim Back Light (defines silhouettes and bevels)
      const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
      rimLight.position.set(0, 3.5, -3.2);
      scene.add(rimLight);

      // 5. Subtle Upward Bounce Light
      const bounceLight = new THREE.DirectionalLight(0xf5f3ea, 0.65);
      bounceLight.position.set(0, -3.2, 1.4);
      scene.add(bounceLight);

      sculptureGroup = new THREE.Group();

      // Material 1: Matte Alabaster Porcelain (Warm ivory, soft micro-roughness, zero plastic gloss)
      alabasterMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xfcfbf7,
        roughness: 0.36,
        metalness: 0.04,
        clearcoat: 0.12,
        clearcoatRoughness: 0.20,
        reflectivity: 0.42,
      });

      // Material 2: Satin Titanium Accent Ribbon (Restrained deep navy blue)
      streamMaterial = new THREE.MeshStandardMaterial({
        color: 0x2b4b7c,
        roughness: 0.22,
        metalness: 0.82,
      });

      // Material 3: Brushed Slate Nodes
      nodeMaterial = new THREE.MeshStandardMaterial({
        color: 0x1d3557,
        roughness: 0.26,
        metalness: 0.88,
      });

      // 1. Primary Architecture Form: Interconnected tubular loop
      const archCurve = createArchitecturalCurve();
      mainGeometry = new THREE.TubeGeometry(archCurve, 180, 0.22, 32, true);
      const mainMesh = new THREE.Mesh(mainGeometry, alabasterMaterial);
      sculptureGroup.add(mainMesh);

      // 2. Interlocking Data Stream: Slender orbital ribbon threading through the center
      const streamCurve = createDataStreamCurve();
      streamGeometry = new THREE.TubeGeometry(streamCurve, 150, 0.038, 20, true);
      const streamMesh = new THREE.Mesh(streamGeometry, streamMaterial);
      sculptureGroup.add(streamMesh);

      // 3. System Connection Nodes (Architectural junctions representing network APIs)
      const junctionCoords = [
        new THREE.Vector3(1.24, 0.46, 0.26),
        new THREE.Vector3(-1.20, -0.52, -0.22),
        new THREE.Vector3(0.08, 1.08, 0.56),
        new THREE.Vector3(-0.12, -1.05, -0.52),
      ];

      junctionCoords.forEach((pos) => {
        // Micro connector ring
        const ringGeom = new THREE.TorusGeometry(0.10, 0.018, 16, 24);
        nodeGeometries.push(ringGeom);
        const ringMesh = new THREE.Mesh(ringGeom, nodeMaterial);
        ringMesh.position.copy(pos);
        ringMesh.lookAt(pos.clone().multiplyScalar(1.5));
        sculptureGroup.add(ringMesh);

        // Micro core bead
        const beadGeom = new THREE.SphereGeometry(0.042, 16, 16);
        nodeGeometries.push(beadGeom);
        const beadMesh = new THREE.Mesh(beadGeom, streamMaterial);
        beadMesh.position.copy(pos);
        sculptureGroup.add(beadMesh);
      });

      // Calibrated scale to ensure comfortable framing without edge clipping
      sculptureGroup.scale.setScalar(0.85);
      sculptureGroup.rotation.set(0.36, -0.20, 0.10);
      scene.add(sculptureGroup);
    } catch (e) {
      console.warn('Hero3DCanvas WebGL fallback:', e);
      return;
    }

    const startTime = performance.now();
    let isComponentMounted = true;

    const animate = () => {
      if (!isComponentMounted) return;

      const time = (performance.now() - startTime) * 0.001;

      // Smooth damped spring interpolation for mouse interaction
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;
      currentHoverScale.current += (targetHoverScale.current - currentHoverScale.current) * 0.06;

      if (sculptureGroup) {
        // Slow majestic idle rotation + subtle 3-5° interactive parallax
        sculptureGroup.rotation.x = 0.35 + Math.sin(time * 0.32) * 0.07 + currentRotation.current.x;
        sculptureGroup.rotation.y = time * 0.16 + currentRotation.current.y;
        sculptureGroup.rotation.z = 0.10 + Math.cos(time * 0.25) * 0.04;

        // Subtle organic float / breathing
        sculptureGroup.position.y = Math.sin(time * 0.60) * 0.04;
        sculptureGroup.position.x = Math.cos(time * 0.40) * 0.03;

        sculptureGroup.scale.setScalar(0.85 * currentHoverScale.current);
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 400;
      height = container.clientHeight || 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isComponentMounted = false;
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      try {
        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
        mainGeometry?.dispose();
        streamGeometry?.dispose();
        nodeGeometries.forEach((g) => g.dispose());
        alabasterMaterial?.dispose();
        streamMaterial?.dispose();
        nodeMaterial?.dispose();
      } catch {}
    };
  }, [webglAvailable]);

  if (!webglAvailable) {
    return (
      <div className={`w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}>
        <div className="w-40 h-40 rounded-full border border-[#2b4b7c]/20 bg-gradient-to-tr from-[#faf9f6] to-[#e8e4db] shadow-inner opacity-75" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      data-cursor="EXPLORE"
      className={`w-full h-full relative select-none pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center ${className}`}
    />
  );
};
