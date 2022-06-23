module.exports = (query) => {
  return [
    {
      $match: query,
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
        username: 1,
        email: 1,
        date: 1,
      },
    },
  ];
};
