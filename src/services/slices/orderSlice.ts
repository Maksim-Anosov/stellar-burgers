import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export interface TOrderState {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
  loading: boolean;
  orderModalData: TOrder | null;
}

export const initialState: TOrderState = {
  ingredients: [],
  bun: null,
  loading: false,
  orderModalData: null
};

export const makeOrder = createAsyncThunk(
  'order/fetchOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

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
      state.loading = false;
      state.orderModalData = null;
    }
  },
  selectors: {
    selectConstructorItems: (state) => state,
    selectOrderRequest: (state) => state.loading,
    selectOrderModalData: (state) => state.orderModalData,
    selectBun: (state) => state.bun
  },
  extraReducers: (buider) => {
    buider
      .addCase(makeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(makeOrder.rejected, (state) => {
        state.loading = false;
      });
  }
});
export const { addIngredients, deleteIngredient, moveIngredient, resetOrder } =
  orderSlice.actions;
export const {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData,
  selectBun
} = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
export default orderSlice;
