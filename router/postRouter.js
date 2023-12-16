import { Router } from 'express';
import postController from '../controller/postController.js';
const postRouter = Router();
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = postController;

postRouter.get('/', getAllPosts);
postRouter.post('/createPost', createPost); 
postRouter.get('/:id', getPostById);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);

export default postRouter;
