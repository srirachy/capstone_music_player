import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AnalyzerProps } from 'src/types';
import { adjustScale } from 'src/utils/Functions';

function VisualizerAnalyzer({ sound, index, mesh }: AnalyzerProps) {
  const analyzer = useRef<THREE.AudioAnalyser>(null!);
  const refMesh = mesh;

  useEffect(() => {
    analyzer.current = new THREE.AudioAnalyser(sound.current, 128);
  }, [sound]);

  useFrame(() => {
    if (analyzer.current) {
      const data = analyzer.current.getFrequencyData();
      refMesh.current.scale.x = adjustScale(
        data[index * 2],
        0,
        255,
        0.25,
        1.5,
      );
      refMesh.current.scale.y = adjustScale(
        data[index * 2],
        0,
        255,
        0.25,
        1.5,
      );
      refMesh.current.scale.z = adjustScale(
        data[index * 2],
        0,
        255,
        0.25,
        1.5,
      );
    }
  });
  return null;
}

export default VisualizerAnalyzer;
