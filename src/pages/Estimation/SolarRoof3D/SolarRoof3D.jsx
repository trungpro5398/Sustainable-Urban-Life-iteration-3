import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const SolarRoof3D = ({ polygonVertices }) => {
  console.log(polygonVertices);
  const containerRef = useRef(null);

  useEffect(() => {
    if (polygonVertices.length === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Convert 2D polygon vertices to 3D geometry
    const shape = new THREE.Shape(polygonVertices);
    const extrudeSettings = { depth: 10, bevelEnabled: false };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    // Adjust camera position
    camera.position.z = 50;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      // Cleanup Three.js to prevent memory leak
      scene.dispose();
      geometry.dispose();
      material.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [polygonVertices]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "400px" }}></div>
  );
};

export default SolarRoof3D;
