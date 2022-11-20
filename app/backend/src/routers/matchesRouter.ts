import { Router } from 'express';
import MatchesServices from '../services/MatchesServices';
import MatchesController from '../controllers/MatchesController';
import validationMatch from '../middlewares/validationMatch';
import auth from '../middlewares/auth';

const router = Router();
const controller = new MatchesController(new MatchesServices());

router.get('/', controller.getAllMatches);
router.post('/', auth, validationMatch, controller.addMatch);
router.patch('/:id', controller.finishAndUpdateMatch);
router.patch('/:id/finish', controller.finishMatch);

export default router;
