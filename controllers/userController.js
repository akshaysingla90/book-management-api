const { userService } = require('../services');
const { compareHash, encryptJwt } = require('../utils/utils')
const userController = {}

/**
 * function to register a user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
userController.register = async (req, res, next) => {
  try {
    let userExists = await userService.findUser({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already registred' });
    }
    let user = await userService.registerUser(req.body);
    return res.status(200).json({ success: true, message: "User registered succussfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server error' });
  }
};


/**
 * function to login a user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
userController.login = async (req, res, next) => {
  try {
    const requiredUser = await userService.findUser({ email: req.body.email });
    if (requiredUser) {
      // compare user's password.
      if (compareHash(req.body.password, requiredUser.password)) {
        let dataForJWT = { _id: requiredUser._id, Date: Date.now, email: requiredUser.email, role: requiredUser.role };
        delete requiredUser.password;
        let token = encryptJwt(dataForJWT);
        return res.status(200).json({ success: true, message: "User logged in succussfully", user: requiredUser, token });
      }
      throw "Invalid Password"
    };
    throw "Invalid Credentials"

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server error' });
  }
};

/**
 * function to add a pump
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
userController.addPump = async (req, res, next) => {
  try {
    req.body.ownerId = req.userId;
    req.body.location = { coordinates: req.body.coordinates}
    const pump = await userService.createPump(req.body);
    return res.status(200).json({ success: true, message: "Pump created succussfully", pump });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server error' });
  }
};

module.exports = userController;