import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import verifyProductsFields from '../middlewares/verifyProductsFields';

const router = Router();

const productsController = new ProductsController();

router.get('/products', productsController.getAll);
router.post('/products', verifyProductsFields, productsController.create);

export default router;