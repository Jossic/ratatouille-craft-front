import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { IIdProvider } from '@ratatouille/modules/core/id-provider';
import { produce } from 'immer';

export class GuestForm {
  constructor(private idProvider: IIdProvider) {}

  addGuest(state: OrderingDomainModel.Form) {
    return produce(state, (draft) => {
      draft.guests.push({
        id: this.idProvider.generate(),
        firstName: '',
        lastName: '',
        age: 0,
      });
    });
  }

  removeGuest(state: OrderingDomainModel.Form, id: string) {
    return produce(state, (draft) => {
      draft.guests = draft.guests.filter((guest) => guest.id !== id);
      if (draft.organizerId === id) {
        draft.organizerId = null;
      }
    });
  }

  changeOrganizer(state: OrderingDomainModel.Form, id: string) {
    return produce(state, (draft) => {
      draft.organizerId = draft.guests.some((guest) => guest.id === id) ? id : null;
    });
  }

  isSubmitable(state: OrderingDomainModel.Form) {
    return state.guests.every((guest) => guest.age >= 0 && guest.firstName.length > 0 && guest.lastName.length > 0) && state.organizerId !== null;
  }

  updateGuest<T extends keyof OrderingDomainModel.Guest>(state: OrderingDomainModel.Form, id: string, key: T, value: OrderingDomainModel.Guest[T]) {
    return produce(state, (draft) => {
      const guest = draft.guests.find((guest) => guest.id === id);
      if (guest) {
        guest[key] = value;
      }
    });
  }
}
