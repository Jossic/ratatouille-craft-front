import { ListenerMiddlewareInstance } from '@reduxjs/toolkit';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import OrderingStep = OrderingDomainModel.OrderingStep;

export const registerOrderingStepListeners = (listener: ListenerMiddlewareInstance) => {
  listener.startListening({
    actionCreator: orderingSlice.actions.chooseGuest,
    effect: (_, api) => {
      api.dispatch(orderingSlice.actions.setStep(OrderingStep.TABLE));
    },
  });
};
