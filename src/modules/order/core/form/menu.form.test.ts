import { MenuForm } from '@ratatouille/modules/order/core/form/menu.form';
import { GuestFactory } from '@ratatouille/modules/order/core/model/guest.factory';
import { MenuFactory } from '@ratatouille/modules/order/core/model/menu.factory';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

const menuForm = new MenuForm();

const regularEntry = MenuFactory.create({ id: '1', name: 'Regular entry', type: OrderingDomainModel.DishType.ENTRY });
const adultEntry = MenuFactory.create({
  id: '2',
  name: 'Adult entry',
  type: OrderingDomainModel.DishType.ENTRY,
  requiredAge: 18,
});

const regularMain = MenuFactory.create({ id: '3', name: 'Regular', type: OrderingDomainModel.DishType.MAIN });
const adultMain = MenuFactory.create({
  id: '4',
  name: 'Adult',
  type: OrderingDomainModel.DishType.MAIN,
  requiredAge: 18,
});

const regularDessert = MenuFactory.create({ id: '5', name: 'Regular', type: OrderingDomainModel.DishType.DESSERT });
const adultDessert = MenuFactory.create({
  id: '6',
  name: 'Adult',
  type: OrderingDomainModel.DishType.DESSERT,
  requiredAge: 18,
});

const regularDrink = MenuFactory.create({ id: '7', name: 'Regular', type: OrderingDomainModel.DishType.DRINK });
const adultDrink = MenuFactory.create({
  id: '8',
  name: 'Adult',
  type: OrderingDomainModel.DishType.DRINK,
  requiredAge: 18,
});

const dishes: OrderingDomainModel.Dish[] = [regularEntry, adultEntry, regularMain, adultMain, regularDessert, adultDessert, regularDrink, adultDrink];

const adult = GuestFactory.create({ id: '1', firstName: 'Adult', age: 35 });
const children = GuestFactory.create({ id: '2', firstName: 'children', age: 5 });

describe('selecting dishes', function() {
  describe('selection entries', function() {
    it.each`
      dishes    | guest       | expected
      ${[]}     | ${adult}    | ${[]}
      ${dishes} | ${adult}    | ${[regularEntry, adultEntry]}
      ${dishes} | ${children} | ${[regularEntry]}
    `('should return $expected when dishes are $dishes and guest is $guest', ({ dishes, guest, expected }) => {
      const result = menuForm.getSelectableEntries(dishes, guest);
      expect(result).toEqual(expected);
    });
  });

  describe('selection mains', function() {
    it.each`
      dishes    | guest       | expected
      ${[]}     | ${adult}    | ${[]}
      ${dishes} | ${adult}    | ${[regularMain, adultMain]}
      ${dishes} | ${children} | ${[regularMain]}
    `('should return $expected when dishes are $dishes and guest is $guest', ({ dishes, guest, expected }) => {
      const result = menuForm.getSelectableMains(dishes, guest);
      expect(result).toEqual(expected);
    });
  });

  describe('selection dessert', function() {
    it.each`
      dishes    | guest       | expected
      ${[]}     | ${adult}    | ${[]}
      ${dishes} | ${adult}    | ${[regularDessert, adultDessert]}
      ${dishes} | ${children} | ${[regularDessert]}
    `('should return $expected when dishes are $dishes and guest is $guest', ({ dishes, guest, expected }) => {
      const result = menuForm.getSelectableDesserts(dishes, guest);
      expect(result).toEqual(expected);
    });
  });

  describe('selection mains', function() {
    it.each`
      dishes    | guest       | expected
      ${[]}     | ${adult}    | ${[]}
      ${dishes} | ${adult}    | ${[regularDrink, adultDrink]}
      ${dishes} | ${children} | ${[regularDrink]}
    `('should return $expected when dishes are $dishes and guest is $guest', ({ dishes, guest, expected }) => {
      const result = menuForm.getSelectableDrinks(dishes, guest);
      expect(result).toEqual(expected);
    });
  });

  describe('Assign entry', function() {
    const form: OrderingDomainModel.Form = {
      guests: [adult, children],
      organizerId: adult.id,
      tableId: null,
    };

    // Quel est l'intérêt de tester pour chacun étant donné qu'il n'y a pas de check sur le type de dish
    // On ne test pas qu'un enfant puisse ajouter un plat d'adulte?

    it.each`
      guestId     | dishId             | expected
      ${adult.id} | ${null}            | ${null}
      ${adult.id} | ${regularEntry.id} | ${regularEntry.id}
    `('should return $expected when guestId is $guestId and dishId is $dishId', ({ guestId, dishId, expected }) => {
      const result = menuForm.assignEntry(form, guestId, dishId);
      expect(result.guests[0].menu.entry).toEqual(expected);
    });

    it('should assign the adult entry as an entry of an unexisting user', function() {
      const result = menuForm.assignEntry(form, '3', adult.id);
      expect(result).toEqual(form);
    });
  });
});
