import { useEffect } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import usePlaylist from 'src/utils/usePlaylist';
import { setPlaylist } from '../../store/musicPlayerSlice';
import { PlaylistContainer } from '../../styles/PlaylistStyle';
import { PlaylistItemsType } from '../../types';

function Playlist() {
  const dispatch = useAppDispatch();
  const playlist = usePlaylist();

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await fetch('/auth/me/playlist');
      const data = await response.json();
      const { items } = JSON.parse(data);
      const playlists = items.map(
        ({ name, id }: PlaylistItemsType) => {
          return { name, id };
        },
      );
      dispatch(setPlaylist(playlists));
    };
    getPlaylistData();
  }, [dispatch]);

  return (
    <PlaylistContainer>
      <ul>
        {playlist.playlist.map(({ name, id }) => {
          return <li key={id}>{name}</li>;
        })}
      </ul>
    </PlaylistContainer>
  );
}

export default Playlist;
