// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './features/tableSlice';
// import modalReducer from './features/modalSlice';

export const store = configureStore({
  reducer: {
    table: tableReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
