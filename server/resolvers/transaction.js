module.exports = {
  Query: {
    getTransaction: (parent, { id }, { models }) => {
      return models.Transaction.findOne({
        where: { id },
        include: [{ model: models.Account, as: 'account' }]
      })
    },
    getAllTransactions: (parent, args, { models }) => {
      return models.Transaction.findAll({
        include: [{ model: models.Account, as: 'account' }]
      })
    }
  },
  Mutation: {
    createTransaction: (parent, args, { models }) => {
      return models.Transaction.create(args.input);
    },
    updateTransaction: async (parent, args, { models }) => {
      const model = await models.Transaction.findById(args.input.id);
      if (!model) {
        throw new Error('Transaction with specified Id could not be found');
      }

      const updateProps = _.pickBy(args.input, (prop, key) => { return key !== 'id' });
      return model.update(updateProps);
    },
    deleteTransaction: (parent, args, { models }) => {
      return models.Transaction.destroy({ where: { id: args.input.id } });
    }
  }
};
