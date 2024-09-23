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

  // Register

  it('registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
  });

  it('registerUser.fulfilled', () => {
    const testUser: TUser = {
      name: 'testUser',
      email: 'testEmail'
    };
    const action = {
      type: registerUser.fulfilled.type,
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

  it('registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuth).toBe(false);
    expect(state.error?.message).toBe('error');
  });

  // Update

  it('updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe(null);
    expect(state.isAuth).toBe(true);
  });

  it('updateUser.fulfilled', () => {
    const testUser: TUser = {
      name: 'testUser',
      email: 'testEmail'
    };
    const action = {
      type: updateUser.fulfilled.type,
      payload: {
        user: testUser
      }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(testUser);
    expect(state.error).toBe(null);
  });

  it('updateUser.rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.error?.message).toBe('error');
  });

  // Fetch user

  it('fetchUser.pending', () => {
    const action = { type: fetchUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe(null);
  });

  it('fetchUser.fulfilled', () => {
    const testUser: TUser = {
      name: 'testUser',
      email: 'testEmail'
    };
    const action = {
      type: fetchUser.fulfilled.type,
      payload: {
        user: testUser
      }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(testUser);
    expect(state.error).toBe(null);
    expect(state.isAuth).toBe(true);
  });

  it('fetchUser.rejected', () => {
    const action = {
      type: fetchUser.rejected.type,
      error: { message: 'error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.error?.message).toBe('error');
  });

  // Fetch orders

  it('fetchOrders.pending', () => {
    const action = { type: fetchOrders.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe(null);
    expect(state.isAuth).toBe(true);
  });

  it('fetchOrders.fulfilled', () => {
    const testOrders: TOrder[] = [
      {
        _id: '1',
        ingredients: ['1', '2', '3'],
        status: 'done',
        name: 'test',
        createdAt: 'test',
        updatedAt: 'test',
        number: 1
      }
    ];

    const action = {
      type: fetchOrders.fulfilled.type,
      payload: testOrders
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.orders).toEqual(testOrders);
    expect(state.error).toBe(null);
  });

  it('fetchOrders.rejected', () => {
    const action = {
      type: fetchOrders.rejected.type,
      error: { message: 'error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.error?.message).toBe('error');
  });
});
