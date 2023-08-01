import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export const useMenu = () => {
  function getSelectableEntries(guestId: string): OrderingDomainModel.Dish[] {
    return [];
  }

  function getSelectableMains(guestId: string): OrderingDomainModel.Dish[] {
    return [];
  }

  function getSelectableDesserts(guestId: string): OrderingDomainModel.Dish[] {
    return [];
  }

  function getSelectableDrinks(guestId: string): OrderingDomainModel.Dish[] {
    return [];
  }

  function assignEntry(guestId: string, dishId: string) {}

  function assignMain(guestId: string, dishId: string) {}

  function assignDessert(guestId: string, dishId: string) {}

  function assignDrink(guestId: string, dishId: string) {}

  function onNext() {}

  function onPrevious() {}

  function isSubmitable() {
    return false;
  }

  const guests: OrderingDomainModel.Guest[] = [];

  return {
    getSelectableEntries,
    getSelectableMains,
    getSelectableDesserts,
    getSelectableDrinks,
    assignEntry,
    assignMain,
    assignDessert,
    assignDrink,
    onNext,
    onPrevious,
    isSubmitable: isSubmitable(),
    guests,
  };
};
