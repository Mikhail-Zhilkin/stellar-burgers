import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  data: TOrder[];
  orderModal: TOrder | null;
  orderRequset: boolean;
  isLoading: boolean;
  selectedOrder: TOrder | null;
};

const initialState: TOrderState = {
  data: [],
  orderModal: null,
  orderRequset: false,
  isLoading: false,
  selectedOrder: null
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  }
);

export const getOrders = createAsyncThunk('order/getAll', getOrdersApi);

export const getOrderByNumber = createAsyncThunk(
  'orders/getByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderModal: (state) => {
      state.orderModal = null;
    }
  },
  selectors: {
    orderModalSelector: (state) => state.orderModal,
    orderRequsetSelector: (state) => state.orderRequset,
    selectedOrderSelector: (state) => state.selectedOrder,
    dataSelector: (state) => state.data,
    isLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.orderRequset = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.orderModal = action.payload;
      state.orderRequset = false;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.orderRequset = true;
    });
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
      });
  }
});

export const { resetOrderModal } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
export const {
  orderModalSelector,
  orderRequsetSelector,
  selectedOrderSelector,
  dataSelector,
  isLoadingSelector
} = orderSlice.selectors;
