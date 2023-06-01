import React, { useRef, useEffect } from 'react';
import { WebGLRenderer, Scene, PerspectiveCamera } from 'three';

const SceneComponent = () => {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      // Update your scene here

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={sceneRef}></div>;
};

export default SceneComponent;
