import { useRef, useState } from 'react';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { useDependencies } from '@ratatouille/modules/app/react/DependenciesProvider';
import Form = OrderingDomainModel.Form;
import { AppState, useAppDispatch } from '@ratatouille/modules/store/store';
import { chooseGuests } from '@ratatouille/modules/order/core/usecases/choose-guests.usecase';
import { useSelector } from 'react-redux';

export const useGuestsSection = () => {
  const initialForm = useSelector((state: AppState) => state.ordering.form);

  const dispatch = useAppDispatch();
  const [form, setForm] = useState<Form>(initialForm);
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

  function updateGuest<T extends keyof OrderingDomainModel.Guest>(id: string, key: T, value: OrderingDomainModel.Guest[T]) {
    const newState = guestForm.current.updateGuest(form, id, key, value);
    setForm(newState);
  }

  function changeOrganizer(id: string) {
    const newState = guestForm.current.changeOrganizer(form, id);
    setForm(newState);
  }

  function onNext() {
    dispatch(chooseGuests(form));
  }

  function isSubmitable() {
    return guestForm.current.isSubmitable(form);
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
