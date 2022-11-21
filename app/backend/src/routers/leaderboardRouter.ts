import { Router } from 'express';
import LeaderboardServices from '../services/LeaderboardServices';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

const controller = new LeaderboardController(new LeaderboardServices());

router.get('/', controller.getAll);
router.get('/away', controller.getAllByAway);
router.get('/home', controller.getAllByHome);

export default router;
