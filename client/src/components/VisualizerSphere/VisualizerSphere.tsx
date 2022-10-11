/* eslint-disable react/destructuring-assignment */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { AudioAnalyser, Mesh } from 'three';
// import { SphereContainer } from '../../styles/VisualizerSphereStyle';

// type SphereProps = {
//   position: Vector3 | undefined;
//   radius: number;
//   angle: number;
//   sound: any;
//   index: number;
// };

function VisualizerSphere(props: any) {
  const mesh = useRef<Mesh>(null!);

  function sphereColor() {
    const r = +Math.floor(
      (Math.sin(props.angle - Math.PI) + 1) * 128,
    );
    const g = +Math.floor(
      (Math.sin(props.angle - Math.PI - (4 * Math.PI) / 3) + 1) * 128,
    );
    const b = +Math.floor(
      (Math.sin(props.angle - Math.PI - (2 * Math.PI) / 3) + 1) * 128,
    );

    return new THREE.Color(`rgb(${r}, ${g}, ${b})`);
  }

  function adjustScale(
    number: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ) {
    return (
      ((number - inMin) * (outMax - outMin)) / (inMax - inMin) +
      outMin
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function Analyzer({ sound }: any) {
    const analyzer = useRef<AudioAnalyser>(null!);

    useEffect(() => {
      analyzer.current = new THREE.AudioAnalyser(sound.current, 128);
    }, [sound]);

    useFrame(() => {
      if (analyzer.current) {
        const data = analyzer.current.getFrequencyData();
        mesh.current.scale.x = adjustScale(
          data[props.index * 2],
          0,
          255,
          0.25,
          1.5,
        );
        mesh.current.scale.y = adjustScale(
          data[props.index * 2],
          0,
          255,
          0.25,
          1.5,
        );
        mesh.current.scale.z = adjustScale(
          data[props.index * 2],
          0,
          255,
          0.25,
          1.5,
        );
      }
    });

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return (
    <>
      <mesh position={props.position} ref={mesh}>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshPhongMaterial color={sphereColor()} />
      </mesh>
      <Analyzer sound={props.sound} />
    </>
  );
}

export default VisualizerSphere;
