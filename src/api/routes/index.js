const { Router } = require('express');
const budgetRoutes = require('./budgetRoutes');

const routes = Router();

routes.use('/budgets', budgetRoutes);

module.exports = routes;
