import Joi from '@hapi/joi'

export const treeValidation = (data) => {
  const schema = Joi.object({
    youtube: {
      id: Joi.string().allow(''),
      list: Joi.array().max(3).items(Joi.string())
    }
  })
  return schema.validate(data)
}

export const insertTreeValidation = (data) => {
  const schema = Joi.object({
    youtube: {
      id: Joi.string(),
      list: Joi.array().max(3).items(Joi.string())
    }
  })
  return schema.validate(data)
}

export const updateTreeValidation = (data) => {
  const schema = Joi.object({
    youtube: {
      list: Joi.array().max(3).items(Joi.string()).allow(null)
    }
  })
  return schema.validate(data)
}
