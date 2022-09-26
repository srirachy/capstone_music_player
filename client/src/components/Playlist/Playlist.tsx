import { useEffect } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import usePlaylist from 'src/utils/usePlaylist';
import { fetchUserPlaylist } from '../../store/musicPlayerSlice';
import { PlaylistContainer } from '../../styles/PlaylistStyle';

function Playlist() {
  const dispatch = useAppDispatch();
  const { playlist } = usePlaylist();

  // fetch all user playlists data
  useEffect(() => {
    const getPlaylistData = async () => {
      await dispatch(fetchUserPlaylist());
    };
    getPlaylistData();
  }, [dispatch]);

  return (
    <PlaylistContainer>
      <ul>
        {playlist.length > 0 &&
          playlist.map(({ name, id }) => {
            return <li key={id}>{name}</li>;
          })}
      </ul>
    </PlaylistContainer>
  );
}

export default Playlist;
