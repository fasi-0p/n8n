"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AutomationScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#000000", 4, 14);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    /* ---------------- MAIN ENERGY FIELD ---------------- */

    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 1800; i++) {
      vertices.push(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14
      );
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    const material = new THREE.PointsMaterial({
      color: "#22d3ee",
      size: 0.015,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    /* ---------------- ENERGY STREAKS ---------------- */

    const streakGeometry = new THREE.BufferGeometry();
    const streakVertices = [];

    for (let i = 0; i < 400; i++) {
      streakVertices.push(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 16
      );
    }

    streakGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(streakVertices, 3)
    );

    const streakMaterial = new THREE.PointsMaterial({
      color: "#8b5cf6", // violet contrast
      size: 0.025,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const streaks = new THREE.Points(streakGeometry, streakMaterial);
    scene.add(streaks);

    /* ---------------- LIGHTING ---------------- */

    const light = new THREE.PointLight("#22d3ee", 2, 50);
    light.position.set(0, 0, 5);
    scene.add(light);

    /* ---------------- INTERACTION ---------------- */

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    /* ---------------- ANIMATION LOOP ---------------- */

    const animate = () => {
      const time = performance.now() * 0.001;

      // Main field motion
      points.rotation.y += 0.0007;
      points.position.y = Math.sin(time * 0.2) * 0.2;

      material.opacity = 0.3 + Math.sin(time) * 0.12;

      // 🔥 Streak flow motion (KEY EFFECT)
      streaks.position.y -= 0.01;

      if (streaks.position.y < -2) {
        streaks.position.y = 2;
      }

      streakMaterial.opacity = 0.5 + Math.sin(time * 2) * 0.2;

      // Camera drift
      camera.position.x += (mouse.current.x * 0.35 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.current.y * 0.35 - camera.position.y) * 0.05;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    /* ---------------- RESIZE ---------------- */

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}