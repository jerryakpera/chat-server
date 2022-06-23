const mongoose = require('mongoose');

module.exports.use = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports.getIDQuery = (id) => ({ _id: mongoose.Types.ObjectId(id) });

module.exports.getMongooseID = (id) => mongoose.Types.ObjectId(id);

module.exports.checkMongooseID = (id) => mongoose.isValidObjectId(id);
