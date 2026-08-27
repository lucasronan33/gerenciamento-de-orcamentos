
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

export const getBudgetsByStatus =
  (status, budgets) => {
    const total = budgets.filter((item) =>
      status.includes(item.basic.status.toLowerCase().trim()),
    );
    return total;
  }

export const groupBudgetsByDate = (budgets) => {
  const groupedBudgets = []
  budgets.forEach(budget => {
    const date = new Date(budget.basic.date)

    const year = date.getFullYear()
    const month = date.getMonth() + 1

    const selectedBudget = groupedBudgets.find(item => item.year === year && item.month === month)

    if (selectedBudget) {
      selectedBudget.budgets.push(budget)
      selectedBudget.total += Number(budget.totals.amountPaid || 0)
      return selectedBudget
    }
    groupedBudgets.push({
      year,
      month,
      budgets: [budget],
      total: Number(budget.totals.amountPaid || 0)
    })

  })
  return groupedBudgets
}

export const getLast12Months = budgetsArray => {
  const now = new Date()

  const months = []

  for (let i = 11; i >= 0; i--) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    )

    const year = date.getFullYear()
    const month = date.getMonth() + 1

    const data = budgetsArray.find(item => item.year === year && item.month === month)
    const total = Number(data?.total ?? 0).toFixed(2)

    months.push({
      year,
      month,
      total: Number(total),
      budgets: data?.budgets ?? []
    })

  }
  return months
}