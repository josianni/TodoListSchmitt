const express = require('express');
const UserController = require('./controllers/UserController');
const TodoListController = require('./controllers/TodoListController');
const ItemController = require('./controllers/ItemController');

const routes = express.Router();

routes.post('/user', UserController.store);
routes.post('/todoList', TodoListController.store);
routes.get('/todoList', TodoListController.index);
routes.post('/item', ItemController.store);
routes.get('/items', ItemController.index);

module.exports = routes;