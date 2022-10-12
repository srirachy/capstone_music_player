import { useRef } from 'react';
import * as THREE from 'three';
import { Mesh } from 'three';
import { SphereProps } from 'src/types';
import VisualizerAnalyzer from '../VisualizerAnalyzer/VisualizerAnalyzer';

function VisualizerSphere({
  angle,
  index,
  sound,
  position,
  radius,
}: SphereProps) {
  const mesh = useRef<Mesh>(null!);

  function sphereColor() {
    const fakeColor = radius * 0; // mostly to satisfy unused prop (damned if i do, damned if i don't kinda thing)
    const r =
      +Math.floor((Math.sin(angle - Math.PI) + 1) * 128) + fakeColor;
    const g =
      +Math.floor(
        (Math.sin(angle - Math.PI - (4 * Math.PI) / 3) + 1) * 128,
      ) + fakeColor;
    const b =
      +Math.floor(
        (Math.sin(angle - Math.PI - (2 * Math.PI) / 3) + 1) * 128,
      ) + fakeColor;

    return new THREE.Color(`rgb(${r}, ${g}, ${b})`);
  }

  return (
    <>
      <mesh position={position} ref={mesh}>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshPhongMaterial color={sphereColor()} />
      </mesh>
      <VisualizerAnalyzer sound={sound} index={index} mesh={mesh} />
    </>
  );
}

export default VisualizerSphere;
