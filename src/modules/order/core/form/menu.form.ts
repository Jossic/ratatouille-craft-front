import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { produce } from 'immer';

export class MenuForm {
  //
  getSelectableEntries(dishes: OrderingDomainModel.Dish[], guest: OrderingDomainModel.Guest) {
    return dishes.filter((dish) => {
      return this.isDishType(dish, OrderingDomainModel.DishType.ENTRY) && !this.hasRequiredAge(dish, guest);
    });
  }

  getSelectableMains(dishes: OrderingDomainModel.Dish[], guest: OrderingDomainModel.Guest) {
    return dishes.filter((dish) => {
      return this.isDishType(dish, OrderingDomainModel.DishType.MAIN) && !this.hasRequiredAge(dish, guest);
    });
  }

  getSelectableDesserts(dishes: OrderingDomainModel.Dish[], guest: OrderingDomainModel.Guest) {
    return dishes.filter((dish) => {
      return this.isDishType(dish, OrderingDomainModel.DishType.DESSERT) && !this.hasRequiredAge(dish, guest);
    });
  }

  getSelectableDrinks(dishes: OrderingDomainModel.Dish[], guest: OrderingDomainModel.Guest) {
    return dishes.filter((dish) => {
      return this.isDishType(dish, OrderingDomainModel.DishType.DRINK) && !this.hasRequiredAge(dish, guest);
    });
  }

  assignEntry(form: OrderingDomainModel.Form, guestId: string, dishId: OrderingDomainModel.DishId) {
    return produce(form, (draft) => {
      const guest = draft.guests.find((guest) => guest.id === guestId);
      if (!guest) {
        return;
      }
      guest.menu.entry = dishId;
    });
  }

  private isDishType(dish: OrderingDomainModel.Dish, type: OrderingDomainModel.DishType) {
    return dish.type === type;
  }

  private hasRequiredAge(dish: OrderingDomainModel.Dish, guest: OrderingDomainModel.Guest) {
    return dish.requiredAge && guest.age < dish.requiredAge;
  }
}
