const express = require('express');
const UserController = require('./controllers/UserController');
const TodoListController = require('./controllers/TodoListController');
const ItemController = require('./controllers/ItemController');
const SubItemController = require('./controllers/subItemController');
const DoneController = require('./controllers/DoneController');

const routes = express.Router();

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);
routes.post('/todoList', TodoListController.store);
routes.delete('/todoList/:todoListId', TodoListController.destroy);
routes.get('/todoLists', TodoListController.index);
routes.post('/item', ItemController.store);
routes.get('/items', ItemController.index);
routes.delete('/item/:todoListId/:itemId', ItemController.destroy);
routes.post('/subItem', SubItemController.store);
routes.get('/subItems', SubItemController.index);
routes.delete('/subItem', SubItemController.destroy);
routes.post('/setItemDone', DoneController.store);

module.exports = routes;