import { getIngredientsApi } from '@api';
import {
  fetchIngredients,
  ingredientsReduser
} from '../../slices/ingredientsSlice';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('Тест асинхронного экшена fetchIngredients', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const ingredients = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
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
    {
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
    },
    {
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
    }
  ];

  test('Тест состояния pending', () => {
    (getIngredientsApi as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    const store = configureStore({
      reducer: { ingredients: ingredientsReduser }
    });

    store.dispatch(fetchIngredients());

    const state = store.getState().ingredients;

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Тест состояния fulfilled', async () => {
    (getIngredientsApi as jest.Mock).mockImplementation(() =>
      Promise.resolve(ingredients)
    );

    const store = configureStore({
      reducer: { ingredients: ingredientsReduser }
    });

    await store.dispatch(fetchIngredients());

    const state = store.getState().ingredients;
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(ingredients);
    expect(state.buns).toEqual(
      ingredients.filter((item) => item.type === 'bun')
    );
    expect(state.mains).toEqual(
      ingredients.filter((item) => item.type === 'main')
    );
    expect(state.sauces).toEqual(
      ingredients.filter((item) => item.type === 'sauce')
    );
  });

  test('Тест состояния rejected', async () => {
    const error = 'Ошибка';

    (getIngredientsApi as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error(error))
    );

    const store = configureStore({
      reducer: { ingredients: ingredientsReduser }
    });

    await store.dispatch(fetchIngredients());
    const state = store.getState().ingredients;

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.items).toEqual([]);
  });
});
