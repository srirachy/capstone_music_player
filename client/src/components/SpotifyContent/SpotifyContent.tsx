import { useEffect } from 'react';
import { AiFillClockCircle } from 'react-icons/ai';
import { useAppDispatch } from 'src/store/hooks';
import { setPlaylistSongs } from 'src/store/musicPlayerSlice';
import usePlaylist from 'src/utils/usePlaylist';
import { ContentContainer } from '../../styles/SpotifyContent';
import { TrackType, ArtistProp } from '../../types';

function SpotifyContent() {
  const dispatch = useAppDispatch();
  const playlist = usePlaylist();

  useEffect(() => {
    const getPlaylistSongs = async () => {
      const response = await fetch(
        `/auth/playlists/${playlist.selectedPlaylist}`,
      );
      const resData = await response.json();
      const data = JSON.parse(resData);
      const songData = {
        id: data.id,
        name: data.name,
        description: data.description.startsWith('<a')
          ? ''
          : data.description,
        image: data.images[0].url,
        tracks: data.tracks.items.map(({ track }: TrackType) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map(
            (artist: ArtistProp) => artist.name,
          ),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      if (songData) {
        dispatch(setPlaylistSongs(songData)); // set song data from selected playlist
      }
    };
    if (playlist.selectedPlaylist) {
      getPlaylistSongs();
    }
  }, [dispatch, playlist.selectedPlaylist]);

  return (
    <ContentContainer>
      <AiFillClockCircle />
      <p>meow</p>
    </ContentContainer>
  );
}

export default SpotifyContent;
