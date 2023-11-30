import  {Router}  from 'express';
import commentController from '../controller/commetController.js';
const commentRouter= Router();
const {getAllComments,getCommentById,createComment,updateComment,deleteComment} = commentController


commentRouter.get('/',getAllComments);
commentRouter.post('/',createComment);
commentRouter.get('/:id',getCommentById);
// commentRouter.put( '/:id', updateComment);
commentRouter.delete( '/:id', deleteComment);



export default commentRouter;