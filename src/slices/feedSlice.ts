import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
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
  number: 0
};

export const fetchOrders = createAsyncThunk(
  'feed/fetchOrders',
  async () => await getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState: inittalState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectFeed: (state) => state.feed
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
  }
});

export const { selectOrders, selectFeed } = feedSlice.selectors;

export const feedReducer = feedSlice.reducer;
