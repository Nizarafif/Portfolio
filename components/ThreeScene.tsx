'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SETUP DASAR ---
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // --- PENGATURAN PARTIKEL (CONSTELLATION) ---
    const particleCount = 100;
    const maxConnections = 150;
    const minDistance = 60;

    const group = new THREE.Group();
    scene.add(group);

    // Buffer Data Partikel
    const segments = particleCount * particleCount;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(segments * 3);

    // Generate random positions & velocities
    const particlePositions: THREE.Vector3[] = [];
    const particleData: { velocity: THREE.Vector3; numConnections: number }[] = [];

    const r = 200; // area persebaran partikel

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * r - r / 2;
      const y = Math.random() * r - r / 2;
      const z = Math.random() * r - r / 2;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particlePositions.push(new THREE.Vector3(x, y, z));
      particleData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4
        ),
        numConnections: 0,
      });
    }

    // Geometri & Material Partikel
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Desain partikel bulat bercahaya dengan warna teal-cyan
    const pMaterial = new THREE.PointsMaterial({
      color: 0x0f766e, // Teal
      size: 4,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: true,
      opacity: 0.8,
    });

    const pointCloud = new THREE.Points(particleGeometry, pMaterial);
    group.add(pointCloud);

    // Geometri & Material Garis Penghubung
    const linePositions = new Float32Array(segments * 3);
    const lineColors = new Float32Array(segments * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.4,
      linewidth: 1, // Catatan: linewidth > 1 biasanya tidak didukung oleh WebGL bawaan browser
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(linesMesh);

    // --- INTERAKSI MOUSE (PARALLAX EFFECT) ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalisasi koordinat mouse ke range [-1, 1]
      mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- ANIMATION LOOP ---
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Lerping gerakan mouse agar sangat halus
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Putar grup objek secara perlahan + respons kursor mouse
      group.rotation.y = Date.now() * 0.00005 + targetX * 0.3;
      group.rotation.x = targetY * 0.2;

      let vertexpos = 0;
      let colorpos = 0;
      let numConnected = 0;

      // Reset jumlah koneksi per partikel
      for (let i = 0; i < particleCount; i++) {
        particleData[i].numConnections = 0;
      }

      // Update posisi partikel
      for (let i = 0; i < particleCount; i++) {
        const particlePos = particlePositions[i];
        const data = particleData[i];

        particlePos.add(data.velocity);

        // Pantulkan jika keluar dari batas kubus 3D
        const limit = r / 2;
        if (particlePos.x < -limit || particlePos.x > limit) data.velocity.x = -data.velocity.x;
        if (particlePos.y < -limit || particlePos.y > limit) data.velocity.y = -data.velocity.y;
        if (particlePos.z < -limit || particlePos.z > limit) data.velocity.z = -data.velocity.z;

        // Tulis posisi baru ke attribute buffer
        positions[i * 3] = particlePos.x;
        positions[i * 3 + 1] = particlePos.y;
        positions[i * 3 + 2] = particlePos.z;
      }

      pointCloud.geometry.attributes.position.needsUpdate = true;

      // Hitung koneksi antar partikel
      for (let i = 0; i < particleCount; i++) {
        const posA = particlePositions[i];

        for (let j = i + 1; j < particleCount; j++) {
          const posB = particlePositions[j];

          const dist = posA.distanceTo(posB);

          if (dist < minDistance && numConnected < maxConnections) {
            // Hubungkan dengan garis
            linePositions[vertexpos++] = posA.x;
            linePositions[vertexpos++] = posA.y;
            linePositions[vertexpos++] = posA.z;

            linePositions[vertexpos++] = posB.x;
            linePositions[vertexpos++] = posB.y;
            linePositions[vertexpos++] = posB.z;

            // Berikan warna gradasi transparan berdasarkan jarak (semakin dekat, semakin terang)
            const alpha = 1.0 - dist / minDistance;

            // Gradasi warna Teal (0.05, 0.46, 0.43) ke Cyan (0.06, 0.70, 0.81)
            lineColors[colorpos++] = 0.05 + 0.01 * alpha;
            lineColors[colorpos++] = 0.46 + 0.24 * alpha;
            lineColors[colorpos++] = 0.43 + 0.38 * alpha;

            lineColors[colorpos++] = 0.05 + 0.01 * alpha;
            lineColors[colorpos++] = 0.46 + 0.24 * alpha;
            lineColors[colorpos++] = 0.43 + 0.38 * alpha;

            numConnected++;
          }
        }
      }

      linesMesh.geometry.attributes.position.needsUpdate = true;
      linesMesh.geometry.attributes.color.needsUpdate = true;
      linesMesh.geometry.setDrawRange(0, numConnected * 2);

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE LISTENER ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- CLEAN UP / CLEAN MEMORY ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resource Three.js agar tidak terjadi memory leak
      particleGeometry.dispose();
      pMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10 w-full h-full overflow-hidden opacity-35 pointer-events-none"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
