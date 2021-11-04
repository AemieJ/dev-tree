import { registerValidation, loginValidation } from './auth.validation.js'
import { updateValidation } from './profile.validation.js'
import { treeValidation, updateTreeValidation, insertTreeValidation } from './tree.validation.js'

const validation = {
  registerValidation,
  loginValidation,
  updateValidation,
  treeValidation,
  insertTreeValidation,
  updateTreeValidation
}

export default validation
