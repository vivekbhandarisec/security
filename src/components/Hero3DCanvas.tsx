import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0c10, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Append canvas
    container.appendChild(renderer.domElement);

    // --- 1. Create Floating Monolith / Crystal Geometry ---
    // Custom faceted geometry for procedural crystal look
    const crystalGeo = new THREE.IcosahedronGeometry(1.6, 0); // Faceted low-poly look
    // Slightly randomize vertex positions to create a unique crystal monolith shape
    const posAttr = crystalGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const vz = posAttr.getZ(i);
      posAttr.setXYZ(
        i,
        vx * (1 + (Math.random() - 0.5) * 0.18),
        vy * (1.2 + (Math.random() - 0.5) * 0.15), // Elongated monolith
        vz * (1 + (Math.random() - 0.5) * 0.18)
      );
    }
    crystalGeo.computeVertexNormals();

    // Physical Glassy Crystal Material
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x12141c,
      emissive: 0x0a1128,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.65, // Translucent glass effect
      ior: 1.5,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      flatShading: true, // Crisp crystalline facets
    });

    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    scene.add(crystalMesh);

    // Outer Energy Cage Wireframe
    const wireGeo = new THREE.IcosahedronGeometry(1.95, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff5e5b,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    crystalMesh.add(wireMesh);

    // Orbiting Satellite Energy Crystals
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.OctahedronGeometry(0.2, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      flatShading: true,
    });

    for (let i = 0; i < 3; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      scene.add(sat);
      satellites.push(sat);
    }

    // --- 2. Ambient Particles ---
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const coralColor = new THREE.Color(0xff5e5b);
    const indigoColor = new THREE.Color(0x6366f1);
    const iceColor = new THREE.Color(0x00f0ff);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 18;

      const mix = Math.random();
      let col = coralColor;
      if (mix > 0.66) col = iceColor;
      else if (mix > 0.33) col = indigoColor;

      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- 3. Cursor-Reactive Lights ---
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    // Electric Coral Cursor Tracking PointLight
    const cursorLight = new THREE.PointLight(0xff5e5b, 4, 12);
    cursorLight.position.set(2, 2, 3);
    scene.add(cursorLight);

    // Deep Indigo Rim Light
    const rimLight1 = new THREE.PointLight(0x6366f1, 5, 12);
    rimLight1.position.set(-4, -2, -2);
    scene.add(rimLight1);

    // Ice Blue Bottom Specular Light
    const rimLight2 = new THREE.PointLight(0x00f0ff, 4, 10);
    rimLight2.position.set(3, -3, 2);
    scene.add(rimLight2);

    // --- Mouse & Scroll Tracking ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Window Resize Handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // --- Render Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Update cursor light position in 3D world
      cursorLight.position.x = mouse.x * 5;
      cursorLight.position.y = mouse.y * 5;

      // Crystal Monolith Levitation & Rotation
      const scrollFactor = Math.min(scrollY / 800, 1);
      crystalMesh.rotation.y = elapsedTime * 0.25 + mouse.x * 0.8 + scrollFactor * Math.PI;
      crystalMesh.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2 + mouse.y * 0.4;
      crystalMesh.position.y = Math.sin(elapsedTime * 1.2) * 0.15 - scrollFactor * 1.5;
      crystalMesh.position.x = mouse.x * 0.5 + scrollFactor * 2.0;

      // Scale transformation on scroll
      const scale = Math.max(0.6, 1 - scrollFactor * 0.4);
      crystalMesh.scale.set(scale, scale, scale);

      // Wireframe counter-rotation
      wireMesh.rotation.y = -elapsedTime * 0.4;
      wireMesh.rotation.z = elapsedTime * 0.1;

      // Satellites orbiting monolith
      satellites.forEach((sat, i) => {
        const angle = elapsedTime * 0.8 + (i * Math.PI * 2) / 3;
        const radius = 2.8 + Math.sin(elapsedTime * 2 + i) * 0.3;
        sat.position.x = crystalMesh.position.x + Math.cos(angle) * radius;
        sat.position.z = crystalMesh.position.z + Math.sin(angle) * radius;
        sat.position.y = crystalMesh.position.y + Math.sin(angle * 2) * 0.6;
        sat.rotation.x = elapsedTime * 2;
        sat.rotation.y = elapsedTime * 2;
      });

      // Slowly rotate particle dust cloud
      particleSystem.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      crystalGeo.dispose();
      crystalMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    />
  );
}
