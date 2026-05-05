const { Budget, BudgetModel } = require('../models/Budget');

exports.index = async (req, res) => {
  const budgets = await BudgetModel.find().sort({ createdAt: -1 });
  return res.status(200).json(budgets);
};

exports.show = async (req, res) => {
  const budget = await BudgetModel.findById(req.params.id);

  if (!budget) {
    return res.status(404).json({ message: 'Budget not found' });
  }

  return res.status(200).json(budget);
};

exports.store = async (req, res) => {
  try {
    const budget = new Budget(req.body);
    await budget.register();

    if (budget.errors.length > 0) {
      return res.status(400).json({ errors: budget.errors });
    }

    return res.status(201).json(budget.budget);
  } catch (error) {
    return res.status(400).json({
      errors: [error.message],
    });
  }
};

exports.update = async (req, res) => {
  const budget = await BudgetModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!budget) {
    return res.status(404).json({ message: 'Budget not found' });
  }

  return res.status(200).json(budget);
};

exports.destroy = async (req, res) => {
  const budget = await BudgetModel.findByIdAndDelete(req.params.id);

  if (!budget) {
    return res.status(404).json({ message: 'Budget not found' });
  }

  return res.status(204).send();
};
