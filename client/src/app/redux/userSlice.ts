import { createSlice } from '@reduxjs/toolkit';
import { UserTypes } from '../../common/models';

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

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
