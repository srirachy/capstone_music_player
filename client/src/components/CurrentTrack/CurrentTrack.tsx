import { useEffect } from 'react';
import { setCurrentTrack } from 'src/store/musicPlayerSlice';
import { useAppDispatch } from 'src/store/hooks';
import { CurrentTrackContainer } from '../../styles/CurrentTrackStyle';
import { ArtistProp } from '../../types';

function CurrentTrack() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await fetch(
        'auth/me/player/currently-playing',
      );
      const resData = await response.json();
      const data = JSON.parse(resData);
      if (Object.keys(data).length > 0) {
        const { item } = data;
        const currentTrackObj = {
          id: item.id,
          name: item.name,
          artists: item.artists.map(
            (artist: ArtistProp) => artist.name,
          ),
          image: item.album.images[2].url,
        };
        console.log(currentTrackObj);
        dispatch(setCurrentTrack(currentTrackObj));
      }
    };
    getCurrentTrack();
  }, [dispatch]);
  return <CurrentTrackContainer>CurrentTrack</CurrentTrackContainer>;
}

export default CurrentTrack;
