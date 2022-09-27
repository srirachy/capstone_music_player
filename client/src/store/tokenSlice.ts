import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TokenTypes } from '../types';
import { createTokenObj } from '../utils/Functions';
// import { persistor, RootState } from './index.js';

const initialState = {
  loading: false,
  error: false,
  tokenObj: {},
} as TokenTypes;

export const fetchToken = createAsyncThunk(
  'token/fetchToken',
  async () => {
    const res = await fetch('/auth/token');
    const data = await res.json();
    const newTokenObj = createTokenObj(data);
    return newTokenObj;
  },
);

export const fetchRefreshToken = createAsyncThunk(
  'token/fetchRefreshToken',
  async (refreshToken: string) => {
    const res = await fetch(`/auth/refresh_token/${refreshToken}`);
    const resData = await res.json();
    const newTokenObj = createTokenObj(resData);
    return newTokenObj;
  },
);

export const fetchLogout = createAsyncThunk(
  'token/logout',
  async () => {
    const res = await fetch('/auth/logout');
    const resData = await res.json();
    return resData;
  },
);

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchToken.fulfilled, (state, { payload }) => {
        state.error = false;
        state.loading = false;
        state.tokenObj = payload;
      })
      .addCase(fetchToken.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchRefreshToken.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchRefreshToken.fulfilled, (state, { payload }) => {
        state.error = false;
        state.loading = false;
        state.tokenObj = payload;
      })
      .addCase(fetchRefreshToken.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchLogout.fulfilled, (state, { payload }) => {
        state.error = false;
        state.loading = false;
        state.tokenObj = payload;
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

// export const exampleToken = (state: RootState) => state;
// export const { clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;
