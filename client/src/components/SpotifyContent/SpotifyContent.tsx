import { useEffect } from 'react';
import { AiFillClockCircle } from 'react-icons/ai';
import { useAppDispatch } from 'src/store/hooks';
import { setPlaylistSongs } from 'src/store/musicPlayerSlice';
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

  useEffect(() => {
    if (playlist.playlistSongs) {
      console.log(playlist.playlistSongs.tracks);
    }
  });

  return (
    <ContentContainer>
      {playlist.playlistSongs && (
        <>
          <ListInfoWrapper>
            <ImageWrapper>
              <img
                src={playlist.playlistSongs.image}
                alt="playlist album cover"
              />
            </ImageWrapper>
            <DetailWrapper>
              <span>PLAYLIST</span>
              <h1>{playlist.playlistSongs.name}</h1>
              <p>{playlist.playlistSongs.description}</p>
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
              {playlist.playlistSongs.tracks &&
                playlist.playlistSongs.tracks.map(
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
                            <span>{artists.join(', ')}</span>
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
