import { success, warning, error } from 'react-notification-system-redux';

const defaultOpts = {
  position: 'tr',
  autoDismiss: 4
};

export default {
  success: function(message, title="Success", config={}) {
    const opts = Object.assign({}, defaultOpts, config, {message, title});
    return success(opts);
  },

  warning: function(message, title="Error", config={}) {
    const opts = Object.assign({}, defaultOpts, config, {message, title});
    return warning(opts);
  },

  error: function(message, title="Error", config={}) {
    const opts = Object.assign({}, defaultOpts, config, {message, title});
    return error(opts);
  }
}
