const chatService = require('@/services')('Chat');
const { getChat } = require('../aggregations');

module.exports = async (req, res, next) => {
  // Check if chatname exists
  const groupsAggregation = getChat({ users: req.user._id });
  const groups = await chatService.aggregate(groupsAggregation);

  return res.json({
    data: { groups },
    message: 'Group created',
  });
};
