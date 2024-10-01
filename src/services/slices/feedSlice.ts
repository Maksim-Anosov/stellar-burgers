import {
  baseApi,
  TFeedsResponse,
  TOrderResponse
} from '../../utils/burger-api';

export const feedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchOrders: builder.query<TFeedsResponse, void>({
      query: () => '/orders/all',
      providesTags: ['Orders']
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
