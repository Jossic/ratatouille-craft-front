import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '@ratatouille/modules/store/store';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import OrderingStep = OrderingDomainModel.OrderingStep;
import { chooseTable } from '@ratatouille/modules/order/core/usecases/choose-table.usecase';
import { invariant } from '@ratatouille/modules/shared/invariant';

export const useTable = () => {
  function assignTable(tableId: string) {
    setAssignedTableId(tableId);
  }

  function onNext() {
    invariant(assignedTableId !== null, 'Table must be assigned before going to the next step');
    dispatch(chooseTable(assignedTableId!));
  }

  function onPrevious() {
    dispatch(orderingSlice.actions.setStep(OrderingStep.GUESTS));
  }

  function isSubmitable() {
    return assignedTableId !== null;
  }

  const dispatch = useAppDispatch();

  const [assignedTableId, setAssignedTableId] = useState<string | null>(null);

  const availableTables: OrderingDomainModel.Table[] = useSelector((state: AppState) => state.ordering.availableTables.data);

  return {
    assignedTableId,
    availableTables,
    assignTable,
    onNext,
    onPrevious,
    isSubmitable: isSubmitable(),
  };
};
