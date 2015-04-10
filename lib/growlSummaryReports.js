'use strict';

var util = require('util');

function getRelativePath(file, basePath) {
    return file.replace(basePath,'');
}

function getErrorText(options) {
    return util.format("%d Errors, %d Warnings", options.errorCount, options.warningCount);
}

function buildMessageText(options) {
    return util.format("%d Errors \n%d Warnings", options.errorCount, options.warningCount);
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
