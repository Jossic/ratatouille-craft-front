import { AppDispatch, AppGetState } from '@ratatouille/modules/store/store';
import { Dependencies } from '@ratatouille/modules/store/dependencies';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';

export const fetchTables = async (dispatch: AppDispatch, getState: AppGetState, dependencies: Dependencies) => {
  dispatch(orderingSlice.actions.handleTablesLoading());
  try {
    const tables = await dependencies.tableGateway.getTables();
    dispatch(orderingSlice.actions.storeTable(tables));
  } catch (e: any) {
    dispatch(orderingSlice.actions.handleTablesError(e.message));
  }
};
