import  {Router}  from 'express';
import verificationControllers from '../controller/verificationControllers.js';
import { singUpSchema} from '../validations/singUpValidations.js';
import { singInSchema } from '../validations/signInValidations.js';
import validator from '../middlewares/validator.js';
import passport from '../middlewares/passport.js';

const verificationRouter= Router()
const { signUp,signIn,loginWithToken } = verificationControllers

verificationRouter.post('/signup', validator(singUpSchema), signUp);
verificationRouter.post('/signin', validator(singInSchema), signIn);
verificationRouter.get('/signin', validator(singInSchema), signIn);
verificationRouter.post('/signin/token', passport.authenticate('jwt', {session:false}), loginWithToken);
verificationRouter.get('/signin/token', passport.authenticate('jwt', {session:false}), loginWithToken);

export default verificationRouter