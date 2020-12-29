const Joi = require("joi");
const { USER_ROLES } = require('../utils/constants')
const routeValidation = {}

routeValidation.login = {
  body: Joi.object({
    email: Joi.string().email().required().description("User's email."),
    password: Joi.string().required().description("User's password."),
  }),
}

routeValidation.register = {
  body: Joi.object({
    name: Joi.string().required().description("User's name."),
    email: Joi.string().email().required().description("User's email."),
    password: Joi.string().required().description("User's password."),
    role: Joi.string().valid(USER_ROLES.MEMBER, USER_ROLES.ADMIN).required().description("User's role"),
  }),
}


routeValidation.addBook = { 
  body: Joi.object({
    name: Joi.string().required().description("Book's name."),
  }),
}


module.exports = routeValidation