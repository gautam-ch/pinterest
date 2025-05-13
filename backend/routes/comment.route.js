import express from 'express';
import { delComment, getComments,postComment } from '../controllers/comment.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/post',getComments)

router.post('/',verifyToken,postComment);

router.post('/delete',verifyToken,delComment);

export default router;