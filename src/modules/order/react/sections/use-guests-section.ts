import { useRef, useState } from 'react';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { useDependencies } from '@ratatouille/modules/app/react/DependenciesProvider';
import Guest = OrderingDomainModel.Guest;

export const useGuestsSection = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const { idProvider } = useDependencies();
  const guestForm = useRef(new GuestForm(idProvider));
  
  function addGuest() {
    const newState = guestForm.current.addGuest(guests);
    setGuests(newState);
  }

  function removeGuest(id: string) {
    setGuests((guests) => guests.filter((guest) => guest.id !== id));
  }

  function updateGuest(id: string, key: string, value: any) {
    // ...
  }

  function changeOrganizer() {
    // ...
  }

  function onNext() {
    // ...
  }

  function isSubmitable() {
    return false;
  }

  return {
    addGuest,
    removeGuest,
    updateGuest,
    changeOrganizer,
    onNext,
    isSubmitable: isSubmitable(),
    guests,
  };
};
