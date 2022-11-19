import { Router } from 'express';
import MatchesServices from '../services/MatchesServices';
import MatchesController from '../controllers/MatchesController';

const router = Router();
const controller = new MatchesController(new MatchesServices());

router.get('/', controller.getAllMatches);

export default router;
