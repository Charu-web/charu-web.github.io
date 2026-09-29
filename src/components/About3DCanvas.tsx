import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const checkWebglSupported = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
};

export const About3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglAvailable] = useState(checkWebglSupported);

  // Target and smoothed rotation for subtle mouse parallax
  const targetRot = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!webglAvailable) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 220;
    const height = container.clientHeight || 220;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let sculptureGroup: THREE.Group;
    let solidMesh: THREE.Mesh;
    let wireframeMesh: THREE.LineSegments;
    let solidGeometry: THREE.IcosahedronGeometry;
    let solidMaterial: THREE.MeshStandardMaterial;
    let wireGeometry: THREE.WireframeGeometry;
    let wireMaterial: THREE.LineBasicMaterial;
    let animationFrameId: number;

    try {
      scene = new THREE.Scene();

      // Camera with consistent framing: FOV 38 at z=4.0 ensures 0% clipping
      camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
      camera.position.set(0, 0, 4.0);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.domElement.style.background = 'transparent';
      container.appendChild(renderer.domElement);

      // Soft directional studio lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xfffaee, 1.8);
      keyLight.position.set(3, 4, 3);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xdbe5f3, 0.9);
      fillLight.position.set(-3, -2, 2);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
      rimLight.position.set(0, 3, -3);
      scene.add(rimLight);

      // Single unified group containing both solid sculpture & intentional wireframe shell
      sculptureGroup = new THREE.Group();
      // Position slightly above visual center so the bottom label balances naturally
      sculptureGroup.position.set(0, 0.06, 0);

      // 1. Solid matte digital art sculpture (scaled to 68% of original size)
      solidGeometry = new THREE.IcosahedronGeometry(0.68, 1);
      solidMaterial = new THREE.MeshStandardMaterial({
        color: 0xf5f3ee,
        roughness: 0.44,
        metalness: 0.06,
        flatShading: true, // Elegant architectural facets
      });
      solidMesh = new THREE.Mesh(solidGeometry, solidMaterial);
      sculptureGroup.add(solidMesh);

      // 2. Intentional architectural wireframe shell tightly hugging the sculpture
      // Scaled to 0.70 (just 3% larger than solid, preventing any protruding spikes or boundary touching)
      const wireBaseGeo = new THREE.IcosahedronGeometry(0.70, 1);
      wireGeometry = new THREE.WireframeGeometry(wireBaseGeo);
      wireMaterial = new THREE.LineBasicMaterial({
        color: 0x2b4b7c,
        transparent: true,
        opacity: 0.14, // Subtle, non-competing contour
      });
      wireframeMesh = new THREE.LineSegments(wireGeometry, wireMaterial);
      sculptureGroup.add(wireframeMesh);
      wireBaseGeo.dispose();

      scene.add(sculptureGroup);
    } catch (e) {
      console.warn('About3DCanvas WebGL fallback:', e);
      return;
    }

    const startTime = performance.now();

    const animate = () => {
      const time = (performance.now() - startTime) * 0.001;

      if (sculptureGroup) {
        // Smoothly interpolate mouse parallax rotation (max ~4.5 degrees)
        currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.06;
        currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.06;

        // Both solid and wireframe rotate TOGETHER as one cohesive art piece
        sculptureGroup.rotation.x = currentRot.current.x + Math.sin(time * 0.6) * 0.04;
        sculptureGroup.rotation.y = currentRot.current.y + time * 0.16;
        sculptureGroup.position.y = 0.06 + Math.sin(time * 0.8) * 0.03;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // Disable parallax on touch devices
      const rect = container.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;

      // Max ~4.5 degrees (0.08 radians)
      targetRot.current.x = -yPct * 0.08;
      targetRot.current.y = xPct * 0.08;
    };

    const handlePointerLeave = () => {
      targetRot.current.x = 0;
      targetRot.current.y = 0;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (renderer) renderer.dispose();
      if (solidGeometry) solidGeometry.dispose();
      if (solidMaterial) solidMaterial.dispose();
      if (wireGeometry) wireGeometry.dispose();
      if (wireMaterial) wireMaterial.dispose();
    };
  }, [webglAvailable]);

  if (!webglAvailable) return null;

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[190px] sm:min-h-[220px] flex items-center justify-center select-none overflow-hidden"
    />
  );
};
