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

    // Lights — colored point lights are what sell the "chrome catching neon" look,
    // since MeshStandardMaterial needs real light sources to read as metallic.
    const ambient = new THREE.AmbientLight(0x404050, 1.2);
    scene.add(ambient);

    const pinkLight = new THREE.PointLight(0xff00ff, 18, 20);
    pinkLight.position.set(-3, 2, 3);
    scene.add(pinkLight);

    const blueLight = new THREE.PointLight(0x00aaff, 18, 20);
    blueLight.position.set(3, -1, 3);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 14, 20);
    purpleLight.position.set(0, 3, -2);
    scene.add(purpleLight);

    const rimLight = new THREE.DirectionalLight(0xe8eaef, 0.8);
    rimLight.position.set(-2, 4, 5);
    scene.add(rimLight);

    // Particles — blue / purple / pink / silver only
    const particleCount = 2600;
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color("#ff00ff"),
      new THREE.Color("#00aaff"),
      new THREE.Color("#a855f7"),
      new THREE.Color("#c8ccd4"),
      new THREE.Color("#ff4dd8"),
    ];
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      const c = palette[Math.floor(Math.random() * palette.length)];
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

    // Chrome torus knot — real metal, lit by the colored lights above
    const torusGeo = new THREE.TorusKnotGeometry(1.5, 0.4, 200, 32);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xd8dce2,
      metalness: 1,
      roughness: 0.22,
      envMapIntensity: 1.2,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torus);

    // Thin wireframe halo around it for depth
    const haloGeo = new THREE.TorusKnotGeometry(1.62, 0.42, 100, 12);
    const haloMat = new THREE.MeshBasicMaterial({
      color: "#00aaff",
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    scene.add(halo);

    // Chrome icosahedron satellite
    const icoGeo = new THREE.IcosahedronGeometry(0.7, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0xe8eaef,
      metalness: 1,
      roughness: 0.3,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(3, 1, -2);
    scene.add(ico);

    // Small wireframe cage around the satellite
    const cageGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const cageMat = new THREE.MeshBasicMaterial({ color: "#ff00ff", wireframe: true, transparent: true, opacity: 0.2 });
    const cage = new THREE.Mesh(cageGeo, cageMat);
    cage.position.copy(ico.position);
    scene.add(cage);

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
      halo.rotation.x = -t * 0.35;
      halo.rotation.y = t * 0.55;

      ico.rotation.x += 0.01;
      ico.rotation.y += 0.007;
      cage.rotation.x -= 0.006;
      cage.rotation.y -= 0.009;

      // Orbit the colored lights around the chrome so it catches shifting neon glints
      pinkLight.position.x = Math.sin(t * 0.6) * 4;
      pinkLight.position.z = Math.cos(t * 0.6) * 4;
      blueLight.position.x = Math.sin(t * 0.6 + Math.PI) * 4;
      blueLight.position.z = Math.cos(t * 0.6 + Math.PI) * 4;
      purpleLight.position.y = Math.sin(t * 0.4) * 3;

      // Mouse parallax
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

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
