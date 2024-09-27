import { rootReducer } from './store';
import orderSlice from './slices/orderSlice';
import userSlice from './slices/userSlice';

describe('rootReducer', () => {
  it('stores all slices', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toHaveProperty(orderSlice.name);
    expect(state).toHaveProperty(userSlice.name);
  });
});
