import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { AnalyzerProps } from 'src/common/models';
import { adjustScale } from 'src/utils/Functions';
import * as THREE from 'three';

function VisualizerAnalyzer({ sound, index, mesh }: AnalyzerProps) {
  const analyzer = useRef<THREE.AudioAnalyser>(null!);
  const refMesh = mesh;

  // creates AudioAnalyser node to use for sound data
  useEffect(() => {
    analyzer.current = new THREE.AudioAnalyser(sound.current, 128);
  }, [sound]);

  useFrame(() => {
    if (analyzer.current) {
      const data = analyzer.current.getFrequencyData(); // sound data
      const currentScale = adjustScale(data[index * 2], 0, 255, 0.25, 1.5);
      refMesh.current.scale.x = currentScale;
      refMesh.current.scale.y = currentScale;
      refMesh.current.scale.z = currentScale;
    }
  });
  return null; // previously had it return empty fragment. i think null is better/cleaner
}

export default VisualizerAnalyzer;
