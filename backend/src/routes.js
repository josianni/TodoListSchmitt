const express = require('express');
const UserController = require('./controllers/UserController');
const TodoListController = require('./controllers/TodoListController');
const ItemController = require('./controllers/ItemController');
const DoneController = require('./controllers/DoneController');

const routes = express.Router();

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);
routes.post('/todoList', TodoListController.store);
routes.get('/todoList', TodoListController.index);
routes.post('/item', ItemController.store);
routes.get('/items', ItemController.index);
routes.post('/setItemDone', DoneController.store);

module.exports = routes;