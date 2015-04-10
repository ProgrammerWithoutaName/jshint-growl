'use strict';
var Growler, notificationDefinitions, resolveConfig, errorReporter;

Growler = require('./lib/growler');
notificationDefinitions = require('./lib/notificationDefinitions');
resolveConfig = require('./lib/resolveConfig');
errorReporter = require('./lib/errorReporter');

function buildGrowler(config) {
  var growler = new Growler(config);
  notificationDefinitions.types.forEach(function(type) {
    growler.addNotificationType(type);
  });
  return growler;
}

function report(options) {
  var errorOptions;

  errorOptions = {
    growler: buildGrowler(options.config),
    errors: options.errors,
    config: options.config
  };

  if (options.errors.length) {
    errorReporter.reportErrors(errorOptions);
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
