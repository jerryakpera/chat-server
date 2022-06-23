const chatService = require('@/services')('Chat');
const { getChat } = require('../aggregations');
const { global } = require('../../../utils');

module.exports = async (req, res, next) => {
  const { chat: _id } = req.params;

  if (!_id) return next({ code: 401, message: 'User id not sent' });

  const chatAggregation = getChat({ _id: global.getMongooseID(_id) });
  const chat = await chatService.aggregateOne(chatAggregation);

  return res.json({
    data: { chat },
    message: 'Chat fetched',
  });
};
