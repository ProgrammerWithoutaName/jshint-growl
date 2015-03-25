'use strict';

var util = require('util');

function getRelativePath(file, basePath) {
  return file.replace(basePath,'');
}

function getErrorLineText(error) {
  return util.format('line: %s', error.line);
}

function buildMessage(error) {
  var errorLine, errorBody;
  errorLine = getErrorLineText(error) + '\n';
  errorBody = error.reason;

  return errorLine + errorBody;
}

function reportError(options) {
  options.growler.notify({
    type: 'error',
    typeDefinition: {
      title: getRelativePath(options.file, options.basePath),
      dispname: getErrorLineText(options.error),
      message: buildMessage(options.error)
    }
  });
}

function reportWarning(options) {
  options.growler.notify({
    type: 'warning',
    typeDefinition: {
      title: getRelativePath(options.file, options.basePath),
      dispname: getErrorLineText(options.error),
      message: buildMessage(options.error)
    }
  });
}

function reportSuccess(growler) {
  growler.notify({
    type: 'error',
    typeDefinition: {
      title: '',
      dispname: '',
      message: 'Success!'
    }
  });
}

module.exports = {
  reportError: reportError,
  reportWarning: reportWarning,
  reportSuccess: reportSuccess
};
