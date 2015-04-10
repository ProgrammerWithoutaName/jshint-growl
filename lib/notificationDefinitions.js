'use strict';

var path;
path = require('path');

var error, warning, success;

error = {
  title: 'File: %s\n "%s" \n----------------------------',
  dispname: 'Error: line %s',
  icon: path.join(__dirname, '../images/failed.png')
};

warning = {
  title: 'File: %s\n "%s" \n----------------------------',
  dispname: 'Warning: line %s',
  icon: path.join(__dirname, '../images/error.png')
};

success = {
  title: 'Success',
  dispname: 'No warnings or errors',
  icon: path.join(__dirname, '../images/success.png')
};

module.exports = {
  types: [
    { name: 'error', typeDefinition: error},
    { name: 'warning', typeDefinition: warning},
    { name: 'success', typeDefinition: success }
  ]
};
