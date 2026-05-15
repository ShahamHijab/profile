"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SkillsScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const boxes = [];
    const boxColors = [0xff00ff, 0x00ffff, 0xffff00, 0x00ff88, 0xff6600, 0xbf00ff];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 0.3 + 0.1;
      const geo = new THREE.BoxGeometry(size, size, size);
      const mat = new THREE.MeshBasicMaterial({
        color: boxColors[Math.floor(Math.random() * boxColors.length)],
        wireframe: true,
        transparent: true,
        opacity: Math.random() * 0.4 + 0.1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
      );
      scene.add(mesh);
      boxes.push(mesh);
    }

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
      boxes.forEach((b, i) => {
        b.rotation.x += 0.005 + i * 0.0002;
        b.rotation.y += 0.007 + i * 0.0001;
        b.position.y += Math.sin(t + i) * 0.003;
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

  return <div ref={mountRef} className="absolute inset-0 w-full h-full opacity-50" />;
}
