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
    scene.fog = new THREE.FogExp2(isDark ? 0x000000 : 0xffffff, 0.015);
    scene.background = new THREE.Color(isDark ? 0x000000 : 0xffffff);

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 35; // Start further away for slow zoom in

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // --- The Digital Core ---
    const coreGroup = new THREE.Group();
    // We will place the core towards the right side of the screen
    coreGroup.position.set(6, 0, 0); 
    scene.add(coreGroup);

    // 1. Inner glowing solid core (Icosahedron)
    const innerGeo = new THREE.IcosahedronGeometry(2.5, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x0d9488 : 0x14b8a6,
      emissive: isDark ? 0x0f766e : 0x0f766e,
      roughness: 0.1,
      metalness: 0.8,
      transmission: 0.8,
      thickness: 1.5,
      transparent: true,
      opacity: isDark ? 0.85 : 0.65,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 2. Wireframe shell (Icosahedron)
    const shellGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const shellWireframe = new THREE.WireframeGeometry(shellGeo);
    const shellMat = new THREE.LineBasicMaterial({
      color: 0x14b8a6,
      linewidth: 2,
      transparent: true,
      opacity: 0.4,
    });
    const shellCore = new THREE.LineSegments(shellWireframe, shellMat);
    coreGroup.add(shellCore);

    // 3. Orbiting Geometric Rings
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x0cebce, transparent: true, opacity: 0.3, wireframe: true });
    const ringGeo1 = new THREE.TorusGeometry(6, 0.05, 8, 64);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.5;
    coreGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x2dd4bf, transparent: true, opacity: 0.2, wireframe: true });
    const ringGeo2 = new THREE.TorusGeometry(8, 0.02, 8, 64);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    coreGroup.add(ring2);

    // 4. Data Streams (Particles orbiting the core)
    const dataStreamCount = 300;
    const dataStreamGeo = new THREE.BufferGeometry();
    const dataStreamPositions = new Float32Array(dataStreamCount * 3);
    const streamAngles: number[] = [];
    const streamRadii: number[] = [];
    const streamSpeeds: number[] = [];
    const streamYOff: number[] = [];

    for (let i = 0; i < dataStreamCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 4 + Math.random() * 8; // Orbit around the core
      
      dataStreamPositions[i * 3] = Math.cos(angle) * radius;
      dataStreamPositions[i * 3 + 1] = (Math.random() - 0.5) * 8; 
      dataStreamPositions[i * 3 + 2] = Math.sin(angle) * radius;
      
      streamAngles.push(angle);
      streamRadii.push(radius);
      streamSpeeds.push(0.01 + Math.random() * 0.03);
      streamYOff.push((Math.random() - 0.5) * 8);
    }
    
    dataStreamGeo.setAttribute('position', new THREE.BufferAttribute(dataStreamPositions, 3));
    const dataStreamMat = new THREE.PointsMaterial({
      color: 0x5eead4,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
    });
    const dataStreams = new THREE.Points(dataStreamGeo, dataStreamMat);
    coreGroup.add(dataStreams);

    // 5. Service Node Anchors (These are invisible objects we track to position HTML overlay)
    // Removed old building mechanics.

    // --- Floating Particles (Global environment) ---
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
    const ambLight = new THREE.AmbientLight(isDark ? 0x022c22 : 0xffffff, isDark ? 2.0 : 1.5);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0x14b8a6, isDark ? 4 : 2.5);
    dirLight1.position.set(10, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(isDark ? 0xffffff : 0x0f766e, 1.5);
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

      // Animate core pieces
      innerCore.rotation.x = elapsed * 0.2 + mouseX * 0.3;
      innerCore.rotation.y = elapsed * 0.25 + mouseY * 0.3;
      
      shellCore.rotation.x = -elapsed * 0.15 - mouseX * 0.2;
      shellCore.rotation.y = -elapsed * 0.1 - mouseY * 0.2;

      ring1.rotation.y = elapsed * 0.2 + mouseX * 0.1;
      ring1.rotation.z = elapsed * 0.1 + mouseY * 0.1;

      ring2.rotation.x = elapsed * 0.1 + mouseY * 0.1;
      ring2.rotation.z = -elapsed * 0.15 - mouseX * 0.1;

      // Rotate entire core group slowly and react to scroll
      coreGroup.rotation.y = elapsed * 0.05 + mouseX * 0.1;
      coreGroup.position.z = scrollPercent * 15;
      coreGroup.position.y = scrollPercent * 5;

      // Animate data streams (particles around the core)
      const streamPositionsAttr = dataStreams.geometry.attributes.position as THREE.BufferAttribute;
      const streamCoords = streamPositionsAttr.array as Float32Array;
      for (let i = 0; i < dataStreamCount; i++) {
        streamAngles[i] += streamSpeeds[i];
        streamCoords[i * 3] = Math.cos(streamAngles[i]) * streamRadii[i];
        streamCoords[i * 3 + 1] = streamYOff[i] + Math.sin(elapsed * 2 + i) * 0.5; // slight bobbing
        streamCoords[i * 3 + 2] = Math.sin(streamAngles[i]) * streamRadii[i];
      }
      streamPositionsAttr.needsUpdate = true;

      // Shifting ambient & directional lighting intensities on scroll position to represent atmospheric change
      ambLight.intensity = (isDark ? 0.3 : 1.0) + (1.0 - scrollPercent) * 1.5;
      dirLight1.intensity = 2.0 + Math.sin(elapsed * 1.5) * 0.5 + scrollPercent * 4.0;
      dirLight2.intensity = 1.0 + (1.0 - scrollPercent) * 2.5;

      // Adjust camera placement dynamically depending on the current scroll amount
      // This gives an amazing depth/parallax effect on scroll
      camera.position.x = mouseX * 2;
      camera.position.y = mouseY * 2;
      // Scroll moves camera closer and down slightly
      // Initially, we are at z=35, we zoom in slightly naturally, and scroll takes us in more
      camera.position.z = Math.max(15, 35 - Math.min(elapsed * 2, 10) - scrollPercent * 25);
      camera.lookAt(coreGroup.position.x * 0.5, -scrollPercent * 3, 0);

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
      innerGeo.dispose();
      shellGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      innerMat.dispose();
      shellMat.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      dataStreamGeo.dispose();
      dataStreamMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      ambLight.dispose();
      dirLight1.dispose();
      dirLight2.dispose();
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
