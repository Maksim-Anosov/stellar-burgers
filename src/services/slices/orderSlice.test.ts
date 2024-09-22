import { TNewOrderResponse } from '@api';
import orderSlice, {
  addIngredients,
  deleteIngredient,
  moveIngredient,
  resetOrder,
  initialState,
  TOrderState,
  makeOrder
} from './orderSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';
// import { TNewOrderResponse } from '../../utils/burger-api';

describe('orderSlice', () => {
  const testIngredientMain: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const testConstructorIngredientSauce: TConstructorIngredient = {
    id: '643d69a5c3f7b9001cfa0942',
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  const testConstructorIngredient: TConstructorIngredient = {
    ...testIngredientMain,
    id: ''
  };

  it('addIngredients', () => {
    const newState = orderSlice.reducer(
      initialState,
      addIngredients(testIngredientMain)
    );

    testConstructorIngredient.id = newState.ingredients[0].id;

    expect(newState.ingredients).toEqual([testConstructorIngredient]);
  });

  it('deleteIngredient', () => {
    const initialStateTest: TOrderState = {
      ...initialState,
      ingredients: [testConstructorIngredient]
    };

    const action = deleteIngredient(0);
    const state = orderSlice.reducer(initialStateTest, action);
    expect(state.ingredients).toEqual([]);
  });

  it('moveIngredient', () => {
    const initialStateTest: TOrderState = {
      ...initialState,
      ingredients: [testConstructorIngredient, testConstructorIngredientSauce]
    };

    const action = moveIngredient({ index: 1, type: 'up' });
    const state = orderSlice.reducer(initialStateTest, action);
    expect(state.ingredients).toEqual([
      testConstructorIngredientSauce,
      testConstructorIngredient
    ]);

    const action2 = moveIngredient({ index: 0, type: 'down' });
    const state2 = orderSlice.reducer(state, action2);
    expect(state2.ingredients).toEqual([
      testConstructorIngredient,
      testConstructorIngredientSauce
    ]);
  });

  it('resetOrder', () => {
    const initialStateTest: TOrderState = {
      ingredients: [testConstructorIngredient, testConstructorIngredientSauce],
      bun: {
        _id: '643d69a5c3f7b9001cfa093c',
        id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      loading: false,
      error: undefined,
      orderModalData: {
        _id: '643d69a5c3f7b9001cfa093c',
        status: 'done',
        name: 'testOrder',
        createdAt: '22.09.2024',
        updatedAt: '22.09.2024',
        number: 1234567890,
        ingredients: ['id1', 'id2']
      }
    };

    const action = resetOrder();
    const state = orderSlice.reducer(initialStateTest, action);
    expect(state).toEqual(initialState);
  });

  it('makeOrder.pending', () => {
    const action = {
      type: makeOrder.pending.type,
      payload: ['test1', 'test2']
    };

    const state = orderSlice.reducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('makeOrder.fulfilled', () => {
    const testOrder = {
      _id: '643d69a5c3f7b9001cfa093c',
      status: 'done',
      name: 'testOrder',
      createdAt: '22.09.2024',
      updatedAt: '22.09.2024',
      number: 1234567890,
      ingredients: ['id1', 'id2']
    };

    const testResponse: TNewOrderResponse = {
      success: true,
      name: 'testOrder',
      order: testOrder
    };

    const expectedState: TOrderState = {
      ...initialState,
      loading: false,
      orderModalData: testOrder
    };

    const action = {
      type: makeOrder.fulfilled.type,
      payload: testResponse
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('makeOrder.rejected', () => {
    const action = {
      type: makeOrder.rejected.type,
      error: { message: 'error' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('error');
  });
});
