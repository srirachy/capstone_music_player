import { useEffect } from 'react';
import { AiFillClockCircle } from 'react-icons/ai';
import { useAppDispatch } from 'src/app/redux/hooks';
import { fetchSelectedPlaylist, fetchSong } from 'src/app/redux/musicPlayerSlice';
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
} from '../../common/styles/SpotifyContent';
import { HeaderBkgdType } from '../../common/models';
import { convertMsToStandardTime } from '../../utils/Functions';
// import { useFetchCurrentTrackMutation } from 'src/app/redux/services/api/api';

function SpotifyContent({ headerBackground }: HeaderBkgdType) {
  const dispatch = useAppDispatch();
  const {
    selectedPlaylist,
    playlistSongs: { image, name, description, tracks },
  } = usePlaylist();
  // const [getCurrentTrack] = useFetchCurrentTrackMutation();

  // fetch data of selected playlist for content output
  useEffect(() => {
    const getPlaylistSongs = async () => {
      await dispatch(fetchSelectedPlaylist(selectedPlaylist));
    };
    if (selectedPlaylist) {
      getPlaylistSongs();
    }
  }, [dispatch, selectedPlaylist]);

  const changeTrack = async (uri: string, trackNum: number) => {
    const songObj = {
      uri,
      trackNum,
    };
    await dispatch(fetchSong(songObj));
    // await dispatch(fetchCurrentTrack());
    // await getCurrentTrack({});
  };

  return (
    <ContentContainer>
      {name && (
        <>
          <ListInfoWrapper>
            <ImageWrapper>
              <img src={image} alt='playlist album cover' />
            </ImageWrapper>
            <DetailWrapper>
              <span>PLAYLIST</span>
              <h1>{name}</h1>
              <p>{description}</p>
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
              {tracks.length > 0 &&
                tracks.map(
                  (
                    {
                      id,
                      image: trackImg,
                      name: trackName,
                      artists,
                      album,
                      duration,
                      context_uri: contextUri,
                      track_number: trackNum,
                    }: any,
                    i: number,
                  ) => {
                    return (
                      <SongRow
                        key={id}
                        onClick={() => {
                          changeTrack(contextUri, trackNum);
                        }}
                      >
                        <SongCol>
                          <span>{i + 1}</span>
                        </SongCol>
                        <SongColDetail>
                          <SongImageWrapper>
                            <img src={trackImg} alt='track album art' />
                          </SongImageWrapper>
                          <SongInfoWrapper>
                            <span>{trackName}</span>
                            {artists && <span>{artists.join(', ')}</span>}
                          </SongInfoWrapper>
                        </SongColDetail>
                        <SongCol>
                          <span>{album}</span>
                        </SongCol>
                        <SongCol>
                          <span>{convertMsToStandardTime(duration)}</span>
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
