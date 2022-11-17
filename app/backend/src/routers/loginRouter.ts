import { Router } from 'express';
import LoginServices from '../services/LoginServices';
import LoginController from '../controllers/LoginController';

const router = Router();
const controller = new LoginController(new LoginServices());

router.post('/', (req, res) => controller.login(req, res));

export default router;
