const mongoose = require('mongoose');

module.exports = () => {
  return {
    connect(dbURL) {
      return new Promise((resolve, reject) => {
        mongoose.connect(dbURL, {}).then((res, err) => {
          if (err) {
            console.log(err);
            return reject(err);
          }

          console.log('DB Connected');

          resolve(res.connection.getClient());

          return true;
        });
      });
    },

    close() {
      console.log('DB Disconnected');
      return mongoose.disconnect();
    },
  };
};
