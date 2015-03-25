'use strict';
var Growler, notificationDefinitions, resolveConfig, growlReports;

Growler = require('./lib/growler');
notificationDefinitions = require('./lib/notificationDefinitions');
resolveConfig = require('./lib/resolveConfig');
growlReports = require('./lib/growlReports');

function buildGrowler(config) {
  var growler = new Growler(config);
  notificationDefinitions.forEach(growler.addNotificationType);
  return growler;
}


function reportErrors(options) {
  options.errors.forEach(function(result) {
    var errorOptions = {
      error: result.error,
      file: result.file,
      basePath: options.config.basePath,
      growler: options.growler
    };

    if ((result.error.code && result.error.code[0] === 'E')) {
      growlReports.reportError(errorOptions);
    } else {
      growlReports.reportWarning(errorOptions);
    }
  });
}

function report(options) {
  var errorOptions;

  errorOptions = {
    growler: buildGrowler(options.config),
    errors: options.errors,
    config: options.config
  };
  
  if (options.errors.length > 0) {
    reportErrors(errorOptions);
  } else {
    growlReports.reportSuccess(errorOptions.growler);
  }
}

var jsHintReporter = {
  reporter: function (errors) {
    resolveConfig(function(config) {
      report({
        config: config,
        errors: errors
      });
    });
  }
};

module.exports = jsHintReporter;
