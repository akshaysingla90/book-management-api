const jwt = require('jsonwebtoken');
const { JWT_SIGN_KEY } = require('../config')
const UserModel  = require(`../models/User`);
let authService = {};

/**
 * function to authenticate user and attach user to request
 * @param {*} request 
 */
const authenticateUser = async (request, response) => {
  try {
    // authenticate JWT token and attach user to request object (request.user)
    let decodedToken = jwt.verify(request.headers.authorization, JWT_SIGN_KEY);
    let authenticatedUser = await UserModel.findOne({ _id: decodedToken._id }).lean();
    if (!authenticatedUser) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
    request.user = authenticatedUser;
    return authenticatedUser;
  } catch (err) {
    return response.status(401).json({ error: 'Unauthorized' });
  }
}


/**
 * fucntion to authorise user according to its role
 * @param {*} request 
 * @param {*} roles 
 */
const authoriseUser = (request, response, roles) => {
  if (roles.length && !roles.includes(request.user.role)) {
    // user's role is not authorized to access the resource
    return response.status(403).json({ error: 'Forbidden' });
  }
  return true;
}


/**
 * function to check authentication and authorisation for user.
 * @param {*} roles authorised roles array
 */

authService.validateUser = (roles = []) => {
  return (request, response, next) => {
    authenticateUser(request, response)
      .then(user => {
        authoriseUser(request, response, roles);
        // authentication and authorization successful
        return next();
      })
      .catch(err => {
        return response.status(500).json({ error: 'Internal Server error' });
      })
  };
};

module.exports = authService;