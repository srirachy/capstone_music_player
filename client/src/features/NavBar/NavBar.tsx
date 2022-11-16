import { FaSearch } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import useUserInfo from 'src/utils/useUserInfo';
import { NavContainer, SearchWrapper, UserWrapper } from '../../common/styles/NavBarStyle';
import { NavBkgdType } from '../../common/models';

function NavBar({ navBackground }: NavBkgdType) {
  const {
    userInfo: { userId },
  } = useUserInfo();

  return (
    <NavContainer navBackground={navBackground}>
      <SearchWrapper>
        <FaSearch />
        <input type='text' placeholder='What do you want to listen to?' />
      </SearchWrapper>
      <UserWrapper>
        <a href='#replace_later'>
          <CgProfile />
          <span>{userId}</span>
        </a>
      </UserWrapper>
    </NavContainer>
  );
}

export default NavBar;
