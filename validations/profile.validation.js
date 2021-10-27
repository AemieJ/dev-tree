const Joi = require('@hapi/joi')

const updateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(100),
    gender: Joi.string().valid('male', 'female'),
    profile: Joi.string()
  })
  return schema.validate(data)
}

module.exports = {
  updateValidation
}
