module.exports = (query) => {
  return [
    {
      $match: query,
    },
    {
      $lookup: {
        from: 'users',
        localField: 'users',
        foreignField: '_id',
        as: 'users',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'admin',
        foreignField: '_id',
        as: 'admin',
      },
    },
    {
      $lookup: {
        from: 'messages',
        localField: 'latestMessage',
        foreignField: '_id',
        as: 'latestMessage',
      },
    },
    {
      $lookup: {
        from: 'messages',
        localField: '_id',
        foreignField: 'chat',
        as: 'messages',
      },
    },
    {
      $set: {
        admin: { $first: '$admin' },
        latestMessage: { $first: '$latestMessage' },
      },
    },
    {
      $addFields: {
        date: {
          $function: {
            body: function (_date) {
              let created_date = new Date(_date);

              let months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ];
              let year = created_date.getFullYear();
              let month = months[created_date.getMonth()];
              let date = created_date.getDate();

              return `${month} ${date}, ${year}`;
            },
            args: ['$createdAt'],
            lang: 'js',
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        chatname: 1,
        description: 1,
        group: 1,
        users: {
          _id: 1,
          username: 1,
          email: 1,
        },
        admin: {
          _id: 1,
          username: 1,
          email: 1,
        },
        latestMessage: 1,
        updatedAt: 1,
        createdAt: 1,
      },
    },
    { $sort: { updatedAt: -1 } },
  ];
};
