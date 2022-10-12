import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PositionalAudio } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  SMAA,
} from '@react-three/postprocessing';
import { SoundRefType } from 'src/types';
import VisualizerSphere from '../VisualizerSphere/VisualizerSphere';

function VisualizerTheme() {
  const sound = useRef<SoundRefType>(null!);

  function createSpheres() {
    const number = 20;
    const increase = (Math.PI * 2) / number;
    const spheres = [];
    let angle = Math.PI / 2;

    for (let i = 0; i < number; i += 1) {
      const x = 5 * Math.cos(angle);
      const y = 5 * Math.sin(angle);
      const key = `sphere_${i}`;

      const idx = i < number / 2 ? i : number - 1;
      spheres.push(
        <VisualizerSphere
          key={key}
          position={[x, y, -10]}
          radius={0.25}
          angle={angle}
          sound={sound}
          index={idx}
        />,
      );
      angle += increase;
    }
    return spheres;
  }

  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 0, 5]} />
      <Suspense fallback={null}>
        <PositionalAudio
          autoplay
          url="Dreamin.mp3"
          distance={5}
          loop
          ref={sound}
        />
        {createSpheres()}
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0}
            luminanceSmoothing={0.8}
          />
          <SMAA />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

export default VisualizerTheme;
