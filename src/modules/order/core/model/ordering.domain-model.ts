export namespace OrderingDomainModel {
  export enum OrderingStep {
    GUESTS = 0,
    TABLE = 1,
    MENU = 2,
    SUMMARY = 3,
    RESERVE = 4,
  }

  export type Form = {
    guests: Guest[];
    organizerId: string | null;
    tableId: string | null;
  };

  export type Guest = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    menu: Menu;
  };

  export type Table = {
    id: string;
    name: string;
    capacity: number;
  };

  export type DishId = string;

  export type Menu = {
    entry: DishId | null;
    main: DishId | null;
    dessert: DishId | null;
    drink: DishId | null;
  };

  export enum DishType {
    ENTRY = 'entry',
    MAIN = 'main',
    DESSERT = 'dessert',
    DRINK = 'drink',
  }

  export type Dish = {
    id: DishId;
    name: string;
    type: DishType;
    requiredAge: number | null;
  };
}
