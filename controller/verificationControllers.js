import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Creacion y verificacion de acceso de un usuario
const verificationControllers = {
  signUp: async (req, res, next) => {
    try {
      const ExistNameUser = await User.findOne({ nameUser: req.body.nameUser });

      if (!ExistNameUser) {
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        console.log(passwordHash);
        let body = { ...req.body };
        body.password = passwordHash;

        const newUser = await User.create(body);

        const userResponse = {
          avatar: newUser.avatar,
          nameUser: newUser.nameUser,
          _id: newUser._id,
        };

        const token = jwt.sign(
          { nameUser: newUser.nameUser, avatar: newUser.avatar },
          process.env.Token
        );

        console.log(token);

        return res.json({
          success: true,
          userData: userResponse,
          token: token,
          message: "Sign up successfully",
        });
      }
      return res.json({
        success: true,
        message: "NameUser already exist",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  signIn: async (req, res, next) => {
    try {
      let { nameUser: nameUserBody, password } = req.body;

      const userInDb = await User.findOne({ nameUser: nameUserBody });
      console.log(userInDb);

      if (!userInDb) {
        res.status(403).json({
          message: ["no user exist whith this NameUser"],
        });
      }

      let passwordValidator = bcrypt.compareSync(password, userInDb.password);

      if (!passwordValidator) {
        res.status(403).json({
          message: ["User invalidated, check NameUser or password"],
        });
      }

      const userResponse = {
        avatar: userInDb.avatar,
        nameUser: userInDb.nameUser,
        _id: userInDb._id,
      };

      const token = jwt.sign(
        { nameUser: userInDb.nameUser },
        process.env.Token
      );

      console.log(token);

      return res.json({ success: true, userResponse, token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  loginWithToken: (req, res) => {
    const userResponse = {
      avatar: req.user.avatar,
      nameUser: req.user.nameUser,
      _id: req.user._id,
    };
    res.json({
      success: true,
      userData: userResponse,
      message: "Sign in successfully",
    });
  },
};

export default verificationControllers;
