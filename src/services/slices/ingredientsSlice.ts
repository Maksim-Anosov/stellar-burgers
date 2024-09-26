import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  baseApi,
  getIngredientsApi,
  TIngredientsResponse
} from '../../utils/burger-api';

export type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | undefined;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: undefined
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => await getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state,
    selectIngredientsLoader: (state) => state.loading,
    selectBuns: (state) =>
      state.ingredients.filter((item) => item.type === 'bun'),
    selectMains: (state) =>
      state.ingredients.filter((item) => item.type === 'main'),
    selectSauces: (state) =>
      state.ingredients.filter((item) => item.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export default ingredientsSlice;
export const {
  selectIngredients,
  selectIngredientsLoader,
  selectBuns,
  selectMains,
  selectSauces
} = ingredientsSlice.selectors;

export const ingredientsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredientsResponse, void>({
      query: () => '/ingredients'
    })
  }),
  overrideExisting: true
});

export const { useGetIngredientsQuery } = ingredientsApi;
