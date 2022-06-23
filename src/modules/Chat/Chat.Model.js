const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const chatSchema = new Schema(
  {
    chatname: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    group: {
      type: Boolean,
      default: false,
    },

    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('chats', chatSchema);
