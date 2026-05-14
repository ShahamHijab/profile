"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    // Particles
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const neonColors = [
      new THREE.Color("#ff00ff"),
      new THREE.Color("#00ffff"),
      new THREE.Color("#ffff00"),
      new THREE.Color("#00ff88"),
      new THREE.Color("#ff6600"),
    ];
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      const c = neonColors[Math.floor(Math.random() * neonColors.length)];
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));
    const mat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.8 });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Wireframe torus knot
    const torusGeo = new THREE.TorusKnotGeometry(1.5, 0.4, 128, 16);
    const torusMat = new THREE.MeshBasicMaterial({
      color: "#ff00ff",
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torus);

    // Inner glowing torus
    const torus2Geo = new THREE.TorusKnotGeometry(1.2, 0.25, 64, 8);
    const torus2Mat = new THREE.MeshBasicMaterial({
      color: "#00ffff",
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
    scene.add(torus2);

    // Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: "#ffff00", wireframe: true, transparent: true, opacity: 0.2 });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(3, 1, -2);
    scene.add(ico);

    // Mouse
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let frameId;
    let t = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.005;

      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.001;

      torus.rotation.x = t * 0.4;
      torus.rotation.y = t * 0.6;
      torus2.rotation.x = -t * 0.5;
      torus2.rotation.z = t * 0.3;

      ico.rotation.x += 0.01;
      ico.rotation.y += 0.007;

      // Mouse parallax
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      // Color shift on torus
      const hue = (t * 50) % 360;
      const color = new THREE.Color(`hsl(${hue}, 100%, 60%)`);
      torusMat.color = color;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}