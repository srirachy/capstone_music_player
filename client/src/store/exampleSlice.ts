import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './index';

type ExampleTypes = {
  mewo: boolean;
};

const initialState = {
  mewo: true,
} as ExampleTypes;

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {},
});

export const exSlice = (state: RootState) => state;
// export const {} = exampleSlice.actions; PLACEHOLDER

export default exampleSlice.reducer;
