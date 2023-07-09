import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { IIdProvider } from '@ratatouille/modules/core/id-provider';

export class GuestForm {
  constructor(private idProvider: IIdProvider) {}

  addGuest(state: OrderingDomainModel.Form) {
    return {
      ...state,
      guests: [
        ...state.guests,
        {
          id: this.idProvider.generate(),
          firstName: '',
          lastName: '',
          age: 0,
        },
      ],
    };
  }

  removeGuest(state: OrderingDomainModel.Form, id: string) {
    return {
      ...state,
      guests: state.guests.filter((guest) => guest.id !== id),
    };
  }
}
