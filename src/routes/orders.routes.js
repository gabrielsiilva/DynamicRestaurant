import { Router } from 'express';
import OrderController from '../app/controllers/OrderController';

const orderRoutes = Router();

orderRoutes.get('/', OrderController.index);
orderRoutes.post('/', OrderController.store);

export default orderRoutes;
