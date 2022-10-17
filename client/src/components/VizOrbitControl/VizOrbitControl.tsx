import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

function VizOrbitControl() {
  const { camera, gl } = useThree();
  // orbit controls allows user to interact w/ interface
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 3;
    controls.maxDistance = 20;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
}

export default VizOrbitControl;
