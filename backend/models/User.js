const mongoose = require("mongoose"); //using mongoose module again
const { Schema } = mongoose; // importinf scheema from mongoose module

const userSchema = new Schema({
  //creating a new schema with a variable user Schema
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema); //this is creating a model aka table for user
//think of model as a table in sql or we can say a collection in monngo db
module.exports = User; //exporting the model so it can be used in other files
