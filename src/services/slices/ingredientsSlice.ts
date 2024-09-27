import { baseApi, TIngredientsResponse } from '../../utils/burger-api';

export const ingredientsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredientsResponse, void>({
      query: () => '/ingredients'
    })
  }),
  overrideExisting: true
});

export const { useGetIngredientsQuery } = ingredientsApi;
