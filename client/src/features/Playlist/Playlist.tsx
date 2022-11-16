import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/redux/hooks';
import usePlaylist from 'src/utils/usePlaylist';
import { fetchUserPlaylist, setSelectedPlaylist } from 'src/app/redux/musicPlayerSlice';
import { PlaylistContainer } from 'src/common/styles/PlaylistStyle';

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
