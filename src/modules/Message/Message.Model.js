const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
    },

    text: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('messages', messageSchema);
