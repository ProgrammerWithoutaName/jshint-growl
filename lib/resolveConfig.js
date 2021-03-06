'use strict';

var path, mothership, packageName;

packageName = require('../package.json').name;
path = require('path');
mothership = require('mothership');

// these are the droids we are looking for...
function isMothership(packageJson) {
  return !!(packageJson.dependencies && packageJson.dependencies[packageName]);
}

function getHost(options) {
  var hostInformation = {};

  if (options && options.host) {
    hostInformation.host = options.host;
    hostInformation.port = options.port || 23053;
  }

  return hostInformation;
}

function getBasePath(response, defaultPath) {
  var options;
  options = response.pack[ packageName ];

  if (options && options.basePath) {
    return options.basePath;
  }

  return defaultPath;
}

function buildConfig(response, basePathDefault) {
  var config, options;

  options = response.pack[ packageName ];

  config = getHost(options);
  config.basePath = getBasePath(response, basePathDefault);

  return config;
}

module.exports = function(callback) {
  // assume parent
  var packageDir = path.resolve(__dirname,'../../../');

  mothership(packageDir, isMothership, function(err, res) {
    var pack;

    if (err) {
      return console.error(err);
    }

    pack = res ? res.pack : { pack:{}};
    callback(buildConfig(pack, packageDir));
  });
};
