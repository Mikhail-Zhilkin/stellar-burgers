import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { configureStore } from '@reduxjs/toolkit';
import {
  createOrder,
  getOrderByNumber,
  getOrders,
  orderReducer
} from '../../slices/orderSlice';

jest.mock('@api', () => ({
  getOrdersApi: jest.fn(),
  orderBurgerApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

const order = {
  _id: '683c31e6c2f30c001cb2919f',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0942',
    '643d69a5c3f7b9001cfa093c'
  ],
  status: 'done',
  name: 'Краторный spicy био-марсианский бургер',
  createdAt: '2025-06-01T10:56:38.750Z',
  updatedAt: '2025-06-01T10:56:39.531Z',
  number: 79701
};

const newOrder = {
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0
    }
  ],
  _id: '683c3672c2f30c001cb291a8',
  owner: {
    name: 'Mikhail',
    email: 'mikhailzhilkin17@yandex.ru',
    createdAt: '2025-05-10T12:01:37.122Z',
    updatedAt: '2025-05-12T11:15:24.257Z'
  },
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2025-06-01T11:16:02.014Z',
  updatedAt: '2025-06-01T11:16:02.755Z',
  number: 79703,
  price: 2964
};

describe('Тесты асинхронных экшенов слайса orderSlice ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('Тест асинхронного экшена getOrders', () => {
    test('Тест состояния pending', () => {
      (getOrdersApi as jest.Mock).mockImplementation(
        () => new Promise(() => {})
      );

      const store = configureStore({
        reducer: { order: orderReducer }
      });

      store.dispatch(getOrders());

      const state = store.getState().order;
      expect(state.isLoading).toBe(true);
    });

    test('Тест состояния fulfilled', async () => {
      (getOrdersApi as jest.Mock).mockImplementation(() =>
        Promise.resolve(order)
      );

      const store = configureStore({
        reducer: { order: orderReducer }
      });

      await store.dispatch(getOrders());

      const state = store.getState().order;
      expect(state.isLoading).toBe(false);
      expect(state.data).toEqual(order);
    });
  });

  describe('Тест асинхронного экшена createOrder', () => {
    const ingredients = [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ];

    test('Тест состояния pending', () => {
      (orderBurgerApi as jest.Mock).mockImplementation(
        () => new Promise(() => {})
      );

      const store = configureStore({
        reducer: { order: orderReducer }
      });

      store.dispatch(createOrder(ingredients));

      const state = store.getState().order;
      expect(state.orderRequset).toBe(true);
    });

    test('Тест состояния fulfilled', async () => {
      (orderBurgerApi as jest.Mock).mockImplementation(() =>
        Promise.resolve({ order: newOrder })
      );

      const store = configureStore({
        reducer: { order: orderReducer }
      });

      await store.dispatch(createOrder(ingredients));

      const state = store.getState().order;
      expect(state.orderRequset).toBe(false);
      expect(state.orderModal).toEqual(newOrder);
      expect(state.data).toContainEqual(newOrder);
    });

    test('Тест состояния rejected', async () => {
      (orderBurgerApi as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error('Ошибка'))
      );

      const store = configureStore({
        reducer: { order: orderReducer }
      });

      await store.dispatch(createOrder(ingredients));

      const state = store.getState().order;
      expect(state.orderRequset).toBe(true);
    });

    describe('Тест асинхронного экшена getOrderByNumber', () => {
      test('Тест состояния pending', () => {
        (getOrderByNumberApi as jest.Mock).mockImplementation(
          () => new Promise(() => {})
        );

        const store = configureStore({
          reducer: { order: orderReducer }
        });

        store.dispatch(getOrderByNumber(newOrder.number));

        const state = store.getState().order;
        expect(state.isLoading).toBe(true);
      });

      test('Тест состояния fulfilled', async () => {
        (getOrderByNumberApi as jest.Mock).mockImplementation(() =>
          Promise.resolve({ orders: [newOrder] })
        );

        const store = configureStore({
          reducer: { order: orderReducer }
        });

        await store.dispatch(getOrderByNumber(newOrder.number));

        const state = store.getState().order;
        expect(state.isLoading).toBe(false);
        expect(state.selectedOrder).toEqual(newOrder);
      });

      test('Тест состояния rejected', async () => {
        (getOrderByNumberApi as jest.Mock).mockImplementation(() =>
          Promise.reject(new Error('Ошибка'))
        );

        const store = configureStore({
          reducer: { order: orderReducer }
        });

        await store.dispatch(getOrderByNumber(newOrder.number));

        const state = store.getState().order;
        expect(state.isLoading).toBe(false);
      });
    });
  });
});
