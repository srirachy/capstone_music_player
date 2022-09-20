import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserTypes } from '../types';

const initialState = {
  loading: false,
  error: false,
  userInfo: {},
  userData: {},
} as UserTypes;

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const res = await fetch('/auth/me');
    const resData = res.json();
    return resData;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.error = false;
        state.loading = false;
        state.userData = payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
