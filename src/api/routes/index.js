const { Router } = require('express');
const budgetRoutes = require('./budgetRoutes');
const itemsRoutes = require('./itemsRoutes');

const routes = Router();

routes.use('/budgets', budgetRoutes);
routes.use('/items', itemsRoutes);

module.exports = routes;
