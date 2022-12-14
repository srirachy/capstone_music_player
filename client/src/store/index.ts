import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import tokenReducer from './tokenSlice';
import musicPlayerReducer from './musicPlayerSlice';
import userReducer from './userSlice';
import themeReducer from './themeSlice';
import visualizerReducer from './visualizerSlice';

const persistConfig = {
  key: 'token',
  storage,
  blacklist: ['loading', 'error', 'refreshData', 'musicOrLogin'],
};

const persistedReducer = persistReducer(persistConfig, tokenReducer);

export const store = configureStore({
  reducer: {
    token: persistedReducer,
    musicPlayer: musicPlayerReducer,
    user: userReducer,
    theme: themeReducer,
    visualizer: visualizerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
