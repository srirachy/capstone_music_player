import { useRef } from 'react';
import { Mesh } from 'three';
import { SphereProps } from 'src/common/models';
import { sphereColor } from 'src/utils/Functions';
import VisualizerAnalyzer from '../VisualizerAnalyzer/VisualizerAnalyzer';

function VisualizerSphere({ angle, index, sound, position, radius }: SphereProps) {
  const mesh = useRef<Mesh>(null!);

  return (
    <>
      <mesh position={position} ref={mesh}>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshPhongMaterial color={sphereColor(angle, radius)} />
      </mesh>
      <VisualizerAnalyzer sound={sound} index={index} mesh={mesh} />
    </>
  );
}

export default VisualizerSphere;
