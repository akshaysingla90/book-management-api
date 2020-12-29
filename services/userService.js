const UserModel = require('../models/User');
const userService = {}

/** 
* function to register a new  user
*/
userService.registerUser = async (criteria) => {
  return await UserModel(criteria).save();
};

/** 
* function to get a  user
*/
userService.findUser = async (criteria) => {
  return await UserModel.findOne(criteria).lean();
};

module.exports = userService;