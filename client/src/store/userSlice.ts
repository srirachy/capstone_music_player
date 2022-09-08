import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './index';

type ExampleTypes = {
  mewo: boolean;
};

const initialState = {
  mewo: true,
} as ExampleTypes;

export const userSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {},
});

export const userState = (state: RootState) => state;
// export const {} = userSlice.actions; PLACEHOLDER

export default userSlice.reducer;
