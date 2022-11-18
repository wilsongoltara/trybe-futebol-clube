import { Router } from 'express';
import LoginServices from '../services/LoginServices';
import LoginController from '../controllers/LoginController';
import validationLogin from '../middlewares/validationLogin';
import auth from '../middlewares/auth';

const router = Router();
const controller = new LoginController(new LoginServices());

router.get('/validate', auth, controller.validate);
router.post('/', validationLogin, controller.login);

export default router;
