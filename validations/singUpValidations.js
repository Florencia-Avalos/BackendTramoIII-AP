import joi from 'joi';
import joiPassword from 'joi-password-complexity';

const complexityOptions = {
  min: 6,
  max: 40,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

export const singUpSchema = joi.object({

  nameUser: joi.string().required().messages({
    "string.empty":"The nameUser dont be empty",
}),
  password: joiPassword(complexityOptions).messages({
    "string.empty":"The password dont be empty",
  }),
  avatar: joi.string().uri().allow("").allow(null),
}) 