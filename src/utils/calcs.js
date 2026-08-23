import { useBudget } from '../context/Budget';

export const sumValueByStatus = (status = []) => {
  const { getBudgetsByStatus } = useBudget()

  const total = getBudgetsByStatus(status);
  return total
    .reduce((prevValue, currentValue) => {
      const value = Number(currentValue.totals.total);

      return prevValue + value;
    }, 0)
    .toFixed(2);
};

export const amountPaid = () => {

  const { getBudgetsByStatus } = useBudget()
  const total = getBudgetsByStatus(['approved', 'producing', 'finished']);
  console.log(total)
  return total
    .reduce((prevValue, currentValue) => {
      const value = Number(currentValue.totals.amountPaid) || 0;

      return prevValue + value;
    }, 0)
    .toFixed(2);
}