import Joi from 'joi';
import accessEnv from '@utils/accessEnv';

const userSignedUpValidator = Joi.object({
  username: Joi.string()
    .required()
    .email(),
  password: Joi.string()
    .required()
    .min(parseInt(accessEnv('PASSWORD_MIN')))
    .max(parseInt(accessEnv('PASSWORD_MAX')))
});

const userLoggedInValidator = Joi.object({
  username: Joi.string()
    .required()
    .email(),
  password: Joi.string()
    .required()
})

export { userSignedUpValidator, userLoggedInValidator };
