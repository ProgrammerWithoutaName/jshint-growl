'use strict';

var path, mothership, packageName;

packageName = require('../package.json').name;
path = require('path');
mothership = require('mothership');

// these are the droids we are looking for...
function isMothership(packageJson) {
  console.log(packageName);
  console.log(packageJson.dependencies);
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

function getBasePath(response) {
  var options;
  options = response.pack[ packageName ];

  if (options && options.basePath) {
    return options.basePath;
  }

  return path.dirname(response.path);
}

function buildConfig(response) {
  var config, options;

  options = response.pack[ packageName ];

  config = getHost(options);
  config.basePath = getBasePath(response);

  return config;
}

module.exports = function(callback) {
  mothership(path.join(__dirname, '../'), isMothership, function(err, res) {
    var pack;

    if (err) {
      return console.error(err);
    }

    pack = res ? res.pack : { pack:{}};
    callback(buildConfig(pack));
  });
};
