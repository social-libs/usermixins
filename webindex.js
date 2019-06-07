function createWebMixinsLib (execlib) {
  return {
    methoddescriptors: {
      user: require('./methoddescriptors/user')
    }
  };
}

module.exports = createWebMixinsLib;
