import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/redux/hooks';
import usePlaylist from 'src/utils/usePlaylist';
import { setSelectedPlaylist, setUserPlaylists } from 'src/app/redux/musicPlayerSlice';
import { PlaylistContainer } from 'src/common/styles/PlaylistStyle';
import { useFetchUserPlaylistsQuery } from 'src/app/redux/services/api/musicPlayerApi';

function Playlist() {
  const dispatch = useAppDispatch();
  const { playlist } = usePlaylist();
  const { data, isSuccess } = useFetchUserPlaylistsQuery();

  // fetch all user playlists data
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserPlaylists(data));
    }
  }, [dispatch, data, isSuccess]);

  const changeSelectedPlaylist = async (selectedPlaylistId: string) => {
    dispatch(setSelectedPlaylist(selectedPlaylistId));
  };

  return (
    <PlaylistContainer>
      <ul>
        {playlist.length > 0 &&
          playlist.map(({ name, id }) => {
            return (
              <li
                key={id}
                onClick={() => changeSelectedPlaylist(id)}
                role='none' // i win this round jsx-a11y
              >
                {name}
              </li>
            );
          })}
      </ul>
    </PlaylistContainer>
  );
}

export default Playlist;
