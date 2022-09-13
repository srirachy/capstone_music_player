import { createSlice } from '@reduxjs/toolkit';
// import type { RootState } from './index';

type UserProps = {
  userId: string;
  userName: string;
};

type UserTypes = {
  userInfo: UserProps;
};

const initialState = {
  userInfo: {},
} as UserTypes;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
  },
});

// export const userState = (state: RootState) => state;
export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
