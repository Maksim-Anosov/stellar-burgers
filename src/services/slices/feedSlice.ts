import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
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

const inittalState: TFeedState = {
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
  initialState: inittalState,
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
        state.error = '';
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
        state.error = '';
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
