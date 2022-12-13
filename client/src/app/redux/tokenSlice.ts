import { createSlice } from '@reduxjs/toolkit';
import { TokenTypes } from '../../common/models';

const initialState = {
  musicOrLogin: false,
  tokenObj: {},
} as TokenTypes;

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokenState(state, { payload }) {
      state.musicOrLogin = payload.tokenExist;
      state.tokenObj = payload.newTokenObj;
    },
    setRefreshTokenState(state, { payload }) {
      state.musicOrLogin = payload.tokenExist;
      state.tokenObj = payload.newTokenObj;
    },
    setLogoutState(state, { payload }) {
      state.musicOrLogin = false;
      state.tokenObj = payload;
    },
  },
});

export const { setTokenState, setRefreshTokenState, setLogoutState } = tokenSlice.actions;
export default tokenSlice.reducer;
