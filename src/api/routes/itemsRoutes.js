const { Router } = require('express');
const itemsController = require('../controllers/itemsController');

const routes = Router();

routes.get('/', itemsController.index);
routes.get('/:id', itemsController.show);
routes.post('/', itemsController.store);
routes.put('/:id', itemsController.update);
routes.delete('/:id', itemsController.destroy);

module.exports = routes;
