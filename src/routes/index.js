import { Router } from 'express';

import TableController from '../app/controllers/TableController';
import ItemController from '../app/controllers/ItemController';
import AuthController from '../app/controllers/AuthController';
import OrderController from '../app/controllers/OrderController';

const routes = new Router();

// AUTH ROUTE
routes.post('/auth', AuthController.store);

// TABLES ROUTES
routes.get('/tables', TableController.index);
routes.post('/tables', TableController.store);
routes.get('/tables/:id', TableController.show);

// items ROUTES
routes.post('/items', ItemController.store);
routes.get('/items', ItemController.index);
// routes.get('/items/:id', ItemController.show);
routes.get('/items/search', ItemController.search);

// ORDERS ROUTES
routes.get('/orders/:tableNumber', OrderController.index);
routes.post('/orders', OrderController.store);

export default routes;
