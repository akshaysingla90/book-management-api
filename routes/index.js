const { userCtrl, bookCtrl } = require('../controllers');
const { authService } = require('../services');
const { getRequestValidatorMiddleware } = require('../utils/utils');
const { USER_ROLES } = require('../utils/constants');
const joiSchema = require('../validation/routeValidation')
const { Router } = require('express');
const router = Router();

/** User routes */
router.post('/register', getRequestValidatorMiddleware(joiSchema.register), userCtrl.register);
router.post('/login', getRequestValidatorMiddleware(joiSchema.login), userCtrl.login);

/** Book routes */
router.get('/book', authService.validateUser([USER_ROLES.ADMIN, USER_ROLES.MEMBER]), bookCtrl.getBooks);
router.post('/book', authService.validateUser([USER_ROLES.ADMIN]), getRequestValidatorMiddleware(joiSchema.addBook), bookCtrl.addBook);

module.exports = router;
