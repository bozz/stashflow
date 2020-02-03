const db = require('../../lib/db');

// for debugging unhandled promises
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

const testDb = {
  init: () => {
    return db
      .init({
        forceSync: true,
        dbConfig: {
          dialect: 'sqlite',
          storage: '', // in-memory db
          logging: false
        }
      })
      .then(() => db);
  },

  /**
   * Truncate (Delete) all data in specified Models
   * @param {object} db - database object from 'initDbConnection'
   * @param {array} modelNames - db model names to truncate
   */
  truncateModels: async function(modelNames = []) {
    modelNames = Object.keys(testDb.models);
    return Promise.all(
      modelNames.map(model => {
        if (testDb.models.hasOwnProperty(model)) {
          return testDb.models[model].destroy({ where: {}, force: true });
        }
        return true;
      })
    ).catch(err => {
      console.error(err);
    });
  }
};

module.exports = testDb;
