import { Router } from 'express';
import ItemController from '../app/controllers/ItemController';
import SearchItemController from '../app/controllers/SearchItemController';

import authMiddleware from '../app/middlewares/auth';

const itemRouter = Router();

itemRouter.get('/search', SearchItemController.index);

itemRouter.post('/', authMiddleware, ItemController.store);
itemRouter.get('/', ItemController.index);
itemRouter.get('/:id', ItemController.show);

export default itemRouter;
