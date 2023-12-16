import passport from "passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import User from "../models/User.js";


const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : process.env.Token,
  
}

const fn = async (payload, next) =>{
  try {
    const user =await User.findOne( { nameUser: payload.nameUser} ) 

    

    if (!user){
      done( null, false )
    }

    next(null, user)  

  } catch (error) {
    next(error, null)
  }
}

export default passport.use(new Strategy(opt,fn)) ;