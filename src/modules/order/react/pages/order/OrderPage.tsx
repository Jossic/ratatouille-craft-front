'use client';

import React from 'react';
import { GuestsSection } from '@ratatouille/modules/order/react/sections/guest/GuestsSection';
import { useSelector } from 'react-redux';
import { AppState } from '@ratatouille/modules/store/store';
import { TableSection } from '@ratatouille/modules/order/react/sections/table/TableSection';
import { SummarySection } from '@ratatouille/modules/order/react/sections/summary/SummarySection';
import { ReservedSection } from '@ratatouille/modules/order/react/sections/reserved/ReservedSection';
import { MenuSection } from '@ratatouille/modules/order/react/sections/menu/MenuSection';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import OrderingStep = OrderingDomainModel.OrderingStep;

export const OrderPage: React.FC = () => {
  const step = useSelector((state: AppState) => state.ordering.step);
  return (
    <main>
      {step === OrderingStep.GUESTS && <GuestsSection />}
      {step === OrderingStep.TABLE && <TableSection />}
      {step === OrderingStep.MENU && <MenuSection />}
      {step === OrderingStep.SUMMARY && <SummarySection />}
      {step === OrderingStep.RESERVE && <ReservedSection />}
    </main>
  );
};
