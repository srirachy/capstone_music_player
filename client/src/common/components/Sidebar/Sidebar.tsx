import { IoLibrary } from 'react-icons/io5';
import { MdHomeFilled, MdSearch } from 'react-icons/md';
import { SidebarContainer, LinkWrapper, LogoWrapper } from 'src/common/styles/SidebarStyle';
import Playlist from 'src/features/Playlist/Playlist';

function Sidebar() {
  return (
    <SidebarContainer>
      <LinkWrapper>
        <LogoWrapper>
          <img
            src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png'
            alt='spotify logo'
          />
        </LogoWrapper>
        <ul>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <span>Your Library</span>
          </li>
        </ul>
      </LinkWrapper>
      <Playlist />
    </SidebarContainer>
  );
}

export default Sidebar;
