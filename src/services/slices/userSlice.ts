import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import {
  baseApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TUserResponse,
  updateUserApi
} from '../../utils/burger-api';

export type TUserState = {
  user: TUser | null;
  orders: TOrder[];
  error: SerializedError | null;
  isAuth: boolean;
};

export const initialState: TUserState = {
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
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    }
  },
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
        state.error = null;
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
export const { setIsAuth } = userSlice.actions;
export default userSlice;

// ------------------------------------------------------------------------------------------------------------------------

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<TAuthResponse, TLoginData>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
      // invalidatesTags: ['User']
    }),
    fetchUser: build.query<TUserResponse, void>({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: getCookie('accessToken')
        }
      })
      // providesTags: ['User']
    })
    //   logoutUser: build.mutation<TServerResponse<{}>, void>({
    //     query: () => ({
    //       url: '/auth/logout',
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json;charset=utf-8',
    //         Authorization: `Bearer ${getCookie('accessToken')}`
    //       },
    // }),
  }),
  overrideExisting: true
});

export const { useLoginUserMutation, useFetchUserQuery } = userApi;
