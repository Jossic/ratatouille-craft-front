import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import Guest = OrderingDomainModel.Guest;

export class GuestFactory {
  static create(data?: Partial<Guest>) {
    return {
      id: '1',
      firstName: '',
      lastName: '',
      age: 25,
      ...data,
    };
  }
}
