const express = require ('express');
const UserController = require('./controllers/UserController');
const TodoListController = require('./controllers/TodoListController');

const routes = express.Router();

routes.post('/user', UserController.store);
routes.post('/todoList', TodoListController.store);
routes.get('/todoList', TodoListController.index);

module.exports = routes;