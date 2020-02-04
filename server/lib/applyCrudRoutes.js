const db = require('../lib/db');
const utils = require('./utils');
const formatErrorResponse = utils.formatErrorResponse;

/**
 * Apply all basic CRUD routes to passed router.
 * @param {expres.Router} router
 * @param {String} modelName
 * @param {Object} config
 * @param {Array} config.queryFilter - array of columns, to filter with 'q' (combined with OR)
 */
function applyCrudRoutes(router, modelName, config) {
  const getModel = res => {
    return db.models && db.models.hasOwnProperty(modelName) ? db.models[modelName] : false;
  };

  // return all
  router.get('/', function(req, res) {
    const dbModel = getModel();
    if (!dbModel) {
      return formatErrorResponse(res, new Error('CrudRoutes: Model NotFound: ' + modelName));
    }

    const queryParams = new URLSearchParams(req.query);

    dbModel
      .describe()
      .then(attrs => utils.generateFindAllOptions(queryParams, attrs, config))
      .then(options => dbModel.findAndCountAll(options))
      .then(data => res.json({ data: data.rows, count: data.count }))
      .catch(error => formatErrorResponse(res, error));
  });

  // return specific instance
  router.get('/:id', function(req, res) {
    const dbModel = getModel();
    if (!dbModel) {
      return formatErrorResponse(res, new Error('CrudRoutes: Model NotFound: ' + modelName));
    }
    dbModel
      .findByPk(req.params.id)
      .then(instance => {
        if (!instance) {
          throw new Error(`${modelName} Not Found`);
        }
        return res.json(instance);
      })
      .catch(err => formatErrorResponse(res, err));
  });

  // create instance
  router.post('/', function(req, res) {
    const dbModel = getModel();
    if (!dbModel) {
      return formatErrorResponse(res, new Error('CrudRoutes: Model NotFound: ' + modelName));
    }
    dbModel
      .create(req.body)
      .then(instance => res.json(instance))
      .catch(err => formatErrorResponse(res, err));
  });

  // update instance
  router.post('/:id', function(req, res) {
    const dbModel = getModel();
    if (!dbModel) {
      return formatErrorResponse(res, new Error('CrudRoutes: Model NotFound: ' + modelName));
    }
    dbModel
      .findByPk(req.params.id)
      .then(instance => {
        if (!instance) {
          throw new Error(`${modelName} Not Found`);
        }
        return instance.update(req.body);
      })
      .then(instance => res.json(instance))
      .catch(err => formatErrorResponse(res, err));
  });

  // delete instance
  router.delete('/:id', function(req, res) {
    const dbModel = getModel();
    if (!dbModel) {
      return formatErrorResponse(res, new Error('CrudRoutes: Model NotFound: ' + modelName));
    }
    dbModel
      .findByPk(req.params.id)
      .then(instance => {
        if (!instance) {
          throw new Error(`${modelName} Not Found`);
        }
        return instance.destroy();
      })
      .then(result => res.json({ success: !!result }))
      .catch(err => formatErrorResponse(res, err));
  });
}

module.exports = applyCrudRoutes;
