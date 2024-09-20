import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';

export type TUserState = {
  user: TUser | null;
  orders: TOrder[];
  error: SerializedError | null;
  isAuth: boolean;
};

const initialState: TUserState = {
  user: null,
  orders: [],
  error: null,
  isAuth: false
};

export const loginUser = createAsyncThunk('user/loginUser', loginUserApi);
export const logoutUser = createAsyncThunk('user/logoutUser', logoutApi);
export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);
export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);
export const fetchUser = createAsyncThunk('user/fetchUser', getUserApi);
export const fetchOrders = createAsyncThunk('user/fetchOrders', getOrdersApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuth: (state) => state.isAuth,
    selectOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isAuth = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
        state.error = null;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isAuth = false;
        state.error = action.error;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuth = true;
        state.error = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
        state.error = null;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.isAuth = false;
        state.error = action.error;
      })
      // Update
      .addCase(updateUser.pending, (state) => {
        state.isAuth = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error;
      })
      // FetchUser
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.error;
      })
      // FetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.isAuth = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

export const userReducer = userSlice.reducer;
export const { selectUser, selectIsAuth, selectOrders } = userSlice.selectors;
