const db = require('../models');
const formatErrorResponse = require('./utils').formatErrorResponse;

/**
 * Apply all basic CRUD routes to passed router.
 * @param {expres.Router} router
 * @param {String} modelName
 * @param {Object} options
 */
function applyCrudRoutes(router, modelName, options) {
  if (!db.hasOwnProperty(modelName)) {
    throw new Error('Invalid model: ' + modelName);
  }

  const dbModel = db[modelName];

  // dbModel.describe().then(attrs => console.log(attrs));

  // return all
  router.get('/', function(req, res) {
    dbModel
      .findAll()
      .then(records => res.json({ data: records }))
      .catch(error => formatErrorResponse(res, error));
  });

  // return specific instance
  router.get('/:id', function(req, res) {
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
    dbModel
      .create(req.body)
      .then(instance => res.json(instance))
      .catch(err => formatErrorResponse(res, err));
  });

  // update instance
  router.post('/:id', function(req, res) {
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
