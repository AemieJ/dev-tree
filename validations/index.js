import { registerValidation, loginValidation }from './auth.validation.js';
import { updateValidation } from './profile.validation.js';
import { treeValidation } from './tree.validation.js';

let validation = {
  registerValidation,
  loginValidation,
  updateValidation,
  treeValidation
}

export default validation;
