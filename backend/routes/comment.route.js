import express from 'express';

const router = express.Router();

router.get('/test',(req,res)=>{
    return res.json({msg:'hi from comment router'});
})

export default router;