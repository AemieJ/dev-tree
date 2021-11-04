export const errorName = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  ID_ALREADY_EXISTS: 'ID_ALREADY_EXISTS',
  ID_NOT_EXISTS: 'ID_NOT_EXISTS',
  INVALID_ID: 'INVALID_ID',
  USER_NOT_EXISTS: 'USER_NOT_EXISTS',
  USER_INCORRECT_PASS: 'USER_INCORRECT_PASS',
  INVALID_TOKEN: 'INVALID_TOKEN',
  NOT_LOGGED_IN: 'NOT_LOGGED_IN',
  REFRESH_EXPIRED: 'REFRESH_EXPIRED',
  MAIL_ERROR: 'MAIL_ERROR',
  UNMATCHING_PASS: 'UNMATCHING_PASS',
  SERVER_ERROR: 'SERVER_ERROR',
  NOT_ACC_DELETE: 'NOT_ACC_DELETE',
  DUP_EMAIL: 'DUP_EMAIL'
}

export const errorType = {
  VALIDATION_ERROR: {
    message: 'User information is not valid',
    statusCode: 401
  },
  INVALID_TOKEN: {
    message: 'Token is invalid',
    statusCode: 403
  },
  INVALID_ID: {
    message: 'ID information is invalid. Try again.',
    statusCode: 404
  },
  ID_ALREADY_EXISTS: {
    message: 'User ID already exists.',
    statusCode: 403
  },
  USER_ALREADY_EXISTS: {
    message: 'User already exists. Login with the credentials',
    statusCode: 403
  },
  ID_NOT_EXISTS: {
    message: 'User doesn\'t have the associated ID',
    statusCode: 404
  },
  USER_NOT_EXISTS: {
    message: 'Invalid Email. Doesn\'t exist in the database',
    statusCode: 403
  },
  USER_INCORRECT_PASS: {
    message: 'Incorrect password',
    statusCode: 403
  },
  INVALID_DENIED: {
    message: 'Invalid token',
    statusCode: 403
  },
  REFRESH_EXPIRED: {
    message: 'Refresh token is expired. User must re-login',
    statusCode: 403
  },
  MAIL_ERROR: {
    message: 'Mail has not been sent. Try again.',
    statusCode: 500
  },
  NOT_LOGGED_IN: {
    message: 'User not logged in. Login with your credentials',
    statusCode: 403
  },
  UNMATCHING_PASS: {
    message: 'Password don\'t matching. Try again',
    statusCode: 400
  },
  SERVER_ERROR: {
    message: 'Server error.',
    statusCode: 500
  },
  NOT_ACC_DELETE: {
    message: 'The personal ID needs to be deleted before inserting new',
    statusCode: 401
  },
  DUP_EMAIL: {
    message: 'User\'s personal mail can\'t be used for bookmarking itself',
    statusCode: 403
  }
}
