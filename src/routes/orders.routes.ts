import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';
import validateJWT from '../auth/validateJWT';
import verifyOrderFields from '../middlewares/verifyOrderFields';

const router = Router();

const ordersController = new OrdersController();

router.get('/orders', ordersController.getAll);

router.post('/orders', validateJWT, verifyOrderFields, ordersController.create);

export default router;