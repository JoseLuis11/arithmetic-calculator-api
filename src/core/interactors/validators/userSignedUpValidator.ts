import Joi from 'joi';
import accessEnv from '@utils/accessEnv';

const min = accessEnv('PASSWORD_MIN');

console.log('min', min)
console.log('typeof min', typeof min)
const userSignedUpValidator = Joi.object({
  username: Joi.string()
    .required()
    .email(),
  password: Joi.string()
    .required()
    .min(parseInt(min))
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
