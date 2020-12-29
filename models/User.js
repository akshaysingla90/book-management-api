"use strict";
/************* Modules ***********/
const mongoose = require('mongoose');
const { USER_ROLES } = require('../utils/constants');
const { hashPassword } = require('../utils/utils')

/**************************************************
 ******* User Model or collection *********
 **************************************************/

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: [true, 'Please add name'] },
  password: { type: String, required: [true, 'Please add password'] },
  role: { type: String, enum: Object.values(USER_ROLES) },
  email: { type: String, unique: true, required: [true, 'Please add email'] },
});

// pre-hook to hash password.
userSchema.pre('save', async function (next) {
  this.password = hashPassword(this.password);
  next();
});

module.exports = mongoose.model('User', userSchema);
