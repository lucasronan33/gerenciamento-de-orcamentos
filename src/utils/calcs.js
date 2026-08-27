import { getBudgetsByStatus } from './budget';

export const sumValueByStatus = (status = [], budgets = []) => {

  const total = getBudgetsByStatus(status, budgets);
  return total
    .reduce((prevValue, currentValue) => {
      const value = Number(currentValue.totals.total);

      return prevValue + value;
    }, 0)
    .toFixed(2);
};

export const amountPaid = (budgets = []) => {

  const total = getBudgetsByStatus(['approved', 'producing', 'finished'], budgets);
  return total
    .reduce((prevValue, currentValue) => {
      const value = Number(currentValue.totals.amountPaid) || 0;

      return prevValue + value;
    }, 0)
    .toFixed(2);
}