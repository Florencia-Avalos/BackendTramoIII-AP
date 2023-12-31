import  {Router}  from 'express';
import postRouter from './postRouter.js'
import userRouter from './userRouter.js'
import verificationRouter from './verificationRouter.js';
import commentRouter from './commentRouter.js';

const indexRouter= Router()



indexRouter.get('/',(req,res,next)=> {

  res.send("Servidor Cargado")
})

indexRouter.use('/post', postRouter);
indexRouter.use('/user', userRouter);
indexRouter.use('/comment', commentRouter);
indexRouter.use('/verification',verificationRouter);





export default indexRouter