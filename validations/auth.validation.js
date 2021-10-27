import Joi from '@hapi/joi';

export const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(100).required(),
    email: Joi.string().min(6).max(255).required().email(),
    gender: Joi.string().valid('male', 'female').required(),
    password: Joi.string().min(6).max(256).required()
  })
  return schema.validate(data)
}

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(256).required()
  })
  return schema.validate(data)
}
