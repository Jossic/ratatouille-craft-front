import { createTestStore } from '@ratatouille/modules/testing/tests-environment';
import { TableFactory } from '@ratatouille/modules/order/core/gateway/table.factory';
import { fetchTables } from '@ratatouille/modules/order/core/usecases/fetch-tables.usecase';

describe('fetch table', () => {
  it('should fetch the tables', async () => {
    const table = TableFactory.create();

    const listOfTables = [table];
    const store = createTestStore({
      dependencies: {
        tableGateway: {
          getTables: () => Promise.resolve(listOfTables),
        },
      },
    });
    const promise = store.dispatch(fetchTables);

    expect(store.getState().ordering.availableTables.status).toEqual('loading');

    await promise;
    expect(store.getState().ordering.availableTables.data).toEqual(listOfTables);
    expect(store.getState().ordering.availableTables.status).toEqual('success');
  });

  it('should handle table fetching error', async () => {
    const store = createTestStore({
      dependencies: {
        tableGateway: {
          getTables: () => Promise.reject(new Error('Failed to fetch tables')),
        },
      },
    });
    const promise = store.dispatch(fetchTables);

    expect(store.getState().ordering.availableTables.status).toEqual('loading');

    await promise;
    expect(store.getState().ordering.availableTables.data).toEqual([]);
    expect(store.getState().ordering.availableTables.status).toEqual('error');
    expect(store.getState().ordering.availableTables.error).toEqual('Failed to fetch tables');
  });
});
