'use strict';
var growlSummaryReports, growlErrorReports;

growlErrorReports = require('./growlErrorReports');
growlSummaryReports = require('./growlSummaryReports');

function reportIndividualErrors(options) {
  options.errors.forEach(function(result) {
    var errorOptions = {
      error: result.error,
      file: result.file,
      basePath: options.config.basePath,
      growler: options.growler
    };

    if ((result.error.code && result.error.code[0] === 'E')) {
      growlErrorReports.reportError(errorOptions);
    } else {
      growlErrorReports.reportWarning(errorOptions);
    }
  });
}

function reportGroupErrors(options) {

  var errorSummary = {
    growler: options.growler,
    file: options.errors[0].file,
    basePath: options.config.basePath,
    errorCount: 0,
    warningCount: 0
  };

  options.errors.forEach(function(result) {
    if ((result.error.code && result.error.code[0] === 'E')) {
      errorSummary.errorCount += 1;
    } else {
      errorSummary.warningCount += 1;
    }
  });

  growlSummaryReports.reportSummary(errorSummary);
}


function reportErrors(options) {
  var maxErrorCount = 5;

  if(options.errors.length > maxErrorCount) {
    reportGroupErrors(options);
  } else {
    reportIndividualErrors(options);
  }
}

module.exports = {
  reportErrors: reportErrors
};