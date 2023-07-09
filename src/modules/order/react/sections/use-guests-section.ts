import { useRef, useState } from 'react';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { useDependencies } from '@ratatouille/modules/app/react/DependenciesProvider';
import Form = OrderingDomainModel.Form;

export const useGuestsSection = () => {
  const [form, setForm] = useState<Form>({
    guests: [],
    organizerId: null,
  });
  const { idProvider } = useDependencies();
  const guestForm = useRef(new GuestForm(idProvider));

  function addGuest() {
    const newState = guestForm.current.addGuest(form);
    setForm(newState);
  }

  function removeGuest(id: string) {
    const newState = guestForm.current.removeGuest(form, id);
    setForm(newState);
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
    form,
  };
};
