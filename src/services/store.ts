import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { orderReducer } from './slices/orderSlice';
import { userReducer } from './slices/userSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { baseApi } from '../utils/burger-api';

export const rootReducer = combineReducers({
  order: orderReducer,
  user: userReducer
});

const store = configureStore({
  reducer: {
    order: orderReducer,
    user: userReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
