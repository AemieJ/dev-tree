import Joi from '@hapi/joi';

export const updateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(100),
    gender: Joi.string().valid('male', 'female'),
    profile: Joi.string()
  })
  return schema.validate(data)
}

