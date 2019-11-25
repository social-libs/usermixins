function createMixinsLib (execlib) {
  return execlib.loadDependencies('client', ['allex:usercgiapi:lib'], libCreator.bind(null, execlib));
}

function libCreator (execlib, usercgiapilib) {
  'use strict';

  return execlib.lib.extend({
    mixins: {
      service: require('./servicecreator')(execlib, usercgiapilib),
      user: require('./usercreator')(execlib),
    }
  }, require('./webindex')(execlib));
}


module.exports = createMixinsLib;

