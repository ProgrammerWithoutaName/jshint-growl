'use strict';

var util = require('util');

function getRelativePath(file, basePath) {
    return file.replace(basePath,'');
}

function getErrorCountText(errorCount) {
  if (errorCount < 1) {
    return "No Errors";
  }
  if(errorCount === 1) {
    return "1 Error";
  }
  return util.format('%d Errors', errorCount);
}


function getWarningCountText(errorCount) {
  if (errorCount < 1) {
    return "No Warnings";
  }
  if(errorCount === 1) {
    return "1 Warning";
  }
  return util.format('%d Warnings', errorCount);
}

function getErrorText(options) {
    return util.format("%s, %s", getErrorCountText(options.errorCount), getWarningCountText(options.warningCount));
}

function buildMessageText(options) {
  return util.format("%s \n%s", getErrorCountText(options.errorCount), getWarningCountText(options.warningCount));
}

function reportSummary(options) {
    options.growler.notify({
        type: options.errorCount > 0 ? 'error' : 'warning',
        typeDefinition: {
            title: getRelativePath(options.file, options.basePath),
            dispname: getErrorText({ errorCount: options.errorCount, warningCount: options.warningCount}),
            message: buildMessageText({ errorCount: options.errorCount, warningCount: options.warningCount})
        }
    });
}

module.exports = {
    reportSummary: reportSummary
};
