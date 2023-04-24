import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import verifyUsersFields from '../middlewares/verifyUsersFields';

const router = Router();

const usersController = new UsersController();

router.get('/users', usersController.getAll);
router.post('/users', verifyUsersFields, usersController.create);

export default router;