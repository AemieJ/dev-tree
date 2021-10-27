import createUser from './users/createUser.service.js';
import createToken from './users/createToken.service.js';
import fetchUser from './users/fetchUser.service.js';
import updateUserOnLogin from './users/updateUserOnLogin.service.js';
import updateUser from './users/updateUser.service.js';
import forgotPass from './users/forgotPass.service.js';
import isValidURL from './users/isValidURL.service.js';
import resetPass from './users/resetPass.service.js';
import fetchDetails from './users/fetchDetails.service.js';
import createID from './tree/createID.service.js';
import fetchID from './tree/fetchID.service.js';

let service = {
  createUser,
  createToken,
  fetchUser,
  fetchDetails,
  updateUser,
  updateUserOnLogin,
  forgotPass,
  isValidURL,
  resetPass,
  createID,
  fetchID
}

export default service;
