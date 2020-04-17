import { Router } from 'express';
import TableController from '../app/controllers/TableController';

import authMiddleware from '../app/middlewares/auth';

const tableRouter = Router();

tableRouter.use(authMiddleware);

tableRouter.post('/', TableController.store);
tableRouter.get('/', TableController.index);
tableRouter.get('/:id', TableController.show);

export default tableRouter;
