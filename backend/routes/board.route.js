import express from 'express';
import { getBoard } from '../controllers/board.controller.js';
const router = express.Router();

router.get('/user',getBoard);

export default router;