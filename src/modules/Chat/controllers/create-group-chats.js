const chatService = require('@/services')('Chat');
const { getChat } = require('../aggregations');

module.exports = async (req, res, next) => {
  const { chatname, description, users } = req.body;

  if (users.length < 2) {
    return next({
      code: 400,
      message: 'More than 2 users are required to form a group',
    });
  }

  // Check if chatname exists
  const chatnameExists = await chatService.getItem({ chatname, group: true });
  if (chatnameExists) {
    return next({
      code: 400,
      message: 'A group with a similar name already exists',
    });
  }

  let chat = await chatService.create({
    group: true,
    chatname,
    description,
    users: [...users, req.user._id],
    admin: req.user._id,
  });

  const query = { _id: chat._id };

  const chatAggregation = getChat(query);
  chat = await chatService.aggregateOne(chatAggregation);

  return res.json({
    data: { chat },
    message: 'Group created',
  });
};
