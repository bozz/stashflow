
const utils = {

  /**
   * Format router error responses.
   * @param {Response} res
   * @param {Error} error
   * @returns {Response}
   */
  formatErrorResponse: (res, error) => {
    // TODO: handle errors more intelligently
    console.error(error);
    return res.status(500).json({
      status: 500,
      error: error.name,
      message: error.message
    });
  }
}

module.exports = utils;
