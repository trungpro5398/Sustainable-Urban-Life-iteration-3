import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { FaTrashAlt, FaEye } from "react-icons/fa";
import "./style.scss";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const PolygonInfo = ({ index, onDelete, area, vertices2D }) => {
  const [show3DModel, setShow3DModel] = useState(false);
  const modelContainerRef = useRef(null);

  useEffect(() => {
    if (show3DModel && modelContainerRef.current) {
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        75,
        modelContainerRef.current.clientWidth /
          modelContainerRef.current.clientHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(
        modelContainerRef.current.clientWidth,
        modelContainerRef.current.clientHeight
      );
      modelContainerRef.current.appendChild(renderer.domElement);

      const shapePoints = vertices2D.map((v) => new THREE.Vector2(v.x, v.y));
      const shape = new THREE.Shape(shapePoints);
      const extrudeSettings = { depth: 5, bevelEnabled: false };
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
      const roof = new THREE.Mesh(geometry, material);

      geometry.computeBoundingBox();
      const center = geometry.boundingBox.getCenter(new THREE.Vector3());
      geometry.center();
      scene.add(roof);

      camera.position.set(center.x, center.y, center.z + 10);
      camera.lookAt(center);

      // Lights
      const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xffffff, 1, 0);
      pointLight.position.set(center.x, center.y, center.z + 50);
      scene.add(pointLight);

      // Grid helper
      const size = 100;
      const divisions = 100;
      const gridHelper = new THREE.GridHelper(size, divisions);
      scene.add(gridHelper);

      // Orbit Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();
    }
  }, [show3DModel, vertices2D]);

  return (
    <div className="polygon-container">
      <div className="polygon-info">
        <div className="polygon-title">Roof area {index + 1}</div>
        <div className="polygon-details">Area: {Math.round(area)} m2</div>
        <button className="delete-btn" onClick={onDelete}>
          <FaTrashAlt /> Delete
        </button>
        {/* <button className="view-3d-btn" onClick={() => setShow3DModel(true)}>
          <FaEye /> View 3D
        </button> */}
      </div>
      {show3DModel && (
        <div className="model-container" ref={modelContainerRef}>
          <button className="close-btn" onClick={() => setShow3DModel(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default PolygonInfo;
