import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import OrderingStep = OrderingDomainModel.OrderingStep;

export type OrderingState = {
  step: OrderingStep;
  form: OrderingDomainModel.Form;
  availableTables: {
    data: OrderingDomainModel.Table[];
    status: 'idle' | 'loading' | 'success' | 'error';
    error: string | null;
  };
};

export const initialState: OrderingState = {
  step: OrderingStep.GUESTS,
  form: {
    guests: [],
    organizerId: null,
  },
  availableTables: {
    status: 'idle',
    error: null,
    data: [],
  },
};

export const orderingSlice = createSlice({
  name: 'ordering',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<OrderingStep>) => {
      state.step = action.payload;
    },
    chooseGuest: (state, action: PayloadAction<OrderingDomainModel.Form>) => {
      state.form = action.payload;
    },
    storeTable: (state, action: PayloadAction<OrderingDomainModel.Table[]>) => {
      state.availableTables.data = action.payload;
      state.availableTables.status = 'success';
    },
    handleTablesLoading: (state) => {
      state.availableTables.status = 'loading';
    },
    handleTablesError: (state, action: PayloadAction<string>) => {
      state.availableTables.status = 'error';
      state.availableTables.error = action.payload;
    },
  },
});

export const orderingReducer = orderingSlice.reducer;
export const orderingActions = orderingSlice.actions;
