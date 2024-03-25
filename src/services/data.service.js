import httpStatus from 'http-status';
import { User } from '../models.js';
import ApiError from '../utils/ApiError.js';
import { dataModel } from '../models/index.js';

const db = dataModel.init();

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createData = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

export default {
  createData,
};
