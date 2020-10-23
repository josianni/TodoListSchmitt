const express = require('express');
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const ItemController = require('./controllers/ItemController');
const DoneController = require('./controllers/DoneController');

const routes = express.Router();

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);

routes.post('/category', CategoryController.store);
routes.delete('/category/:categoryid', CategoryController.destroy);
routes.get('/categories', CategoryController.index);

routes.post('/item', ItemController.store);
routes.get('/items', ItemController.index);
routes.delete('/item/:categoryid/:itemid', ItemController.destroy);

routes.post('/setItemDone', DoneController.store);

module.exports = routes;