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
 * Creates an editorial code/interface canvas texture for the 3D developer monitor display
 */
function createEditorCanvasTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Dark editorial IDE background
    ctx.fillStyle = '#111319';
    ctx.fillRect(0, 0, 512, 320);

    // Subtle window header bar
    ctx.fillStyle = '#181b24';
    ctx.fillRect(0, 0, 512, 36);

    // Window control dots
    ctx.fillStyle = '#d96a5f';
    ctx.beginPath();
    ctx.arc(22, 18, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#e2aa4f';
    ctx.beginPath();
    ctx.arc(38, 18, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#5fb865';
    ctx.beginPath();
    ctx.arc(54, 18, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Editor tab outline
    ctx.fillStyle = '#202430';
    ctx.fillRect(78, 8, 115, 28);
    ctx.fillStyle = '#949ba8';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('App.tsx', 96, 25);

    // Secondary tab
    ctx.fillStyle = '#161922';
    ctx.fillRect(198, 8, 110, 28);
    ctx.fillStyle = '#5a6070';
    ctx.fillText('api.ts', 216, 25);

    // Code lines representation (clean minimalist editorial syntax bars)
    const codeLines = [
      { x: 28, y: 68, w: 85, color: '#4d7cbb' },  // import
      { x: 122, y: 68, w: 110, color: '#d8d4c8' }, // { createSystem }
      { x: 242, y: 68, w: 60, color: '#4d7cbb' },  // from
      { x: 310, y: 68, w: 90, color: '#5fb865' },  // 'ai-core'

      { x: 28, y: 98, w: 70, color: '#4d7cbb' },  // interface
      { x: 108, y: 98, w: 100, color: '#e2aa4f' }, // PipelineConfig
      { x: 218, y: 98, w: 35, color: '#688dbf' },

      { x: 50, y: 128, w: 90, color: '#688dbf' },  // model:
      { x: 150, y: 128, w: 130, color: '#5fb865' }, // 'gemini-pro'

      { x: 50, y: 158, w: 110, color: '#688dbf' }, // latency:
      { x: 170, y: 158, w: 45, color: '#e2aa4f' },  // 120

      { x: 28, y: 188, w: 65, color: '#4d7cbb' },  // export
      { x: 102, y: 188, w: 55, color: '#4d7cbb' },  // const
      { x: 166, y: 188, w: 120, color: '#d8d4c8' }, // handler
      { x: 295, y: 188, w: 30, color: '#688dbf' },  // =

      { x: 50, y: 218, w: 75, color: '#4d7cbb' },  // return
      { x: 135, y: 218, w: 150, color: '#d8d4c8' }, // await engine.run()

      { x: 28, y: 248, w: 40, color: '#4d7cbb' },  // };
    ];

    codeLines.forEach((line) => {
      ctx.fillStyle = line.color;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(line.x, line.y, line.w, 9, 3);
      } else {
        ctx.rect(line.x, line.y, line.w, 9);
      }
      ctx.fill();
    });

    // Subtle line numbers gutter
    ctx.fillStyle = '#323642';
    for (let i = 0; i < 7; i++) {
      ctx.fillRect(12, 69 + i * 30, 5, 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
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
    targetHoverScale.current = isHovered ? 1.04 : 1.0;
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

    // Groups for layered parallax movement
    let masterGroup: THREE.Group;
    let workstationGroup: THREE.Group;
    let floatingCodeGroup: THREE.Group;
    let dataCubeGroup: THREE.Group;
    let orbitGroup: THREE.Group;
    let satelliteNodeGroup: THREE.Group;

    const disposables: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [];

    try {
      scene = new THREE.Scene();

      // Camera configured for comfortable, breathing 3D framing without edge clipping
      camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
      camera.position.set(0, 0, 4.6);

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
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
      scene.add(ambientLight);

      // 2. Warm Key Light (top-left studio spotlight)
      const keyLight = new THREE.DirectionalLight(0xfffaee, 2.7);
      keyLight.position.set(-3.2, 4.2, 3.2);
      scene.add(keyLight);

      // 3. Cool Fill Light (bottom-right bounce)
      const fillLight = new THREE.DirectionalLight(0xdde7f5, 1.4);
      fillLight.position.set(3.5, -2.0, 2.2);
      scene.add(fillLight);

      // 4. Rim Back Light (defines silhouettes and bevels)
      const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
      rimLight.position.set(0, 3.2, -3.2);
      scene.add(rimLight);

      // 5. Subtle Upward Bounce Light
      const bounceLight = new THREE.DirectionalLight(0xf5f3ea, 0.6);
      bounceLight.position.set(0, -3.0, 1.5);
      scene.add(bounceLight);

      // Materials
      // Matte Porcelain / Warm Studio White for chassis
      const ceramicMat = new THREE.MeshStandardMaterial({
        color: 0xfcfbf7,
        roughness: 0.35,
        metalness: 0.05,
      });
      disposables.push(ceramicMat);

      // Sleek Slate Titanium for keyboard/trim
      const aluminumMat = new THREE.MeshStandardMaterial({
        color: 0xc6c4bc,
        roughness: 0.28,
        metalness: 0.45,
      });
      disposables.push(aluminumMat);

      // Deep Navy / Indigo Accent for symbols & nodes
      const accentMat = new THREE.MeshStandardMaterial({
        color: 0x2b4b7c,
        roughness: 0.22,
        metalness: 0.65,
      });
      disposables.push(accentMat);

      // Editor Screen Material
      const screenTexture = createEditorCanvasTexture();
      disposables.push(screenTexture);
      const screenMat = new THREE.MeshStandardMaterial({
        map: screenTexture,
        roughness: 0.22,
        metalness: 0.08,
      });
      disposables.push(screenMat);

      masterGroup = new THREE.Group();
      masterGroup.position.set(0, 0.02, 0);

      // Default subtle isometric three-quarter pose
      masterGroup.rotation.set(0.24, -0.36, 0.08);

      // ─────────────────────────────────────────────
      // 1. Sleek Floating Laptop / Developer Monitor
      // ─────────────────────────────────────────────
      workstationGroup = new THREE.Group();

      // Screen Display Subgroup (Hinged at base, tilted backwards for natural viewing)
      const screenGroup = new THREE.Group();
      screenGroup.position.set(0, -0.42, 0);
      screenGroup.rotation.x = -0.20;

      // Monitor Screen Frame (16:10 slim modern bezel)
      const monitorGeo = new THREE.BoxGeometry(1.48, 0.96, 0.045);
      const monitorMesh = new THREE.Mesh(monitorGeo, ceramicMat);
      monitorMesh.position.set(0, 0.48, 0);
      disposables.push(monitorGeo);
      screenGroup.add(monitorMesh);

      // Active Screen Surface with IDE code editor texture
      const screenGeo = new THREE.PlaneGeometry(1.38, 0.86);
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.set(0, 0.48, 0.025);
      disposables.push(screenGeo);
      screenGroup.add(screenMesh);

      workstationGroup.add(screenGroup);

      // Laptop Lower Chassis / Base Deck (Lying flat on horizontal plane)
      const baseGeo = new THREE.BoxGeometry(1.48, 0.035, 0.95);
      const baseMesh = new THREE.Mesh(baseGeo, ceramicMat);
      baseMesh.position.set(0, -0.44, 0.47);
      disposables.push(baseGeo);
      workstationGroup.add(baseMesh);

      // Minimalist Keyboard Deck Inset
      const keyboardGeo = new THREE.PlaneGeometry(1.36, 0.52);
      const keyboardMesh = new THREE.Mesh(keyboardGeo, aluminumMat);
      keyboardMesh.position.set(0, -0.42, 0.32);
      keyboardMesh.rotation.x = -Math.PI / 2;
      disposables.push(keyboardGeo);
      workstationGroup.add(keyboardMesh);

      // Minimalist Trackpad Inset
      const trackpadGeo = new THREE.PlaneGeometry(0.44, 0.28);
      const trackpadMesh = new THREE.Mesh(trackpadGeo, aluminumMat);
      trackpadMesh.position.set(0, -0.42, 0.72);
      trackpadMesh.rotation.x = -Math.PI / 2;
      disposables.push(trackpadGeo);
      workstationGroup.add(trackpadMesh);

      masterGroup.add(workstationGroup);

      // ─────────────────────────────────────────────
      // 2. Floating 3D Developer Code Symbol: < / >
      // ─────────────────────────────────────────────
      floatingCodeGroup = new THREE.Group();
      floatingCodeGroup.position.set(-0.56, 0.52, 0.35);

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
      // 3. Floating 3D Data Cube
      // ─────────────────────────────────────────────
      dataCubeGroup = new THREE.Group();
      dataCubeGroup.position.set(0.78, -0.22, 0.42);

      const cubeGeo = new THREE.BoxGeometry(0.26, 0.26, 0.26);
      const cubeMesh = new THREE.Mesh(cubeGeo, ceramicMat);
      disposables.push(cubeGeo);
      dataCubeGroup.add(cubeMesh);

      // Wireframe edge accent
      const cubeEdges = new THREE.EdgesGeometry(cubeGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0x2b4b7c,
        transparent: true,
        opacity: 0.38,
      });
      disposables.push(cubeEdges);
      disposables.push(edgeMat);
      const cubeWire = new THREE.LineSegments(cubeEdges, edgeMat);
      dataCubeGroup.add(cubeWire);

      masterGroup.add(dataCubeGroup);

      // ─────────────────────────────────────────────
      // 4. Thin Connecting Lines / Orbit Curves (APIs & Data Flow)
      // ─────────────────────────────────────────────
      orbitGroup = new THREE.Group();
      orbitGroup.position.set(0, 0.02, 0);
      orbitGroup.rotation.x = Math.PI / 2.4;

      const curve1 = new THREE.EllipseCurve(0, 0, 1.25, 0.82, 0, 2 * Math.PI, false, 0);
      const points1 = curve1.getPoints(64);
      const orbitGeo1 = new THREE.BufferGeometry().setFromPoints(points1);
      const orbitMat1 = new THREE.LineBasicMaterial({
        color: 0x2b4b7c,
        transparent: true,
        opacity: 0.18,
      });
      disposables.push(orbitGeo1);
      disposables.push(orbitMat1);
      const orbitLine1 = new THREE.Line(orbitGeo1, orbitMat1);
      orbitGroup.add(orbitLine1);

      // Micro data beads along the orbit
      const beadGeo = new THREE.SphereGeometry(0.038, 16, 16);
      disposables.push(beadGeo);
      const bead1 = new THREE.Mesh(beadGeo, accentMat);
      bead1.position.set(1.22, 0, 0);
      orbitGroup.add(bead1);

      const bead2 = new THREE.Mesh(beadGeo, accentMat);
      bead2.position.set(-1.22, 0, 0);
      orbitGroup.add(bead2);

      masterGroup.add(orbitGroup);

      // ─────────────────────────────────────────────
      // 5. Small Geometric Elements Floating Around
      // ─────────────────────────────────────────────
      satelliteNodeGroup = new THREE.Group();

      // Micro octahedron data node (bottom left)
      const octaGeo = new THREE.OctahedronGeometry(0.09);
      const octaMesh = new THREE.Mesh(octaGeo, accentMat);
      octaMesh.position.set(-0.76, -0.32, 0.28);
      disposables.push(octaGeo);
      satelliteNodeGroup.add(octaMesh);

      // Micro spherical AI node (top right)
      const aiNodeGeo = new THREE.SphereGeometry(0.065, 20, 20);
      const aiNodeMesh = new THREE.Mesh(aiNodeGeo, ceramicMat);
      aiNodeMesh.position.set(0.68, 0.58, 0.18);
      disposables.push(aiNodeGeo);
      satelliteNodeGroup.add(aiNodeMesh);

      masterGroup.add(satelliteNodeGroup);

      // Calibrated base scale so it breathes within the canvas
      masterGroup.scale.setScalar(0.92);
      scene.add(masterGroup);
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

      if (masterGroup) {
        // Base isometric pose + subtle mouse parallax (max 4-5 degrees)
        masterGroup.rotation.x = 0.24 + currentRotation.current.x;
        masterGroup.rotation.y = -0.36 + currentRotation.current.y;
        masterGroup.position.y = 0.02 + Math.sin(time * 0.70) * 0.025;

        masterGroup.scale.setScalar(0.92 * currentHoverScale.current);
      }

      // Layer 2: Floating Code Bracket with micro vertical floating depth
      if (floatingCodeGroup) {
        floatingCodeGroup.position.y = 0.52 + Math.sin(time * 1.1 + 0.4) * 0.035;
        floatingCodeGroup.rotation.y = Math.sin(time * 0.6) * 0.08;
      }

      // Layer 3: Data Cube slow isometric spin & hover
      if (dataCubeGroup) {
        dataCubeGroup.rotation.x = time * 0.28;
        dataCubeGroup.rotation.y = time * 0.42;
        dataCubeGroup.position.y = -0.22 + Math.cos(time * 0.85) * 0.025;
      }

      // Layer 4: Orbiting Connection rotation
      if (orbitGroup) {
        orbitGroup.rotation.z = time * 0.16;
      }

      // Layer 5: Satellite nodes gentle motion
      if (satelliteNodeGroup) {
        satelliteNodeGroup.position.y = Math.sin(time * 0.95 + 1.2) * 0.02;
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
        disposables.forEach((item) => item.dispose());
      } catch {}
    };
  }, [webglAvailable]);

  if (!webglAvailable) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center p-4 text-center select-none font-mono ${className}`}>
        <div className="w-24 h-16 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center mb-2 shadow-xs">
          <span className="text-[#2b4b7c] font-bold text-base">&lt;/&gt;</span>
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
      data-cursor="EXPLORE"
      className={`w-full h-full relative select-none pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center ${className}`}
    />
  );
};
