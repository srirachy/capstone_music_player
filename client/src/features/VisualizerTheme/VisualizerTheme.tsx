import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PositionalAudio } from '@react-three/drei';
import { EffectComposer, Bloom, SMAA } from '@react-three/postprocessing';
import { SoundRefType } from 'src/common/models';
import { MenuWrapper, VisualizerContainer, VizWrapper } from 'src/common/styles/VisualizerStyle';
import useVizSong from 'src/utils/useVizSong';
import { FaMusic } from 'react-icons/fa';
import { fetchPauseOrPlay, fetchVolume } from '../../app/redux/musicPlayerSlice';
import { useAppDispatch } from 'src/app/redux/hooks';
import VisualizerSphere from '../VisualizerSphere/VisualizerSphere';
import VizOrbitControl from '../VizOrbitControl/VizOrbitControl';
import VisualizerMenu from '../VisualizerMenu/VisualizerMenu';

function VisualizerTheme() {
  const dispatch = useAppDispatch();
  const { vizSong, trackChange } = useVizSong();
  const [showSong, setShowSong] = useState<boolean>(false);
  const sound = useRef<SoundRefType>(null!);

  // set music player to pause and lower volume for initial setup
  useEffect(() => {
    const runInitSetup = async () => {
      await dispatch(fetchPauseOrPlay('pause'));
      await dispatch(fetchVolume('0'));
    };
    runInitSetup();
  }, [dispatch]);

  // create spheres from VisualizerSphere component
  function createSpheres() {
    const number = 20;
    const increase = (Math.PI * 2) / number;
    const spheres = [];
    let angle = Math.PI / 2;

    for (let i = 0; i < number; i += 1) {
      const x = 5 * Math.cos(angle);
      const y = 5 * Math.sin(angle);
      const key = `sphere_${i}`;

      const idx = i < number / 2 ? i : number - i;
      spheres.push(
        <VisualizerSphere key={key} position={[x, y, -10]} radius={0.25} angle={angle} sound={sound} index={idx} />,
      );
      angle += increase;
    }
    return spheres;
  }

  function toggleSongList() {
    setShowSong(!showSong); // show/hide song
  }

  return (
    <VisualizerContainer>
      <MenuWrapper>
        <button onClick={toggleSongList} type='button'>
          <FaMusic />
        </button>
        {showSong && <VisualizerMenu />}
      </MenuWrapper>
      {vizSong && (
        <VizWrapper>
          <Canvas>
            <VizOrbitControl />
            <ambientLight intensity={0.2} />
            <directionalLight position={[0, 0, 5]} />
            {vizSong && !trackChange && (
              <Suspense fallback={null}>
                <PositionalAudio autoplay loop={false} url={`${vizSong}.mp3`} distance={5} ref={sound} />
                {createSpheres()}
                <EffectComposer multisampling={0}>
                  <Bloom intensity={0.5} luminanceThreshold={0} luminanceSmoothing={0.8} />
                  <SMAA />
                </EffectComposer>
              </Suspense>
            )}
          </Canvas>
        </VizWrapper>
      )}
    </VisualizerContainer>
  );
}

export default VisualizerTheme;
