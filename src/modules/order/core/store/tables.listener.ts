import { ListenerMiddlewareInstance } from '@reduxjs/toolkit';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import OrderingStep = OrderingDomainModel.OrderingStep;
import { fetchTables } from '@ratatouille/modules/order/core/usecases/fetch-tables.usecase';

export const registerTablesListeners = (listener: ListenerMiddlewareInstance) => {
  listener.startListening({
    actionCreator: orderingSlice.actions.setStep,
    effect: (action, api) => {
      switch (action.payload) {
        case OrderingStep.TABLE:
          api.dispatch(fetchTables as any);
      }
    },
  });
};
