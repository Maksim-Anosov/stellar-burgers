import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TIngredient, TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  ingredients: TIngredient[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | undefined;
  number: number;
};

const inittalState: TFeedState = {
  orders: [],
  ingredients: [],
  total: 0,
  totalToday: 0,
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
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
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
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { selectOrders, selectTotal, selectTotalToday } =
  feedSlice.selectors;

export const feedReducer = feedSlice.reducer;
