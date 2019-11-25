(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var lR = ALLEX.execSuite.libRegistry;
lR.register('allex__bnf_userservicemixinslib', require('./webindex')(ALLEX));

},{"./webindex":3}],2:[function(require,module,exports){
module.exports = {
  updateProfile: [{
    name: 'Profile Property Name',
    type: 'string'
  },{
    name: 'Profile Property Value'
  }],
  getUserProfile: [{
    name: 'User Name',
    type: 'string'
  }],
  updateNick: [{
    name: 'Nick',
    type: 'string'
  }],
  updateLocation: [{
    name: 'GeoLocation',
    type: 'object'
  }]
};

},{}],3:[function(require,module,exports){
function createWebMixinsLib (execlib) {
  return {
    methoddescriptors: {
      user: require('./methoddescriptors/user')
    }
  };
}

module.exports = createWebMixinsLib;

},{"./methoddescriptors/user":2}]},{},[1]);
