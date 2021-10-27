const Joi = require('@hapi/joi')

const treeValidation = (data) => {
  const schema = Joi.object({
    youtube: {
        id: Joi.string().allow(""),
        list: Joi.array().items(Joi.string())
    }
  })
  console.log(schema.validate(data))
  return schema.validate(data)
}

module.exports = {
  treeValidation
}
