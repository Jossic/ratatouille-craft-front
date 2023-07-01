import { useState } from 'react';

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

export const useGuestsSection = () => {
  const [guests, setGuests] = useState<Guest[]>([]); // [

  function addGuest() {
    setGuests((guests) => [
      ...guests,
      {
        id: Math.random().toString(),
        firstName: '',
        lastName: '',
        age: 0,
      },
    ]);
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