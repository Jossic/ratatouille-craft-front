import { AppDispatch, AppGetState } from '@ratatouille/modules/store/store';
import { Dependencies } from '@ratatouille/modules/store/dependencies';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { extractErrorMessage } from '@ratatouille/modules/shared/errors.util';

export const fetchTables = async (dispatch: AppDispatch, _: AppGetState, dependencies: Dependencies) => {
  dispatch(orderingSlice.actions.handleTablesLoading());
  try {
    const tables = await dependencies.tableGateway.getTables();
    dispatch(orderingSlice.actions.storeTable(tables));
  } catch (e) {
    dispatch(orderingSlice.actions.handleTablesError(extractErrorMessage(e)));
  }
};
