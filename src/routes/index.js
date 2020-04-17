import { Router } from 'express';

import authRouter from './auth.routes';
import tableRouter from './tables.routes';
import itemRouter from './items.routes';
import orderRoutes from './orders.routes';

const routes = new Router();

// AUTH ROUTE
routes.use('/auth', authRouter);

// TABLES ROUTES
routes.use('/tables', tableRouter);

// ITEMS ROUTES
routes.use('/items', itemRouter);

// ORDERS ROUTES
routes.use('/orders', orderRoutes);

export default routes;
