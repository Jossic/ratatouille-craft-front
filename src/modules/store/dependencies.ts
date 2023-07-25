import { IIdProvider } from '@ratatouille/modules/core/id-provider';
import { ITableGateway } from '@ratatouille/modules/order/core/gateway/table.gateway';

export type Dependencies = {
  idProvider: IIdProvider;
  tableGateway: ITableGateway;
};
