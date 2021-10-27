const Joi = require('@hapi/joi')

const treeValidation = (data) => {
  const schema = Joi.object({
    youtube: {
      id: Joi.string().allow(''),
      list: Joi.array().items(Joi.string())
    }
  })
  return schema.validate(data)
}

module.exports = {
  treeValidation
}
