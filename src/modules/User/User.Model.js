const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    googleID: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
    },

    username: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('users', userSchema);
