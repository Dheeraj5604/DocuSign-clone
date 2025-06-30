import { Router } from 'express';
import { getData, postData } from '../controllers/apiController';

const router: Router = Router();

router.get('/data', getData);
router.post('/upload', postData);

export default router;
