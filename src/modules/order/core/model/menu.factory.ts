import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export class MenuFactory {
  static create(data?: Partial<OrderingDomainModel.Dish>): OrderingDomainModel.Dish {
    return {
      id: '1',
      name: 'Dish',
      type: OrderingDomainModel.DishType.MAIN,
      requiredAge: null,
      ...data,
    };
  }
}
