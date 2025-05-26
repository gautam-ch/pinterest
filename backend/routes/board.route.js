import express from 'express';
import { getBoard,brd } from '../controllers/board.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
const router = express.Router();

router.get('/user',getBoard);

router.get('/',verifyToken,brd);

export default router;