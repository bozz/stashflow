// const Sequelize = require('sequelize');
const Papa = require('papaparse');

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

    let col;
    const mappedRows = parsed.data.map(row => {
      const mappedRow = { accountId: account.id };
      Object.keys(importTemplate.mapping).forEach(mappingKey => {
        col = importTemplate.mapping[mappingKey];
        if (typeof col === 'object') {
          col = importTemplate.mapping[mappingKey].col;
        }

        if (typeof col !== undefined) {
          mappedRow[mappingKey] = row[col];
        }
      });

      return mappedRow;
    });

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

module.exports = csvImporter;
