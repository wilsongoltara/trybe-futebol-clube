import { Router } from 'express';
import TeamsServices from '../services/TeamsServices';
import TeamsController from '../controllers/TeamsController';

const router = Router();
const controller = new TeamsController(new TeamsServices());

router.get('/', controller.getAll);

export default router;
