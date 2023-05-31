import Joi from 'joi';

const getJoiValidationErrorMessage = (error: Joi.ValidationError) => {
  return error.details[0].message;
}

export { getJoiValidationErrorMessage }
