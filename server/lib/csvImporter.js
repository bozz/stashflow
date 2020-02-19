// const Sequelize = require('sequelize');
const Papa = require('papaparse');

const importProcessors = require('../lib/importProcessors/');

const csvImporter = {
  /**
   * Import CSV file
   * @param {object} db - initialized database object
   * @param {string} csv - csv file as string
   * @param {object} importTemplate
   * @param {string} importTemplate.account - account key
   * @param {object} importTemplate.mapping - mapping of transaction props to columns
   * @param {object} options
   * @param {string} options.file - csv file name
   * @param {boolean} options.preview - only generate preview?
   * @returns {Promise}
   */
  import: async (db, csv, importTemplate, options = {}) => {
    if (!db || !db.models) {
      throw new Error('Invalid database instance');
    }

    if (!csv || !importTemplate) {
      throw new Error('Invalid arguments');
    }

    if (!importTemplate.account || !importTemplate.mapping) {
      throw new Error('Invalid importTemplate arguments');
    }

    const skipStart = importTemplate.skipLinesStart || 0;
    const skipEnd = importTemplate.skipLinesEnd ? -importTemplate.skipLinesEnd : undefined;

    var csvLines = csv
      .trim()
      .split('\n')
      .slice(skipStart, skipEnd)
      .join('\n');

    const parsed = Papa.parse(csvLines);

    const account = await db.models.Account.findOne({ where: { key: importTemplate.account } });
    if (!account) {
      throw new Error('Invalid account specified in importTemplate - ' + importTemplate.account);
    }

    const mappedRows = parsed.data.map(row => _mapRow(row, importTemplate.mapping, account.id));

    if (options.preview) {
      return mappedRows;
    }

    // const transaction = await db.sequelize.transaction();

    return db.sequelize
      .transaction(
        { isolationLevel: db.Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE },
        transaction => {
          return db.models.Transaction.bulkCreate(mappedRows, { transaction }).then(
            createResult => {
              return db.models.DataImport.create({
                filename: options.file,
                data: csv,
                config: importTemplate
              });
            }
          );
        }
      )
      .then(result => {
        return 'SUCCESS';
        // transaction has been committed. Do something after the commit if required.
      })
      .catch(err => {
        // do something with the err.
        throw new Error(err);
      });

    // TODO: 2: begin transaction
    // TODO: 3: Transaction.bulkCreate
    // TODO: 4: DataImport.create
    // TODO: 4: end transaction

    // const results = {};
    // return results;
  }
};

/**
 * @private
 * @param {array} row - current CSV row as array
 * @param {object} mapping - mapping from importTemplate
 * @param {number} accountId - Account ID from DB
 * @returns {object} returns single row mapped to DB properties
 */
const _mapRow = function(row, mapping, accountId) {
  let col, colValue, mapValue, processors;
  const mappedRow = { accountId: accountId };
  Object.keys(mapping).forEach(mappingKey => {
    mapValue = mapping[mappingKey];
    processors = [];
    if (typeof mapValue === 'object') {
      col = mapValue.col;
      processors = mapValue.processors || [];
    } else {
      col = mapValue;
    }

    if (typeof col !== undefined) {
      colValue = row[col];
    }

    if (processors.length) {
      colValue = _runProcessors(processors, colValue, row);
    }

    mappedRow[mappingKey] = colValue;
  });

  return mappedRow;
};

/**
 * @private
 * @param {object[]} processors - array of processors
 * @param {*} value
 * @param {array} row - current CSV row as array
 * @returns {*} returns updated value
 */
const _runProcessors = function(processors, value, row) {
  if (!processors.length) {
    return value;
  }

  return processors.reduce((result, pConfig) => {
    const processor = importProcessors[pConfig.type];

    if (!processor) {
      throw new Error('Processor not found - ' + pConfig.type);
    }

    return processor.run(result, row, pConfig.args, _runProcessors);
  }, value);
};

module.exports = csvImporter;
