import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import Table = OrderingDomainModel.Table;

export class TableFactory {
  static create(data?: Partial<Table>): Table {
    return {
      id: '1',
      name: 'Table 1',
      capacity: 10,
      ...data,
    };
  }
}
