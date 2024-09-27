import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  baseApi,
  getFeedsApi,
  getOrderByNumberApi,
  TFeedsResponse,
  TOrderResponse
} from '../../utils/burger-api';
import { TIngredient, TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  ingredients: TIngredient[];
  feed: {
    total: number;
    totalToday: number;
  };
  isLoading: boolean;
  error: string | undefined;
  number: number;
  order: TOrder | null;
};

export const initialState: TFeedState = {
  orders: [],
  ingredients: [],
  feed: {
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: undefined,
  number: 0,
  order: null
};

export const fetchOrders = createAsyncThunk(
  'feed/fetchOrders',
  async () => await getFeedsApi()
);

export const fetchOrder = createAsyncThunk(
  'feed/fetchOrder',
  getOrderByNumberApi
);

const feedSlice = createSlice({
  name: 'feed',
  initialState: initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectFeed: (state) => state.feed,
    selectOrder: (state) => state.order
    // selectIsLoading: (state) => state.isLoading,
    // selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isLoading = false;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { selectOrders, selectFeed, selectOrder } = feedSlice.selectors;

export const feedReducer = feedSlice.reducer;
export default feedSlice;

// ---------------------------------------------------------------------------------------------------

export const feedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchOrders: builder.query<TFeedsResponse, void>({
      query: () => '/orders/all'
    }),
    fetchOrder: builder.query<TOrderResponse, number>({
      query: (number: number) => ({
        url: `/orders/${number}`,
        method: 'GET'
      })
    })
  }),
  overrideExisting: true
});

export const { useFetchOrdersQuery, useFetchOrderQuery } = feedApi;
