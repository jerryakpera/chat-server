const userService = require('@/services')('User');
const { getUsers } = require('../aggregations');
const { global } = require('../../../utils');

module.exports = async (req, res) => {
  const { search } = req.query;

  const query = {
    $and: [
      {
        _id: { $ne: global.getMongooseID(req.user._id) },
      },
    ],
  };

  if (search) {
    query.$and.push({
      $or: [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    });
  }

  const userAggregation = getUsers(query);
  const users = await userService.aggregate(userAggregation);

  return res.json({
    data: { users },
    message: 'OK',
  });
};
