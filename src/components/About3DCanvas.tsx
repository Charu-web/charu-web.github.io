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

/**
 * Creates an editorial code/interface canvas texture for the 3D monitor display
 */
function createEditorCanvasTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Dark editorial IDE background
    ctx.fillStyle = '#14151b';
    ctx.fillRect(0, 0, 512, 320);

    // Subtle window header bar
    ctx.fillStyle = '#1c1e26';
    ctx.fillRect(0, 0, 512, 36);

    // Minimal window control pills
    ctx.fillStyle = '#d96a5f';
    ctx.beginPath();
    ctx.arc(24, 18, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#e2aa4f';
    ctx.beginPath();
    ctx.arc(42, 18, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#5fb865';
    ctx.beginPath();
    ctx.arc(60, 18, 5, 0, Math.PI * 2);
    ctx.fill();

    // Editor tab outline
    ctx.fillStyle = '#222530';
    ctx.fillRect(85, 8, 110, 28);
    ctx.fillStyle = '#8f95a5';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('system.ts', 104, 25);

    // Code lines representation (clean minimalist editorial bars)
    const codeLines = [
      { x: 30, y: 72, w: 75, color: '#4d7cbb' }, // keyword
      { x: 115, y: 72, w: 120, color: '#d8d4c8' }, // identifier
      { x: 245, y: 72, w: 90, color: '#688dbf' }, // type

      { x: 55, y: 104, w: 95, color: '#4d7cbb' }, // const
      { x: 160, y: 104, w: 140, color: '#d8d4c8' },
      { x: 310, y: 104, w: 80, color: '#5fb865' }, // string

      { x: 55, y: 136, w: 130, color: '#688dbf' },
      { x: 195, y: 136, w: 65, color: '#e2aa4f' },
      { x: 270, y: 136, w: 110, color: '#d8d4c8' },

      { x: 80, y: 168, w: 110, color: '#d8d4c8' },
      { x: 200, y: 168, w: 85, color: '#4d7cbb' },

      { x: 55, y: 200, w: 50, color: '#4d7cbb' }, // return
      { x: 115, y: 200, w: 160, color: '#d8d4c8' },

      { x: 30, y: 232, w: 40, color: '#4d7cbb' }, // }
    ];

    codeLines.forEach((line) => {
      ctx.fillStyle = line.color;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(line.x, line.y, line.w, 10, 3);
      } else {
        ctx.rect(line.x, line.y, line.w, 10);
      }
      ctx.fill();
    });

    // Subtle line numbers gutter
    ctx.fillStyle = '#3a3e4d';
    for (let i = 0; i < 6; i++) {
      ctx.fillRect(14, 73 + i * 32, 6, 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

export const About3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglAvailable] = useState(checkWebglSupported);

  // Parallax rotation refs
  const targetRot = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!webglAvailable) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 240;
    const height = container.clientHeight || 240;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;

    // Master groups for layered parallax
    let masterGroup: THREE.Group;
    let workstationGroup: THREE.Group;
    let floatingCodeGroup: THREE.Group;
    let dataCubeGroup: THREE.Group;
    let orbitGroup: THREE.Group;

    // Geometries & materials to dispose
    const disposables: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [];
    let animationFrameId: number;

    try {
      scene = new THREE.Scene();

      // Camera with comfortable framing (occupies ~58–65% of viewport without touching boundaries)
      camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
      camera.position.set(0, 0, 4.3);

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

      // Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xfffaee, 1.9);
      keyLight.position.set(3.2, 4.5, 3.2);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xdde7f5, 1.0);
      fillLight.position.set(-3.5, -1.8, 2.2);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 0.7);
      rimLight.position.set(0, 3.2, -3.2);
      scene.add(rimLight);

      // Materials
      // Matte Porcelain / Warm Studio White for monitor frame & hardware
      const ceramicMat = new THREE.MeshStandardMaterial({
        color: 0xf4f2ec,
        roughness: 0.35,
        metalness: 0.08,
      });
      disposables.push(ceramicMat);

      // Slate Aluminum for stand and monitor trim
      const aluminumMat = new THREE.MeshStandardMaterial({
        color: 0xc4c2ba,
        roughness: 0.28,
        metalness: 0.42,
      });
      disposables.push(aluminumMat);

      // Deep Indigo Slate Accent for symbols & nodes
      const accentMat = new THREE.MeshStandardMaterial({
        color: 0x2b4b7c,
        roughness: 0.22,
        metalness: 0.55,
      });
      disposables.push(accentMat);

      // Screen Material with code interface texture
      const screenTexture = createEditorCanvasTexture();
      disposables.push(screenTexture);
      const screenMat = new THREE.MeshStandardMaterial({
        map: screenTexture,
        roughness: 0.2,
        metalness: 0.1,
      });
      disposables.push(screenMat);

      // Master Group positioned slightly above optical center
      masterGroup = new THREE.Group();
      masterGroup.position.set(0, 0.05, 0);

      // Default subtle isometric orientation: tilted ~20° x, -28° y
      masterGroup.rotation.x = 0.22;
      masterGroup.rotation.y = -0.36;

      // ─────────────────────────────────────────────
      // 1. Sleek Modern Computer Monitor Workstation
      // ─────────────────────────────────────────────
      workstationGroup = new THREE.Group();

      // Monitor Body (16:10 proportional slim display)
      const monitorGeo = new THREE.BoxGeometry(1.35, 0.88, 0.05);
      const monitorMesh = new THREE.Mesh(monitorGeo, ceramicMat);
      disposables.push(monitorGeo);
      workstationGroup.add(monitorMesh);

      // Screen Surface
      const screenGeo = new THREE.PlaneGeometry(1.24, 0.78);
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.z = 0.026;
      disposables.push(screenGeo);
      workstationGroup.add(screenMesh);

      // Monitor Stand Stem
      const stemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.52, 16);
      const stemMesh = new THREE.Mesh(stemGeo, aluminumMat);
      stemMesh.position.set(0, -0.48, -0.04);
      disposables.push(stemGeo);
      workstationGroup.add(stemMesh);

      // Monitor Stand Base (Minimal rounded aluminum plinth)
      const baseGeo = new THREE.CylinderGeometry(0.32, 0.34, 0.025, 32);
      const baseMesh = new THREE.Mesh(baseGeo, aluminumMat);
      baseMesh.position.set(0, -0.74, 0.04);
      disposables.push(baseGeo);
      workstationGroup.add(baseMesh);

      masterGroup.add(workstationGroup);

      // ─────────────────────────────────────────────
      // 2. Floating 3D Developer Code Symbol: < / >
      // ─────────────────────────────────────────────
      floatingCodeGroup = new THREE.Group();
      floatingCodeGroup.position.set(-0.50, 0.46, 0.30);

      // Bracket bar geometry helper
      const barGeo = new THREE.BoxGeometry(0.038, 0.16, 0.038);
      disposables.push(barGeo);

      // Left Bracket <
      const leftBracket = new THREE.Group();
      const leftUpper = new THREE.Mesh(barGeo, accentMat);
      leftUpper.position.set(-0.04, 0.05, 0);
      leftUpper.rotation.z = -0.55;
      const leftLower = new THREE.Mesh(barGeo, accentMat);
      leftLower.position.set(-0.04, -0.05, 0);
      leftLower.rotation.z = 0.55;
      leftBracket.add(leftUpper);
      leftBracket.add(leftLower);
      floatingCodeGroup.add(leftBracket);

      // Slash /
      const slashGeo = new THREE.BoxGeometry(0.036, 0.24, 0.036);
      const slash = new THREE.Mesh(slashGeo, accentMat);
      slash.position.set(0.12, 0, 0);
      slash.rotation.z = 0.35;
      disposables.push(slashGeo);
      floatingCodeGroup.add(slash);

      // Right Bracket >
      const rightBracket = new THREE.Group();
      rightBracket.position.set(0.24, 0, 0);
      const rightUpper = new THREE.Mesh(barGeo, accentMat);
      rightUpper.position.set(0.04, 0.05, 0);
      rightUpper.rotation.z = 0.55;
      const rightLower = new THREE.Mesh(barGeo, accentMat);
      rightLower.position.set(0.04, -0.05, 0);
      rightLower.rotation.z = -0.55;
      rightBracket.add(rightUpper);
      rightBracket.add(rightLower);
      floatingCodeGroup.add(rightBracket);

      masterGroup.add(floatingCodeGroup);

      // ─────────────────────────────────────────────
      // 3. Floating Geometric Data Cube
      // ─────────────────────────────────────────────
      dataCubeGroup = new THREE.Group();
      dataCubeGroup.position.set(0.68, -0.16, 0.32);

      const cubeGeo = new THREE.BoxGeometry(0.24, 0.24, 0.24);
      const cubeMesh = new THREE.Mesh(cubeGeo, ceramicMat);
      disposables.push(cubeGeo);
      dataCubeGroup.add(cubeMesh);

      // Subtle wireframe edge outline on data cube
      const cubeEdges = new THREE.EdgesGeometry(cubeGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0x2b4b7c,
        transparent: true,
        opacity: 0.32,
      });
      disposables.push(cubeEdges);
      disposables.push(edgeMat);
      const cubeWire = new THREE.LineSegments(cubeEdges, edgeMat);
      dataCubeGroup.add(cubeWire);

      masterGroup.add(dataCubeGroup);

      // ─────────────────────────────────────────────
      // 4. Thin Orbiting Connection Ring
      // ─────────────────────────────────────────────
      orbitGroup = new THREE.Group();
      orbitGroup.position.set(0, -0.05, 0);
      orbitGroup.rotation.x = Math.PI / 2.3;

      const curve = new THREE.EllipseCurve(0, 0, 1.05, 0.68, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(64);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x2b4b7c,
        transparent: true,
        opacity: 0.14,
      });
      disposables.push(orbitGeo);
      disposables.push(orbitMat);
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      orbitGroup.add(orbitLine);

      masterGroup.add(orbitGroup);

      scene.add(masterGroup);
    } catch (e) {
      console.warn('About3DCanvas WebGL fallback:', e);
      return;
    }

    const startTime = performance.now();

    const animate = () => {
      const time = (performance.now() - startTime) * 0.001;

      // Parallax smooth interpolation
      currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.05;
      currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.05;

      if (masterGroup) {
        // Base isometric pose + damped mouse parallax (max ~4.5°)
        masterGroup.rotation.x = 0.22 + currentRot.current.x;
        masterGroup.rotation.y = -0.36 + currentRot.current.y;
        masterGroup.position.y = 0.05 + Math.sin(time * 0.7) * 0.02;
      }

      // Layer 2: Floating Code Bracket with micro floating depth
      if (floatingCodeGroup) {
        floatingCodeGroup.position.y = 0.52 + Math.sin(time * 1.1 + 0.5) * 0.035;
        floatingCodeGroup.rotation.y = Math.sin(time * 0.6) * 0.08;
      }

      // Layer 3: Data Cube slow isometric spin & hover
      if (dataCubeGroup) {
        dataCubeGroup.rotation.x = time * 0.3;
        dataCubeGroup.rotation.y = time * 0.45;
        dataCubeGroup.position.y = -0.18 + Math.cos(time * 0.9) * 0.03;
      }

      // Layer 4: Orbiting Connection rotation
      if (orbitGroup) {
        orbitGroup.rotation.z = time * 0.2;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // Mobile touch fallback
      const rect = container.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;

      // Max rotation: ~4° (0.07 rad)
      targetRot.current.x = -yPct * 0.07;
      targetRot.current.y = xPct * 0.07;
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
      disposables.forEach((item) => item.dispose());
    };
  }, [webglAvailable]);

  if (!webglAvailable) {
    // Graceful fallback for non-WebGL environments
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center select-none font-mono">
        <div className="w-20 h-14 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center mb-2 shadow-xs">
          <span className="text-[#2b4b7c] font-bold text-sm">&lt;/&gt;</span>
        </div>
        <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
          DEVELOPMENT ARTIFACT
        </span>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[190px] sm:min-h-[220px] flex items-center justify-center select-none overflow-hidden"
    />
  );
};
