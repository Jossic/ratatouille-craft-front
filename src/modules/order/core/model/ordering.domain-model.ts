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
  };

  export type Guest = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
  };

  export type Table = {
    id: string;
    name: string;
    capacity: number;
  };
}
