import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './index';

type ExampleTypes = {
  mewo: boolean;
};

const initialState = {
  mewo: true,
} as ExampleTypes;

export const musicPlayerSlice = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {},
});

export const musicPlayerState = (state: RootState) => state;
// export const {} = musicPlayerSlice.actions; PLACEHOLDER

export default musicPlayerSlice.reducer;
