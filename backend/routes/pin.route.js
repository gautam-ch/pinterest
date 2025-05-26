import express from 'express';
import { getPins,getPin,createPin,checkLike,doLike } from '../controllers/pin.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/',getPins);

router.get('/:id',getPin);

router.post('/',verifyToken,createPin);

router.get('/checkLike/:id',checkLike);

router.post('/checkLike/:id',verifyToken,doLike);

export default router;