import { errorType } from './constants.js';

const getErrorCode = errorName => {
  return errorType[errorName]
}

export default getErrorCode;
