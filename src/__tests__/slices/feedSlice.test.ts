import { configureStore } from '@reduxjs/toolkit';
import { feedReduser, getFeeds } from '../../slices/feedSlice';
import { getFeedsApi } from '@api';

jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

describe('Тест асинхронного экшена getFeeds', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Тест загрузки ленты заказов', async () => {
    const expectedResult = {
      orders: ['1', '2', '3'],
      total: 3,
      totalToday: 10
    };

    (getFeedsApi as jest.Mock).mockImplementation(() =>
      Promise.resolve(expectedResult)
    );

    const store = configureStore({
      reducer: { feed: feedReduser }
    });

    await store.dispatch(getFeeds());

    const state = store.getState().feed;
    expect(state).toEqual(expectedResult);
  });
});
