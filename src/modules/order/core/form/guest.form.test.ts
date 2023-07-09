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

const emptyInitialState: OrderingDomainModel.Guest[] = [];
const stateWithOneGuest: OrderingDomainModel.Guest[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    age: 0,
  },
];
const stateWithTwoGuests: OrderingDomainModel.Guest[] = [
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
];

describe('Guest form', () => {
  describe('Add a guest', () => {
    it('should add a guest', () => {
      const state = form.addGuest(emptyInitialState);
      expect(state).toEqual([
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
      expect(state).toEqual([
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
      expect(state).toEqual([
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
      expect(state).toEqual([]);
    });

    it('when there is a user with ID 1, the user with ID 1 should be removed', function () {
      const state = form.removeGuest(stateWithOneGuest, '1');
      expect(state).toEqual([]);
    });

    it('when there is two users, the user with ID 1 should be removed', function () {
      const state = form.removeGuest(stateWithTwoGuests, '1');
      expect(state).toEqual([
        {
          id: '2',
          firstName: 'John',
          lastName: 'Doe',
          age: 0,
        },
      ]);
    });
  });
});
