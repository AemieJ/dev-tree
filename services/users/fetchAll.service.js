import dotenv from 'dotenv';
dotenv.config()

import models from '../../models/index.js';

const fetchAll = async () => {
  const users = await models.User.find()

  return {
    msg: {
      status: 200,
      users
    }
  }
}

export default fetchAll;
