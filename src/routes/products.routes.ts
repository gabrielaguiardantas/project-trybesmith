import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import verifyProductFields from '../middlewares/verifyProductFields';

const router = Router();

const productsController = new ProductsController();

router.get('/products', productsController.getAll);
router.post('/products', verifyProductFields, productsController.create);

export default router;