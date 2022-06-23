const chatService = require('@/services')('Chat');
const { getChat } = require('../aggregations');
const { global } = require('../../../utils');

module.exports = async (req, res, next) => {
  const { _id } = req.user;

  // Get chat from DB
  const query = { users: _id };

  const chatAggregation = getChat(query);
  const chats = await chatService.aggregate(chatAggregation);

  return res.json({
    data: { chats },
    message: 'Chats fetched',
  });
};
