import { ITableGateway } from '@ratatouille/modules/order/core/gateway/table.gateway';
import { TableFactory } from '@ratatouille/modules/order/core/gateway/table.factory';

export class InMemoryTableGateway implements ITableGateway {
  async getTables(): Promise<any> {
    return [
      TableFactory.create({
        id: '1',
        name: 'Pres de la fenetre',
        capacity: 4,
      }),
      TableFactory.create({
        id: '2',
        name: 'Pres de la porte',
        capacity: 4,
      }),
      TableFactory.create({
        id: '3',
        name: 'Pres de la cuisine',
        capacity: 4,
      }),
      TableFactory.create({
        id: '4',
        name: 'Pres de la salle',
        capacity: 4,
      }),
      TableFactory.create({
        id: '5',
        name: 'Pres de la fenetre',
        capacity: 4,
      }),
    ];
  }
}
