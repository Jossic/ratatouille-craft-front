import { ITableGateway } from '@ratatouille/modules/order/core/gateway/table.gateway';
import { TableFactory } from '@ratatouille/modules/order/core/gateway/table.factory';

export class InMemoryTableGateway implements ITableGateway {
  async getTables(): Promise<any> {
    return TableFactory.create({
      id: '1',
      capacity: 4,
    });
  }
}
