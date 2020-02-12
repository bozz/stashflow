const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const db = {
  /**
   * Initialize database connection and models
   * @param {Object} options
   * @param {Object} options.dbConfig - sequelize config
   * @param {String} options.modelPath - path to models
   * @param {Boolean} options.forceSync=false - force db recreate?
   * @returns {Promise}
   */
  init: (options = {}) => {
    const basename = path.basename(module.filename);
    const modelPath = options.modelPath || path.join(__dirname, '../models');
    const models = {};

    const sequelize = new Sequelize(options.dbConfig);

    fs.readdirSync(modelPath)
      .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
      .forEach(file => {
        const model = sequelize.import(path.join(modelPath, file));
        models[model.name] = model;
      });

    // Run `.associate` if it exists,
    // ie create relationships in the ORM
    Object.values(models)
      .filter(model => typeof model.associate === 'function')
      .forEach(model => model.associate(models));

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    db.models = models;

    return sequelize.sync({ force: false });
  }
};

module.exports = db;
