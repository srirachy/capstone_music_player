import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PositionalAudio } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  SMAA,
} from '@react-three/postprocessing';
import { SoundRefType } from 'src/types';
import {
  MenuWrapper,
  VisualizerContainer,
  VizWrapper,
} from 'src/styles/VisualizerStyle';
import useVizSong from 'src/utils/useVizSong';
import { FaMusic } from 'react-icons/fa';
import usePlaylist from 'src/utils/usePlaylist';
import {
  fetchCurrentTrack,
  fetchSong,
  fetchVolume,
} from 'src/store/musicPlayerSlice';
import { useAppDispatch } from 'src/store/hooks';
import VisualizerSphere from '../VisualizerSphere/VisualizerSphere';
import VizOrbitControl from '../VizOrbitControl/VizOrbitControl';
import VisualizerMenu from '../VisualizerMenu/VisualizerMenu';

function VisualizerTheme() {
  const dispatch = useAppDispatch();
  const {
    playlistSongs: { tracks },
  } = usePlaylist();
  const { vizSong, trackChange } = useVizSong();
  const [showSong, setShowSong] = useState<boolean>(false);
  const sound = useRef<SoundRefType>(null!);

  useEffect(() => {
    const runInitSong = async () => {
      console.log(vizSong);
      const curTrack = tracks.find((elmt) => {
        return elmt.name === vizSong;
      });
      if (curTrack) {
        const uri = curTrack?.context_uri;
        const trackNum = curTrack?.track_number;
        const songObj = {
          uri,
          trackNum,
        };
        await dispatch(fetchSong(songObj));
        await dispatch(fetchCurrentTrack());
        await dispatch(fetchVolume('0'));
      }
    };
    runInitSong();
  }, [dispatch, tracks, vizSong]);

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

  function songList() {
    setShowSong(!showSong);
  }

  return (
    <VisualizerContainer>
      <MenuWrapper>
        <button onClick={songList} type="button">
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
            <Suspense fallback={null}>
              {vizSong && !trackChange && (
                <PositionalAudio
                  autoplay
                  url={`${vizSong}.mp3`}
                  distance={5}
                  ref={sound}
                />
              )}
              {vizSong && !trackChange && createSpheres()}
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
        </VizWrapper>
      )}
    </VisualizerContainer>
  );
}

export default VisualizerTheme;
