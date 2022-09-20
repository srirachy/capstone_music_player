import { useEffect } from 'react';
import { AiFillClockCircle } from 'react-icons/ai';
import { useAppDispatch } from 'src/store/hooks';
import {
  fetchSelectedPlaylist,
  setPlaylistSongs,
} from 'src/store/musicPlayerSlice';
import usePlaylist from 'src/utils/usePlaylist';
import {
  ContentContainer,
  ListInfoWrapper,
  ImageWrapper,
  DetailWrapper,
  HeaderRow,
  HeaderCol,
  SongListContainer,
  SongWrapper,
  SongRow,
  SongCol,
  SongColDetail,
  SongImageWrapper,
  SongInfoWrapper,
} from '../../styles/SpotifyContent';
import { TrackType, ArtistProp, HeaderBkgdType } from '../../types';
import { convertMsToStandardTime } from '../../utils/Functions';

function SpotifyContent({ headerBackground }: HeaderBkgdType) {
  const dispatch = useAppDispatch();
  const { selectedPlaylist, playlistSongs } = usePlaylist();

  useEffect(() => {
    const getPlaylistSongs = async () => {
      const response = await dispatch(
        fetchSelectedPlaylist(selectedPlaylist),
      );
      const data = await response.payload;
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
    if (selectedPlaylist) {
      getPlaylistSongs();
    }
  }, [dispatch, selectedPlaylist]);

  return (
    <ContentContainer>
      {Object.keys(playlistSongs).length > 0 && (
        <>
          <ListInfoWrapper>
            <ImageWrapper>
              <img
                src={playlistSongs.image}
                alt="playlist album cover"
              />
            </ImageWrapper>
            <DetailWrapper>
              <span>PLAYLIST</span>
              <h1>{playlistSongs.name}</h1>
              <p>{playlistSongs.description}</p>
            </DetailWrapper>
          </ListInfoWrapper>
          <SongListContainer>
            <HeaderRow headerBackground={headerBackground}>
              <HeaderCol>
                <span>#</span>
              </HeaderCol>
              <HeaderCol>
                <span>TITLE</span>
              </HeaderCol>
              <HeaderCol>
                <span>ALBUM</span>
              </HeaderCol>
              <HeaderCol>
                <span>
                  <AiFillClockCircle />
                </span>
              </HeaderCol>
            </HeaderRow>
            <SongWrapper>
              {Object.keys(playlistSongs.tracks).length > 0 &&
                playlistSongs.tracks.map(
                  (
                    {
                      id,
                      image,
                      name,
                      artists,
                      album,
                      duration,
                      // context_uri,
                      // track_number,
                    },
                    i,
                  ) => {
                    return (
                      <SongRow key={id}>
                        <SongCol>
                          <span>{i + 1}</span>
                        </SongCol>
                        <SongColDetail>
                          <SongImageWrapper>
                            <img src={image} alt="track album art" />
                          </SongImageWrapper>
                          <SongInfoWrapper>
                            <span>{name}</span>
                            {artists && (
                              <span>{artists.join(', ')}</span>
                            )}
                          </SongInfoWrapper>
                        </SongColDetail>
                        <SongCol>
                          <span>{album}</span>
                        </SongCol>
                        <SongCol>
                          <span>
                            {convertMsToStandardTime(duration)}
                          </span>
                        </SongCol>
                      </SongRow>
                    );
                  },
                )}
            </SongWrapper>
          </SongListContainer>
        </>
      )}
    </ContentContainer>
  );
}

export default SpotifyContent;
