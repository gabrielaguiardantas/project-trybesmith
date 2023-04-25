import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import verifyUsersFields from '../middlewares/verifyUsersFields';
import verifyLoginFields from '../middlewares/verifyloginFields';

const router = Router();

const usersController = new UsersController();

router.get('/usersbyuser', usersController.getByUser);
router.get('/users', usersController.getAll);
router.post('/users', verifyUsersFields, usersController.create);
router.post('/login', verifyLoginFields, usersController.createLogin);

export default router;