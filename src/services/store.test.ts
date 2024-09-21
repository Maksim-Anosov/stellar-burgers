import { rootReducer } from './store';
import feedSlice from './slices/feedSlice';
import ingredientsSlice from './slices/ingredientsSlice';
import orderSlice from './slices/orderSlice';
import userSlice from './slices/userSlice';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    expect(rootReducer(undefined, { type: '@@INIT' })).toEqual({
      ingredients: ingredientsSlice.reducer(undefined, { type: '@@INIT' }),
      feed: feedSlice.reducer(undefined, { type: '@@INIT' }),
      order: orderSlice.reducer(undefined, { type: '@@INIT' }),
      user: userSlice.reducer(undefined, { type: '@@INIT' })
    });
  });
});
