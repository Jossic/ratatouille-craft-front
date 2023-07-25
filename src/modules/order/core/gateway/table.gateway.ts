import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import Table = OrderingDomainModel.Table;

export interface ITableGateway {
  getTables(): Promise<Table[]>;
}
