import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  isDark: boolean;
}

export default function ThreeCanvas({ isDark }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDark ? 0x000000 : 0xffffff, 0.012);

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 25;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // --- Interactive 3D Cube (Innovation Symbol) ---
    // Outer wireframe box
    const outerGeo = new THREE.BoxGeometry(6, 6, 6);
    const outerWireframe = new THREE.WireframeGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x14b8a6, // Teal
      linewidth: 2,
      transparent: true,
      opacity: 0.8,
    });
    const outerCube = new THREE.LineSegments(outerWireframe, outerMat);
    scene.add(outerCube);

    // Inner glowing solid box
    const innerGeo = new THREE.BoxGeometry(3.6, 3.6, 3.6);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x0d9488,
      emissive: 0x0f766e,
      roughness: 0.1,
      metalness: 0.8,
      transmission: 0.6, // Glassmorphism block
      thickness: 1.5,
      transparent: true,
      opacity: 0.75,
    });
    const innerCube = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerCube);

    // Float geometric orbiting wireframe rings
    const ringGeo = new THREE.TorusGeometry(5.5, 0.06, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // --- Immersive Digital City / Tech Grid Matrix ---
    const cityGroup = new THREE.Group();
    const cityCount = 20;
    const buildingGeometries: THREE.BoxGeometry[] = [];
    const buildingMaterials: THREE.MeshPhysicalMaterial[] = [];
    const buildings: {
      mesh: THREE.Mesh;
      baseHeight: number;
      initialX: number;
      initialZ: number;
      noiseOffset: number;
    }[] = [];

    // Glowing horizontal coordinates scale grid on the floor under the city
    const gridHelper = new THREE.GridHelper(60, 30, 0x14b8a6, isDark ? 0x0d9488 : 0x2dd4bf);
    gridHelper.position.y = -8.1; // place slightly below scale ground
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((m) => {
        m.transparent = true;
        m.opacity = isDark ? 0.35 : 0.25;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = isDark ? 0.35 : 0.25;
    }
    cityGroup.add(gridHelper);

    for (let i = 0; i < cityCount; i++) {
      const w = 1.2 + Math.random() * 2;
      const h = 5 + Math.random() * 10;
      const d = 1.2 + Math.random() * 2;
      
      const bGeo = new THREE.BoxGeometry(w, h, d);
      buildingGeometries.push(bGeo);

      // Solid translucent body with neon physical properties
      const bMat = new THREE.MeshPhysicalMaterial({
        color: isDark ? 0x0f766e : 0x0d9488,
        emissive: isDark ? 0x042f2e : 0x115e59,
        roughness: 0.2,
        metalness: 0.9,
        transmission: 0.7,
        transparent: true,
        opacity: 0.35,
      });
      buildingMaterials.push(bMat);
      const mesh = new THREE.Mesh(bGeo, bMat);

      // Edge glow wireframe outline lines
      const edges = new THREE.EdgesGeometry(bGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: isDark ? 0x2dd4bf : 0x0d9488,
        transparent: true,
        opacity: 0.65,
      });
      const line = new THREE.LineSegments(edges, edgeMat);
      mesh.add(line);

      // Position buildings on a grid at the baseline base
      mesh.position.x = (Math.random() - 0.5) * 45;
      mesh.position.y = -8 + h / 2; // baseline ground offsets
      mesh.position.z = (Math.random() - 0.5) * 35;
      
      cityGroup.add(mesh);
      buildings.push({
        mesh,
        baseHeight: h,
        initialX: mesh.position.x,
        initialZ: mesh.position.z,
        noiseOffset: Math.random() * 100
      });
    }
    scene.add(cityGroup);

    // --- Floating Particles and Digital Network System ---
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Create random points in a bubble around the center
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 8 + Math.random() * 18; // radius between 8 and 26

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities.push({
        x: (Math.random() - 0.5) * 0.03,
        y: (Math.random() - 0.5) * 0.03,
        z: (Math.random() - 0.5) * 0.03,
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Dynamic color particle material depending on dark/light
    const particleMat = new THREE.PointsMaterial({
      color: 0x14b8a6, // Teal accent
      size: 0.28,
      transparent: true,
      opacity: 0.9,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Dynamic Network Lines Connection ---
    const maxConnections = 65;
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(maxConnections * 2 * 3); // 65 segments max, 2 points per segment, 3 coordinates each
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x0f766e : 0x2dd4bf,
      transparent: true,
      opacity: 0.35,
    });
    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(networkLines);

    // --- Ambient and Digital Lights ---
    const ambLight = new THREE.AmbientLight(isDark ? 0x022c22 : 0xccfbf1, 2.0);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0x14b8a6, 4);
    dirLight1.position.set(10, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight2.position.set(-15, -10, -10);
    scene.add(dirLight2);

    // --- Interactive Mouse Triggers ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse between -1 and 1
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- Interactive Scroll Triggers ---
    let scrollPercent = 0;
    const handleScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      scrollPercent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight || 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Handle Resize ---
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- Clock for elapsed time calculations ---
    const clock = new THREE.Clock();

    // --- Animation Loop ---
    let animFrameId: number;

    const tick = () => {
      const elapsed = clock.getElapsedTime();

      // Smoothen mouse tracking with simple linear interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Spin basic geometries
      outerCube.rotation.x = elapsed * 0.12 + mouseX * 0.25;
      outerCube.rotation.y = elapsed * 0.18 + mouseY * 0.25;

      innerCube.rotation.x = -elapsed * 0.08 - mouseX * 0.15;
      innerCube.rotation.y = -elapsed * 0.14 - mouseY * 0.15;

      ring.rotation.x = elapsed * 0.05 + mouseY * 0.12;
      ring.rotation.y = elapsed * 0.08 + mouseX * 0.12;

      // Rotate digital city group slowly and translate depth per scroll
      cityGroup.rotation.y = elapsed * 0.015 + mouseX * 0.05;
      cityGroup.position.z = scrollPercent * 12;
      cityGroup.position.y = scrollPercent * 1.5;

      // Make individual digital buildings react dynamically to the cursor and timeline waves
      buildings.forEach((b) => {
        // Idle breathing breathing wave
        const idleWave = Math.sin(elapsed * 0.6 + b.noiseOffset) * 0.15;

        // Calculate building's spatial proximity to interactive cursor coordinates
        // mouseX and mouseY are normalized between -1 and 1. We scale them up to match position coordinates.
        const dx = b.initialX - (mouseX * 25);
        const dz = b.initialZ - (mouseY * 20);
        const dist = Math.sqrt(dx * dx + dz * dz);

        // Within 18 units, buildings react and scale up
        const proximityThreshold = 18;
        const reactiveStrength = Math.max(0, 1 - dist / proximityThreshold);

        // Scale building height
        const targetScaleY = 1.0 + idleWave + (reactiveStrength * 0.45);
        b.mesh.scale.y = THREE.MathUtils.lerp(b.mesh.scale.y, targetScaleY, 0.1);

        // Reposition baseline so base of building remains aligned to the baseline coordinates (-8)
        b.mesh.position.y = -8 + (b.baseHeight * b.mesh.scale.y) / 2;

        // Subtle 3D physical sway tilt depending on the mouse pointer movement triggers
        const targetRotX = Math.sin(elapsed + b.noiseOffset) * 0.025 + (mouseY * reactiveStrength * 0.15);
        const targetRotZ = Math.cos(elapsed + b.noiseOffset) * 0.025 + (mouseX * reactiveStrength * 0.15);
        b.mesh.rotation.x = THREE.MathUtils.lerp(b.mesh.rotation.x, targetRotX, 0.1);
        b.mesh.rotation.z = THREE.MathUtils.lerp(b.mesh.rotation.z, targetRotZ, 0.1);

        // Dynamically shift material emission glow intensity on client interaction or scroll
        if (b.mesh.material instanceof THREE.MeshPhysicalMaterial) {
          b.mesh.material.emissiveIntensity = 0.4 + (reactiveStrength * 2.0) + (scrollPercent * 1.5);
        }
      });

      // Shifting ambient & directional lighting intensities on scroll position to represent atmospheric change
      ambLight.intensity = (isDark ? 0.3 : 1.0) + (1.0 - scrollPercent) * 1.5;
      dirLight1.intensity = 2.0 + Math.sin(elapsed * 1.5) * 0.5 + scrollPercent * 4.0;
      dirLight2.intensity = 1.0 + (1.0 - scrollPercent) * 2.5;

      // Adjust camera placement dynamically depending on the current scroll amount
      // This gives an amazing depth/parallax effect on scroll
      camera.position.x = mouseX * 4;
      camera.position.y = mouseY * 4;
      // Scroll moves camera closer and down slightly
      camera.position.z = 25 - scrollPercent * 16;
      camera.lookAt(0, -scrollPercent * 3, 0);

      // Move individual network stars particles
      const positionsAttr = particles.geometry.attributes.position as THREE.BufferAttribute;
      const coords = positionsAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Apply individual velocity vectors
        coords[i * 3] += velocities[i].x;
        coords[i * 3 + 1] += velocities[i].y;
        coords[i * 3 + 2] += velocities[i].z;

        // Keep them bounded inside a certain spherical boundary
        const dist = Math.sqrt(
          coords[i * 3] ** 2 + coords[i * 3 + 1] ** 2 + coords[i * 3 + 2] ** 2
        );

        if (dist > 32 || dist < 4) {
          coords[i * 3] = -coords[i * 3] * 0.9;
          coords[i * 3 + 1] = -coords[i * 3 + 1] * 0.9;
          coords[i * 3 + 2] = -coords[i * 3 + 2] * 0.9;
        }
      }
      positionsAttr.needsUpdate = true;

      // Re-calculate closest points for drawing digital network connection threads
      const linePositionsAttr = networkLines.geometry.attributes.position as THREE.BufferAttribute;
      const lineCoords = linePositionsAttr.array as Float32Array;
      let lineIndex = 0;

      // Find pairs that are close together and link them with a line segment
      for (let i = 0; i < particleCount && lineIndex < maxConnections; i++) {
        const x1 = coords[i * 3];
        const y1 = coords[i * 3 + 1];
        const z1 = coords[i * 3 + 2];

        // Match with nearby objects
        for (let j = i + 1; j < particleCount && lineIndex < maxConnections; j++) {
          const x2 = coords[j * 3];
          const y2 = coords[j * 3 + 1];
          const z2 = coords[j * 3 + 2];

          const dSquared = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;
          if (dSquared < 36) { // if closer than 6 units
            // Set position 1 of segment
            lineCoords[lineIndex * 6] = x1;
            lineCoords[lineIndex * 6 + 1] = y1;
            lineCoords[lineIndex * 6 + 2] = z1;
            // Set position 2 of segment
            lineCoords[lineIndex * 6 + 3] = x2;
            lineCoords[lineIndex * 6 + 4] = y2;
            lineCoords[lineIndex * 6 + 5] = z2;

            lineIndex++;
          }
        }
      }

      // Fill remaining line segments with zero or off-screen coordinates so they don't render artifacts
      for (let i = lineIndex; i < maxConnections; i++) {
        lineCoords[i * 6] = 0;
        lineCoords[i * 6 + 1] = 0;
        lineCoords[i * 3 + 2] = 999; // off-canvas z
        lineCoords[i * 6 + 3] = 0;
        lineCoords[i * 6 + 4] = 0;
        lineCoords[i * 6 + 5] = 999;
      }
      linePositionsAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(tick);
    };

    // Render first frame and commence loop
    tick();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      outerGeo.dispose();
      innerGeo.dispose();
      ringGeo.dispose();
      outerMat.dispose();
      innerMat.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      ambLight.dispose();
      dirLight1.dispose();
      dirLight2.dispose();
      buildingGeometries.forEach((g) => g.dispose());
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full relative"
      />
    </div>
  );
}
