const chatService = require('@/services')('Chat');
const { getChat } = require('../aggregations');
const { global } = require('../../../utils');

module.exports = async (req, res, next) => {
  const { user } = req.params;

  if (!user) return next({ code: 401, message: 'User id not sent' });

  // Get chat from DB
  const query = {
    group: false,
    $and: [
      { users: { $elemMatch: { $eq: global.getMongooseID(req.user._id) } } },
      { users: { $elemMatch: { $eq: global.getMongooseID(user) } } },
    ],
  };

  let chatAggregation = getChat(query);
  let chat = await chatService.aggregateOne(chatAggregation);

  if (!chat) {
    // Create chat
    const newChat = await chatService.create({
      chatname: 'sender',
      group: false,
      users: [req.user._id, user],
    });

    chatAggregation = getChat({ _id: newChat._id });
    chat = await chatService.aggregateOne(chatAggregation);
  }

  return res.json({
    data: { chat },
    message: 'Chat fetched',
  });
};
