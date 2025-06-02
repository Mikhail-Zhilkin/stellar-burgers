import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { configureStore } from '@reduxjs/toolkit';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userReduser
} from '../../slices/userSlice';
import { access } from 'fs';

jest.mock('@api', () => ({
  getUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutApi: jest.fn()
}));

jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

const userData = {
  user: {
    email: 'test@yandex.ru',
    name: 'name'
  },
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
};

describe('Тесты асинхронных экшенов слайса userSlice ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
  describe('Тест асинхронного экшена loginUser', () => {
    test('Тест состояния pending', () => {
      (loginUserApi as jest.Mock).mockImplementation(
        () => new Promise(() => {})
      );

      const store = configureStore({
        reducer: { user: userReduser }
      });

      store.dispatch(
        loginUser({ email: 'test@yandex.ru', password: '123456' })
      );

      const state = store.getState().user;
      expect(state.loginUserRequest).toBe(true);
    });

    test('Тест состояния fulfilled', async () => {
      (loginUserApi as jest.Mock).mockImplementation(() =>
        Promise.resolve(userData)
      );

      const store = configureStore({
        reducer: { user: userReduser }
      });

      await store.dispatch(
        loginUser({ email: 'test@yandex.ru', password: '123456' })
      );

      const state = store.getState().user;
      expect(state.data).toEqual(userData.user);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loginUserRequest).toBe(false);
    });

    test('Тест состояния rejected', async () => {
      (loginUserApi as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error('Ошибка'))
      );

      const store = configureStore({
        reducer: { user: userReduser }
      });

      await store.dispatch(
        loginUser({ email: 'test@yandex.ru', password: '123456' })
      );

      const state = store.getState().user;
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(false);
    });
  });

  describe('Тест асинхронного экшена registerUser', () => {
    test('Тест состояния pending', () => {
      (registerUserApi as jest.Mock).mockImplementation(
        () => new Promise(() => {})
      );

      const store = configureStore({
        reducer: { user: userReduser }
      });

      store.dispatch(
        registerUser({
          email: 'test@yandex.ru',
          password: '123456',
          name: 'name'
        })
      );

      const state = store.getState().user;
      expect(state.loginUserRequest).toBe(true);
    });

    test('Тест состояния fulfilled', async () => {
      (registerUserApi as jest.Mock).mockImplementation(() =>
        Promise.resolve(userData)
      );

      const store = configureStore({
        reducer: { user: userReduser }
      });

      await store.dispatch(
        registerUser({
          email: 'test@yandex.ru',
          password: '123456',
          name: 'name'
        })
      );

      const state = store.getState().user;
      expect(state.data).toEqual(userData.user);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loginUserRequest).toBe(false);
    });

    test('Тест состояния rejected', async () => {
      (registerUserApi as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error('Ошибка'))
      );

      const store = configureStore({
        reducer: { user: userReduser }
      });

      await store.dispatch(
        registerUser({
          email: 'test@yandex.ru',
          password: '123456',
          name: 'name'
        })
      );

      const state = store.getState().user;
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(false);
    });

    describe('Тест асинхронного экшена getUser', () => {
      test('Тест состояния pending', () => {
        (getUserApi as jest.Mock).mockImplementation(
          () => new Promise(() => {})
        );

        const store = configureStore({
          reducer: { user: userReduser }
        });

        store.dispatch(getUser());

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(true);
      });

      test('Тест состояния fulfilled', async () => {
        (getUserApi as jest.Mock).mockImplementation(() =>
          Promise.resolve(userData)
        );

        const store = configureStore({
          reducer: { user: userReduser }
        });

        await store.dispatch(getUser());

        const state = store.getState().user;
        expect(state.data).toEqual(userData.user);
        expect(state.isAuthChecked).toBe(true);
        expect(state.isAuthenticated).toBe(true);
        expect(state.loginUserRequest).toBe(false);
      });

      test('Тест состояния rejected', async () => {
        (getUserApi as jest.Mock).mockImplementation(() =>
          Promise.reject(new Error('Ошибка'))
        );

        const store = configureStore({
          reducer: { user: userReduser }
        });

        await store.dispatch(getUser());

        const state = store.getState().user;
        expect(state.isAuthChecked).toBe(true);
        expect(state.isAuthenticated).toBe(false);
        expect(state.loginUserRequest).toBe(false);
      });
    });

    describe('Тест асинхронного экшена updateUser', () => {
      test('Тест состояния pending', () => {
        (updateUserApi as jest.Mock).mockImplementation(
          () => new Promise(() => {})
        );

        const store = configureStore({
          reducer: { user: userReduser }
        });

        store.dispatch(
          updateUser({
            email: 'testNew@yandex.ru',
            password: '1234',
            name: 'nameNew'
          })
        );

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(true);
      });

      test('Тест состояния fulfilled', async () => {
        const updUser = {
          ...userData.user,
          email: 'testNew@yandex.ru',
          password: '1234',
          name: 'nameNew'
        };
        (updateUserApi as jest.Mock).mockImplementation(() =>
          Promise.resolve({user : updUser})
        );

        const store = configureStore({
          reducer: { user: userReduser }
        });

        await store.dispatch(
          updateUser({
            email: 'testNew@yandex.ru',
            password: '1234',
            name: 'nameNew'
          })
        );

        const state = store.getState().user;
        expect(state.data).toEqual(updUser);
        expect(state.loginUserRequest).toBe(false);
      });

      test('Тест состояния rejected', async () => {
        (updateUserApi as jest.Mock).mockImplementation(() =>
          Promise.reject(new Error('Ошибка'))
        );

        const store = configureStore({
          reducer: { user: userReduser }
        });

        await store.dispatch(
          updateUser({
            email: 'testNew@yandex.ru',
            password: '1234',
            name: 'nameNew'
          })
        );

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
      });
    });

    describe('Тест асинхронного экшена logoutUser', () => {
      test('Тест состояния pending', () => {
        (logoutApi as jest.Mock).mockImplementation(
          () => new Promise(() => {})
        );

        const store = configureStore({
          reducer: { user: userReduser }
        });

        store.dispatch(logoutUser());

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(true);
      });

      test('Тест состояния fulfilled', async () => {
        (logoutApi as jest.Mock).mockImplementation(() =>
          Promise.resolve(userData.user)
        );

        const store = configureStore({
          reducer: { user: userReduser }
        });

        await store.dispatch(logoutUser());

        const state = store.getState().user;
        expect(state.data).toBeNull();
        expect(state.isAuthChecked).toBe(true);
        expect(state.isAuthenticated).toBe(false);
      });

      test('Тест состояния rejected', async () => {
        (logoutApi as jest.Mock).mockImplementation(() =>
          Promise.reject(new Error('Ошибка'))
        );

        const store = configureStore({
          reducer: { user: userReduser }
        });

        await store.dispatch(logoutUser());

        const state = store.getState().user;
        expect(state.data).toBeNull();
        expect(state.isAuthChecked).toBe(true);
        expect(state.isAuthenticated).toBe(false);
      });
    });
  });
});
