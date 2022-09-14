// import { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import useUserInfo from 'src/utils/useUserInfo';
import {
  NavContainer,
  SearchWrapper,
  UserWrapper,
} from '../../styles/NavBarStyle';

function NavBar() {
  const userInfo = useUserInfo();

  return (
    <NavContainer>
      <SearchWrapper>
        <FaSearch />
        <input
          type="text"
          placeholder="What do you want to listen to?"
        />
      </SearchWrapper>
      <UserWrapper>
        <a href="#replace_later">
          <CgProfile />
          <span>{userInfo.userInfo.userId}</span>
        </a>
      </UserWrapper>
    </NavContainer>
  );
}

export default NavBar;
