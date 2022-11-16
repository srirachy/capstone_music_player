import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserTypes } from '../../common/models';

const initialState = {
  loading: false,
  error: false,
  userInfo: {},
} as UserTypes;

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const res = await fetch('/auth/me');
  const resData = await res.json();
  const { id, display_name: displayName } = resData;
  const userInfo = {
    userId: id,
    userName: displayName,
  };
  return userInfo;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.error = false;
        state.loading = false;
        state.userInfo = payload;
      })
      .addCase(fetchUser.rejected, state => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
