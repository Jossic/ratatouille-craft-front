import { createTestStore } from '@ratatouille/modules/testing/tests-environment';
import { chooseTable } from '@ratatouille/modules/order/core/usecases/choose-table.usecase';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import OrderingStep = OrderingDomainModel.OrderingStep;

describe('choose table', function () {
  it('should choose the table', function () {
    const store = createTestStore();

    store.dispatch(chooseTable('1'));

    expect(store.getState().ordering.form.tableId).toEqual('1');
    expect(store.getState().ordering.step).toEqual(OrderingStep.MENU);
  });
});
