import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Hero3DCanvasProps {
  mouseX: number;
  mouseY: number;
  isHovered?: boolean;
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

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ mouseX, mouseY, isHovered = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglAvailable] = useState(checkWebglSupported);
  const animFrameRef = useRef<number | null>(null);

  // Store target and current smoothed values
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const targetScale = useRef(1);
  const currentScale = useRef(1);

  // Update target rotation based on normalized mouse coords
  useEffect(() => {
    targetRotation.current.x = (mouseY / 400) * 0.45;
    targetRotation.current.y = (mouseX / 400) * 0.55;
  }, [mouseX, mouseY]);

  useEffect(() => {
    targetScale.current = isHovered ? 1.06 : 1.0;
  }, [isHovered]);

  useEffect(() => {
    if (!webglAvailable) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let sculptureGroup: THREE.Group;
    let mainMesh: THREE.Mesh;
    let accentMesh: THREE.Mesh;
    let knotGeometry: THREE.TorusKnotGeometry;
    let accentGeometry: THREE.TorusKnotGeometry;
    let alabasterMaterial: THREE.MeshStandardMaterial;
    let metallicMaterial: THREE.MeshStandardMaterial;

    try {
      scene = new THREE.Scene();

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
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.style.background = 'transparent';
      container.appendChild(renderer.domElement);

      // Studio Lighting setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xfffaee, 2.8);
      keyLight.position.set(3.5, 4.0, 3.0);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xd9e5f7, 1.4);
      fillLight.position.set(-3.5, -1.5, 2.5);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
      rimLight.position.set(0, 3.5, -3.0);
      scene.add(rimLight);

      sculptureGroup = new THREE.Group();

      // Warm Alabaster PBR Material (Soft matte editorial stone)
      alabasterMaterial = new THREE.MeshStandardMaterial({
        color: 0xf7f5ee,
        roughness: 0.32,
        metalness: 0.08,
        flatShading: false,
      });

      // Polished Slate Titanium Metallic Material (Restrained accent)
      metallicMaterial = new THREE.MeshStandardMaterial({
        color: 0x2b4b7c,
        roughness: 0.18,
        metalness: 0.82,
        wireframe: false,
      });

      // Parametric Torus Knot (Sculptural folded ribbon - scaled to avoid clipping)
      knotGeometry = new THREE.TorusKnotGeometry(0.82, 0.22, 128, 32, 2, 3);
      mainMesh = new THREE.Mesh(knotGeometry, alabasterMaterial);
      sculptureGroup.add(mainMesh);

      // Slender metallic edge ribbon that twists along with the sculpture
      accentGeometry = new THREE.TorusKnotGeometry(0.85, 0.035, 128, 16, 2, 3);
      accentMesh = new THREE.Mesh(accentGeometry, metallicMaterial);
      sculptureGroup.add(accentMesh);

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
      currentScale.current += (targetScale.current - currentScale.current) * 0.08;

      if (sculptureGroup) {
        // Slow majestic idle rotation + smooth cursor parallax
        sculptureGroup.rotation.x = 0.35 + Math.sin(time * 0.4) * 0.1 + currentRotation.current.x;
        sculptureGroup.rotation.y = time * 0.22 + currentRotation.current.y;
        sculptureGroup.rotation.z = Math.cos(time * 0.3) * 0.08;

        // Subtle organic float / breathing
        sculptureGroup.position.y = Math.sin(time * 0.75) * 0.06;
        sculptureGroup.position.x = Math.cos(time * 0.5) * 0.04;

        sculptureGroup.scale.setScalar(currentScale.current);
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth || 360;
      const newHeight = container.clientHeight || 360;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
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
        knotGeometry?.dispose();
        accentGeometry?.dispose();
        alabasterMaterial?.dispose();
        metallicMaterial?.dispose();
      } catch {}
    };
  }, [webglAvailable]);

  if (!webglAvailable) {
    return (
      <div className="w-full h-full flex items-center justify-center pointer-events-none select-none">
        <div className="w-32 h-32 rounded-full border border-[#2b4b7c]/20 bg-gradient-to-tr from-[#faf9f6] to-[#e8e4db] shadow-inner opacity-75" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      data-cursor="EXPLORE"
      className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-84 lg:h-84 relative flex items-center justify-center select-none pointer-events-auto cursor-grab active:cursor-grabbing"
    />
  );
};
