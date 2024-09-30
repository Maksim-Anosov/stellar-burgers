import { baseApi, TNewOrderResponse } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { getCookie } from '../../utils/cookie';
import { v4 as uuidv4 } from 'uuid';

export interface TOrderState {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
  orderModalData: TOrder | undefined;
}

export const initialState: TOrderState = {
  ingredients: [],
  bun: null,
  orderModalData: undefined
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (
        state: TOrderState,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        action.payload.type === 'bun'
          ? (state.bun = { ...action.payload })
          : state.ingredients.push(action.payload);
      },
      prepare: (ingredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteIngredient: (state, action) => {
      state.ingredients.splice(action.payload, 1);
    },
    moveIngredient: (state, action) => {
      const movedIngredient = state.ingredients[action.payload.index];

      if (action.payload.type === 'up') {
        state.ingredients[action.payload.index] =
          state.ingredients[action.payload.index - 1];
        state.ingredients[action.payload.index - 1] = movedIngredient;
      } else {
        state.ingredients[action.payload.index] =
          state.ingredients[action.payload.index + 1];
        state.ingredients[action.payload.index + 1] = movedIngredient;
      }
    },
    resetOrder: (state) => {
      state.ingredients = [];
      state.bun = null;
      state.orderModalData = undefined;
    },
    setOrderModalData: (state, action) => {
      state.orderModalData = action.payload;
    }
  },
  selectors: {
    selectConstructorItems: (state) => state,
    selectOrderModalData: (state) => state.orderModalData,
    selectBun: (state) => state.bun
  }
});
export const {
  addIngredients,
  deleteIngredient,
  moveIngredient,
  resetOrder,
  setOrderModalData
} = orderSlice.actions;
export const { selectConstructorItems, selectOrderModalData, selectBun } =
  orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
export default orderSlice;

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    makeOrder: build.mutation<TNewOrderResponse, string[]>({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: getCookie('accessToken')
        } as HeadersInit,
        body: JSON.stringify({
          ingredients: data
        })
      })
      // invalidatesTags: ['Order']
    })
  })
});

export const { useMakeOrderMutation } = orderApi;
