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

  validate(state: OrderingDomainModel.Form) {
    const errors = [];
    if (state.organizerId === null) {
      errors.push('Organizer is not selected');
    }

    state.guests.forEach((guest) => {
      if (guest.age <= 0) {
        errors.push('Age must be greater than 0');
      }

      if (guest.firstName.length === 0) {
        errors.push('First name is required');
      }

      if (guest.lastName.length === 0) {
        errors.push('Last name is required');
      }
    });

    return errors;
  }

  isSubmitable(state: OrderingDomainModel.Form) {
    return this.validate(state).length === 0;
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
