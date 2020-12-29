"use strict";
/************* Modules ***********/
const mongoose = require('mongoose');

/**************************************************
 ******* Book Model or collection *********
 **************************************************/

const Schema = mongoose.Schema
const bookSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Book', bookSchema);