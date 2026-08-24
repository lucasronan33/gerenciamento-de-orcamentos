
export const budgetStatus = [
  {
    value: 'sketch',
    text: 'Rascunho',
  },
  {
    value: 'sent',
    text: 'Enviado',
  },
  {
    value: 'approved',
    text: 'Aprovado',
  },
  {
    value: 'producing',
    text: 'Produzindo',
  },
  {
    value: 'finished',
    text: 'Finalizado',
  },
  {
    value: 'rejected',
    text: 'Rejeitado',
  },
];

export const groupBudgetsByDate = (budgets) => {
  return budgets.reduce((acc, budget) => {
    const date = new Date(budget.basic.date);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (!acc[year]) acc[year] = {};

    if (!acc[year][month]) acc[year][month] = {
      budgets: [],
      total: 0
    };

    acc[year][month].budgets.push(budget);
    acc[year][month].total += Number(budget.totals.amountPaid || 0)
    return acc;
  }, {});
};
