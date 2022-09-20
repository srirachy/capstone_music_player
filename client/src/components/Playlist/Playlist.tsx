import { useEffect } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import usePlaylist from 'src/utils/usePlaylist';
import {
  fetchUserPlaylist,
  setPlaylist,
  setSelectedPlaylist,
} from '../../store/musicPlayerSlice';
import { PlaylistContainer } from '../../styles/PlaylistStyle';
import { PlaylistItemsType } from '../../types';

function Playlist() {
  const dispatch = useAppDispatch();
  const { selectedPlaylist, playlist } = usePlaylist();

  // fetch all user playlists data
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await dispatch(fetchUserPlaylist());
      const { items } = await response.payload;
      const playlists = items.map(
        ({ name, id }: PlaylistItemsType) => {
          return { name, id };
        },
      );
      if (playlists) {
        dispatch(setPlaylist(playlists)); // set all playlists from user's playlist data
      }
      if (selectedPlaylist === '') {
        dispatch(setSelectedPlaylist(items[0].id)); // set first playlist as selected
      }
    };
    getPlaylistData();
  }, [dispatch, selectedPlaylist]);

  return (
    <PlaylistContainer>
      <ul>
        {Object.keys(playlist).length > 0 &&
          playlist.map(({ name, id }) => {
            return <li key={id}>{name}</li>;
          })}
      </ul>
    </PlaylistContainer>
  );
}

export default Playlist;
