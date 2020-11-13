const express = require('express');
const UserController = require('./controllers/UserController');
const MarketListController = require('./controllers/MarketListController');
const ItemController = require('./controllers/ItemController');
const DoneController = require('./controllers/DoneController');

const routes = express.Router();

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);

routes.post('/marketList', MarketListController.store);
routes.delete('/marketList/:marketlistid', MarketListController.destroy);
routes.get('/marketList', MarketListController.index);

routes.post('/item', ItemController.store);
routes.get('/items', ItemController.index);
routes.delete('/item/:marketlistid/:itemid', ItemController.destroy);

routes.post('/setItemDone', DoneController.store);

module.exports = routes;