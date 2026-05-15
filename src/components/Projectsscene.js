"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ProjectsScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const orbs = [];
    const orbColors = [0xff00ff, 0x00ffff, 0xffff00, 0x00ff88, 0xff6600];
    for (let i = 0; i < 12; i++) {
      const geo = new THREE.SphereGeometry(Math.random() * 0.3 + 0.1, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: orbColors[i % orbColors.length],
        wireframe: true,
        transparent: true,
        opacity: Math.random() * 0.3 + 0.05,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 8,
      );
      scene.add(mesh);
      orbs.push({ mesh, speed: Math.random() * 0.5 + 0.2, offset: Math.random() * Math.PI * 2 });
    }

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let frameId, t = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.008;
      orbs.forEach(({ mesh, speed, offset }) => {
        mesh.rotation.x += 0.003 * speed;
        mesh.rotation.y += 0.005 * speed;
        mesh.position.y += Math.sin(t * speed + offset) * 0.008;
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full opacity-40" />;
}