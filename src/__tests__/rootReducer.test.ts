import store, { rootReducer } from '../services/store';

test('Тест, проверяющий правильную настройку и работу rootReducer', () => {
  const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  expect(newState).toEqual(store.getState());
});
