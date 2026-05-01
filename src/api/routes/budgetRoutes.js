const { Router } = require('express');
const budgetController = require('../controllers/budgetController');

const routes = Router();

routes.get('/', budgetController.index);
routes.get('/:id', budgetController.show);
routes.post('/', budgetController.store);
routes.put('/:id', budgetController.update);
routes.delete('/:id', budgetController.destroy);

module.exports = routes;
