import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
// import musicPlayerReducer from './musicPlayerSlice';
// import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    // musicPlayer: musicPlayerReducer,
    // user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
