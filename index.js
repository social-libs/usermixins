function createMixinsLib (execlib) {
  return execlib.lib.extend({
    mixins: {
      service: require('./servicecreator')(execlib),
      user: require('./usercreator')(execlib),
    }
  }, require('./webindex')(execlib));
}

module.exports = createMixinsLib;

