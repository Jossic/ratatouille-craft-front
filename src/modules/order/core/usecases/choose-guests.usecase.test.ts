import { createTestStore } from '@ratatouille/modules/testing/tests-environment';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { GuestFactory } from '@ratatouille/modules/order/core/model/guest.factory';
import { chooseGuests } from '@ratatouille/modules/order/core/usecases/choose-guests.usecase';
import OrderingStep = OrderingDomainModel.OrderingStep;

describe('choose guest', function () {
  it('should choose the guest', function () {
    const store = createTestStore();
    const form: OrderingDomainModel.Form = {
      guests: [
        GuestFactory.create({
          id: '1',
        }),
      ],
      organizerId: '1',
    };

    store.dispatch(chooseGuests(form));

    expect(store.getState().ordering.form).toEqual(form);
    expect(store.getState().ordering.step).toEqual(OrderingStep.TABLE);
  });
});
