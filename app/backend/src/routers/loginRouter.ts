import { Router } from 'express';
import LoginServices from '../services/LoginServices';
import LoginController from '../controllers/LoginController';
import validationLogin from '../middlewares/validationLogin';

const router = Router();
const controller = new LoginController(new LoginServices());

router.post('/', validationLogin, (req, res) => controller.login(req, res));

export default router;
