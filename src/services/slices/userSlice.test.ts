import { TUser, TOrder } from '@utils-types';
import userSlice, {
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  fetchUser,
  fetchOrders,
  initialState
} from './userSlice';

describe('userSlice', () => {
  // Login

  it('loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
  });

  it('loginUser.fulfilled', () => {
    const testUser: TUser = {
      name: 'testUser',
      email: 'testEmail'
    };
    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        user: testUser,
        accessToken: 'testToken',
        refreshToken: 'testToken'
      }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(testUser);
    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
  });

  it('loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuth).toBe(false);
    expect(state.error?.message).toBe('error');
  });

  // Logout

  it('logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe(null);
  });

  it('logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toBe(null);
    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
  });

  it('logoutUser.rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuth).toBe(false);
    expect(state.error?.message).toBe('error');
  });
});
