import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { IIdProvider } from '@ratatouille/modules/core/id-provider';

export class GuestForm {
  constructor(private idProvider: IIdProvider) {}

  addGuest(state: OrderingDomainModel.Guest[]) {
    return [
      ...state,
      {
        id: this.idProvider.generate(),
        firstName: '',
        lastName: '',
        age: 0,
      },
    ];
  }

  removeGuest(state: OrderingDomainModel.Guest[], id: string) {
    return state.filter((guest) => guest.id !== id);
  }
}
