import { TIngredient } from '@utils-types';
import {
  addIngredient,
  constructorReducer,
  initialState,
  moveIngredient,
  removeIngredient
} from '../../slices/constructorSlice';

describe('Тесты, проверяющие работу редьюсера конструктора бургера (constuctorSlice) при обработке экшенов добавления и удаления ингредиента', () => {
  describe('Тесты, проверяющий работу экшена добавления ингредиентов', () => {
    test('Тест, проверяющий работу экшена добавления булки', () => {
      const ingredient: TIngredient = {
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
      };

      const newConstructorState = constructorReducer(
        initialState,
        addIngredient(ingredient)
      );

      expect(newConstructorState.ingredients).toHaveLength(0);
      expect(newConstructorState.bun).toEqual({
        ...ingredient,
        id: expect.any(String)
      });
    });

    test('Тест, проверяющий работу экшена добавления начинки', () => {
      const ingredient = {
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      };

      const newConstructorState = constructorReducer(
        initialState,
        addIngredient(ingredient)
      );

      expect(newConstructorState.ingredients).toHaveLength(1);
      expect(newConstructorState.ingredients[0]).toEqual({
        ...ingredient,
        id: expect.any(String)
      });
    });
  });

  test('Тест, проверяющий работу экшена удаления ингредиента', () => {
    const state = {
      bun: null,
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093f',
          id: '123',
          name: 'Мясо бессмертных моллюсков Protostomia',
          type: 'main',
          proteins: 433,
          fat: 244,
          carbohydrates: 33,
          calories: 420,
          price: 1337,
          image: 'https://code.s3.yandex.net/react/code/meat-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
        }
      ]
    };

    const newConstructorState = constructorReducer(
      state,
      removeIngredient('123')
    );
    expect(newConstructorState.ingredients).toHaveLength(0);
  });

  test('Тест, проверяющий работу экшена изменения порядка ингредиентов в начинке', () => {
    const state = {
      bun: null,
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093f',
          id: '123',
          name: 'Мясо бессмертных моллюсков Protostomia',
          type: 'main',
          proteins: 433,
          fat: 244,
          carbohydrates: 33,
          calories: 420,
          price: 1337,
          image: 'https://code.s3.yandex.net/react/code/meat-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa0940',
          id: '1234',
          name: 'Говяжий метеорит (отбивная)',
          type: 'main',
          proteins: 800,
          fat: 800,
          carbohydrates: 300,
          calories: 2674,
          price: 3000,
          image: 'https://code.s3.yandex.net/react/code/meat-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
        }
      ]
    };

    const newConstructorState = constructorReducer(
      state,
      moveIngredient({ fromIndex: 1, toIndex: 0 })
    );
    expect(newConstructorState.ingredients).toEqual([
      {
        _id: '643d69a5c3f7b9001cfa0940',
        id: '1234',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa093f',
        id: '123',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      }
    ]);
  });
});
