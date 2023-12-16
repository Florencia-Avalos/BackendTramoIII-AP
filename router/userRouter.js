import  {Router}  from 'express';
import userController from '../controller/userController.js';
const userRouter= Router();
const {getAllUsers,getUserById,updateUser,deleteUser} = userController


userRouter.get('/',getAllUsers);
userRouter.get('/:id',getUserById);
userRouter.put( '/:id', updateUser);
userRouter.delete( '/:id', deleteUser);



export default userRouter