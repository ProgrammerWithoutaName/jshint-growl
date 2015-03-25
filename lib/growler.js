'use strict';

var growly, util;

growly = require('growly');
util = require('util');

var failedRegistrationError  = 'No running version of GNTP found.\n' +
                              'Make sure the Growl service is installed and running.\n' +
                              'For more information see https://github.com/theabraham/growly.';

var defaultPort = 23053;

function registerGrowly(config) {
  growly.register('JSHint', '', [], function(error) {
    if (error) {
      console.log(failedRegistrationError);
    } else if (config.host) {
      growly.setHost(config.host, config.port || defaultPort);
    }
  });
}

// we can modify the text
function buildNotificationOptions(options) {
  return {
    icon: options.baseType.icon,
    title: util.format(options.baseType.title, options.definition.title),
    dispname: util.format(options.baseType.dispname, options.definition.dispname),
    sticky: true
  };
}

function Growler(config) {
  registerGrowly(config);
  this.notificationTypes = {};
}

Growler.prototype.addNotificationType = function(options) {
  this.notificationTypes[options.name] = options.typeDefinition;
};

Growler.prototype.notify = function(options) {
  var notificationOptions = buildNotificationOptions({
    baseType: this.notificationTypes[options.type],
    definition: options.typeDefinition
  });

  growly.notify(options.typeDefinition.message, notificationOptions);
};

module.exports = Growler;
