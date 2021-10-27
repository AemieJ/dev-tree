const { registerValidation, loginValidation } = require('./auth.validation')
const { updateValidation } = require('./profile.validation')
const { treeValidation } = require('./tree.validation')

module.exports = {
  registerValidation,
  loginValidation,
  updateValidation,
  treeValidation
}
