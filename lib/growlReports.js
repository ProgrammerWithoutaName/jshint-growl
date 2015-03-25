'use strict';


function reportError(options) {
  options.growler.notify({
    baseType: 'error',
    typeDefinition: {
      title: options.file,
      dispname: options.error.line,
      message: options.error.reason
    }
  });
}

function reportWarning(options) {
  options.growler.notify({
    baseType: 'warning',
    typeDefinition: {
      title: options.file,
      dispname: options.error.line,
      message: options.error.reason
    }
  });
}

function reportSuccess(growler) {
  growler.notify({
    baseType: 'error',
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
