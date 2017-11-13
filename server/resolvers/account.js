const _ = require('lodash');

module.exports = {
  Query: {
    getAccount: (parent, { id }, { models }) => models.Account.findOne({ where: { id } }),
    getAllAccounts: (parent, args, { models }) => models.Account.findAll()
  },
  Mutation: {
    createAccount: (parent, args, { models }) => {
      return models.Account.create(args.input);
    },
    updateAccount: async (parent, args, { models }) => {
      const account = await models.Account.findById(args.input.id);
      if (!account) {
        throw new Error('Account with specified Id could not be found');
      }

      const updateProps = _.pickBy(args.input, (prop, key) => { return key !== 'id' });
      return account.update(updateProps);
    },
    deleteAccount: (parent, args, { models }) => {
      return models.Account.destroy({ where: { id: args.input.id } });
    }
  }
};
