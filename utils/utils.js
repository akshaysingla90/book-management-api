const JWT = require("jsonwebtoken");
const CONSTANTS = require('./constants')
const { JWT_SIGN_KEY } = require('../config')
const BCRYPT = require("bcrypt");
const JOI = require("joi");

let commonFunctions = {};

/** create jsonwebtoken **/
commonFunctions.encryptJwt = payload => {
  let token = JWT.sign(payload, JWT_SIGN_KEY, {
    algorithm: "HS256"
  });
  return token;
};

/** decrypt jsonwebtoken **/

commonFunctions.decryptJwt = token => {
  return JWT.verify(token, JWT_SIGN_KEY, {
    algorithm: "HS256"
  });
};

/**
 * incrypt password in case user login implementation
 * @param {*} payloadString 
 */
commonFunctions.hashPassword = (payloadString) => {
  return BCRYPT.hashSync(payloadString, CONSTANTS.SECURITY.BCRYPT_SALT);
};

/**
 * @param {string} plainText 
 * @param {string} hash 
 */
commonFunctions.compareHash = (payloadPassword, userPassword) => {
  return BCRYPT.compareSync(payloadPassword, userPassword);
};

commonFunctions.getRequestValidatorMiddleware = (joiSchema) => {
  return (request, response, next) => {
    joiValidatorMethod(request, joiSchema)
      .then(result => {
        return next();
      })
      .catch(err => {
        return response.status(401).json({ error: err });
      });
  }
};

let joiValidatorMethod = async (request, joiSchema) => {
  if (joiSchema.params && Object.keys(joiSchema.params).length) {
    await JOI.validate(request.params, joiSchema.params);
  }
  if (joiSchema.body && Object.keys(joiSchema.body).length) {
    await JOI.validate(request.body, joiSchema.body);
  }
  if (joiSchema.query && Object.keys(joiSchema.query).length) {
    await JOI.validate(request.query, joiSchema.query);
  }
  if (joiSchema.headers && Object.keys(joiSchema.headers).length) {
    await JOI.validate(request.headers, joiSchema.headers);
  }
};


module.exports = commonFunctions;
