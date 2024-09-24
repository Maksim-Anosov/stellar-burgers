import { rootReducer } from './store';
import feedSlice from './slices/feedSlice';
import ingredientsSlice from './slices/ingredientsSlice';
import orderSlice from './slices/orderSlice';
import userSlice from './slices/userSlice';

describe('rootReducer', () => {
  it('stores all slices', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toHaveProperty(ingredientsSlice.name);
    expect(state).toHaveProperty(feedSlice.name);
    expect(state).toHaveProperty(orderSlice.name);
    expect(state).toHaveProperty(userSlice.name);
  });
});
