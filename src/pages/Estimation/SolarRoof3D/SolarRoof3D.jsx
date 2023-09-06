// SolarRoof3D.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const SolarPanel = ({ position }) => (
  <mesh position={position}>
    <boxGeometry args={[5, 3, 0.1]} />
    <meshStandardMaterial color="blue" />
  </mesh>
);

const SolarRoof3D = ({ panelPositions }) => {
  return (
    <Canvas style={{ width: "400px", height: "400px" }}>
      <perspectiveCamera position={[0, 5, 20]} lookAt={[0, 0, 0]} />

      <ambientLight />
      <pointLight position={[0, 5, 10]} />

      {panelPositions.map((pos, index) => (
        <SolarPanel position={pos} key={index} />
      ))}
      <OrbitControls />
    </Canvas>
  );
};

export default SolarRoof3D;
