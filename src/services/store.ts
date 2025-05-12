import {
  combineReducers,
  combineSlices,
  configureStore
} from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  ingredientsReduser,
  ingredientsSlice
} from '../slices/ingredientsSlice';
import {
  constructorReducer,
  constructorSlice
} from '../slices/constructorSlice';
import { userReduser } from '../slices/userSlice';
import { feedReduser } from '../slices/feedSlice';
import { orderReducer } from '../slices/orderSlice';

const rootReducer = combineReducers({
  ingredientsSlice: ingredientsReduser,
  constructorSlice: constructorReducer,
  userSlice: userReduser,
  feedSlice: feedReduser,
  orderSlice: orderReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
