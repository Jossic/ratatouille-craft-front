// Ajouter un guest
// Retirer un guest

import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { IIdProvider } from '@ratatouille/modules/core/id-provider';

class StubIdProvider implements IIdProvider {
  generate() {
    return '1';
  }
}

const stubIdProvider = new StubIdProvider();
const form = new GuestForm(stubIdProvider);

const emptyInitialState: OrderingDomainModel.Form = {
  guests: [],
  organizerId: null,
};
const stateWithOneGuest: OrderingDomainModel.Form = {
  guests: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      age: 0,
    },
  ],
  organizerId: '1',
};
const stateWithTwoGuests: OrderingDomainModel.Form = {
  guests: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      age: 0,
    },
    {
      id: '2',
      firstName: 'John',
      lastName: 'Doe',
      age: 0,
    },
  ],
  organizerId: '1',
};

describe('Guest form', () => {
  describe('Add a guest', () => {
    it('should add a guest', () => {
      const state = form.addGuest(emptyInitialState);
      expect(state.guests).toEqual([
        {
          id: '1',
          firstName: '',
          lastName: '',
          age: 0,
        },
      ]);
    });

    it('should add a guest when there is already one', () => {
      const state = form.addGuest(stateWithOneGuest);
      expect(state.guests).toEqual([
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          age: 0,
        },
        {
          id: '1',
          firstName: '',
          lastName: '',
          age: 0,
        },
      ]);
    });

    it('should add a guest when there is already two', () => {
      const state = form.addGuest(stateWithTwoGuests);
      expect(state.guests).toEqual([
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          age: 0,
        },
        {
          id: '2',
          firstName: 'John',
          lastName: 'Doe',
          age: 0,
        },
        {
          id: '1',
          firstName: '',
          lastName: '',
          age: 0,
        },
      ]);
    });
  });

  describe('Remove a guest', () => {
    it('when there is no user, the remove should do nothing', () => {
      const state = form.removeGuest(emptyInitialState, '1');
      expect(state.guests).toEqual([]);
    });

    it('when there is a user with ID 1, the user with ID 1 should be removed', function () {
      const state = form.removeGuest(stateWithOneGuest, '1');
      expect(state.guests).toEqual([]);
    });

    it('when there is two users, the user with ID 1 should be removed', function () {
      const state = form.removeGuest(stateWithTwoGuests, '1');
      expect(state.guests).toEqual([
        {
          id: '2',
          firstName: 'John',
          lastName: 'Doe',
          age: 0,
        },
      ]);
    });
  });

  describe('Add an organizer', () => {
    it('set the organizerId to null when the user does not exist', () => {
      const state = form.changeOrganizer(emptyInitialState, '1');
      expect(state.organizerId).toEqual(null);
    });

    it('when no one is an organizer, the first user should be the organizer', () => {
      const state = form.changeOrganizer(stateWithOneGuest, '1');
      expect(state.organizerId).toEqual('1');
    });
  });

  describe('isSubmitable', () => {
    it('when there is no organizer, it should not be submitable', function () {
      const isSubmitable = form.isSubmitable(emptyInitialState);
      expect(isSubmitable).toEqual(false);
    });

    it('when there is an organizer, it should be submitable', function () {
      const withOrganizerState: OrderingDomainModel.Form = {
        ...stateWithOneGuest,
        organizerId: '1',
      };
      const isSubmitable = form.isSubmitable(withOrganizerState);
      expect(isSubmitable).toEqual(true);
    });
  });
});
