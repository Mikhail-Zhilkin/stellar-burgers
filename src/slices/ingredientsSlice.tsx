import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

type TIngredientsState = {
  items: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  items: [],
  buns: [],
  mains: [],
  sauces: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    bunsSelector: (state) => state.buns,
    mainsSelector: (state) => state.mains,
    saucesSelector: (state) => state.sauces,
    itemsSelector: (state) => state.items,
    isLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.buns = action.payload.filter((item) => item.type === 'bun');
        state.mains = action.payload.filter((item) => item.type === 'main');
        state.sauces = action.payload.filter((item) => item.type === 'sauce');
      });
  }
});

export const ingredientsReduser = ingredientsSlice.reducer;
export const {
  bunsSelector,
  mainsSelector,
  saucesSelector,
  itemsSelector,
  isLoadingSelector
} = ingredientsSlice.selectors;
