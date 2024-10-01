import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { orderReducer } from './slices/orderSlice';
import { userReducer } from './slices/userSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { baseApi } from '../utils/burger-api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const rootReducer = combineReducers({
  order: orderReducer,
  user: userReducer,
  [baseApi.reducerPath]: baseApi.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
