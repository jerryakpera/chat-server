const { models } = require('./modules');

module.exports = (model) => {
  return {
    async getItem(query) {
      return models[model].findOne(query);
    },

    async getItems(query) {
      return models[model].find(query);
    },

    async aggregate(aggregationQuery) {
      return models[model].aggregate(aggregationQuery);
    },

    async aggregateOne(aggregationQuery) {
      const result = await models[model].aggregate(aggregationQuery);

      return result[0];
    },

    async create(item) {
      return models[model].create(item);
    },

    async update(query, update) {
      return models[model].findOneAndUpdate(query, update);
    },

    async deleteMany(query) {
      await models[model].deleteMany(query);
    },
    async addItemToList(query, item) {
      return models[model].findOneAndUpdate(
        query,
        { $push: item },
        { new: true }
      );
    },

    async getUserWithoutPassword(query) {
      return models.User.findOne(query).select('-password');
    },

    async removeItemFromList(query, item) {
      return models[model].findOneAndUpdate(
        query,
        { $pull: item },
        { new: true }
      );
    },
  };
};
