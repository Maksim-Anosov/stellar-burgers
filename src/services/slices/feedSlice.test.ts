import feedSlice, { fetchOrder, fetchOrders, initialState } from './feedSlice';
import { TOrder, TOrdersData } from '@utils-types';

describe('feedSlice', () => {
  it('fetchOrders.pending', () => {
    const action = { type: fetchOrders.pending.type };
    const state = feedSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(undefined);
  });

  it('fetchOrders.fulfilled', () => {
    const testOrders: TOrdersData = {
      orders: [
        {
          _id: '1',
          ingredients: ['1', '2', '3'],
          status: 'done',
          name: 'test',
          createdAt: 'test',
          updatedAt: 'test',
          number: 1
        }
      ],
      total: 1,
      totalToday: 1
    };

    const action = {
      type: fetchOrders.fulfilled.type,
      payload: testOrders
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.orders).toEqual(testOrders.orders);
    expect(state.feed.total).toEqual(testOrders.total);
    expect(state.feed.totalToday).toEqual(testOrders.totalToday);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(undefined);
  });

  it('fetchOrders.rejected', () => {
    const action = {
      type: fetchOrders.rejected.type,
      error: { message: 'error' }
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');
  });

  it('fetchOrder.pending', () => {
    const action = { type: fetchOrder.pending.type };
    const state = feedSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(undefined);
  });

  it('fetchOrder.fulfilled', () => {
    const testOrder: TOrder = {
      _id: '1',
      ingredients: ['1', '2', '3'],
      status: 'done',
      name: 'test',
      createdAt: 'test',
      updatedAt: 'test',
      number: 1
    };

    const action = {
      type: fetchOrder.fulfilled.type,
      payload: { orders: [testOrder] }
    };

    const state = feedSlice.reducer(initialState, action);
    expect(state.order).toEqual(testOrder);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(undefined);
  });

  it('fetchOrder.rejected', () => {
    const action = {
      type: fetchOrder.rejected.type,
      error: { message: 'error' }
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');
  });
});
