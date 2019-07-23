function createUserMixin (execlib) {
  'use strict';

  var lib = execlib.lib,
    qlib = lib.qlib;

  function UserServiceUserMixin () {
  }
  UserServiceUserMixin.prototype.destroy = function () {
  };

  UserServiceUserMixin.prototype.updateProfile = function (propname, propval, defer) {
    qlib.promise2defer(this.__service.updateProfile(propname, propval, defer));
  };
  UserServiceUserMixin.prototype.getUserProfile = function (username, defer) {
    qlib.promise2defer(this.__service.__hotel.getUserProfile(username), defer);
  };
  UserServiceUserMixin.prototype.getUserProfileNotifications = function (defer) {
    qlib.promise2defer(this.__service.socialDBOpsProfileUpdateDefer.promise, defer);
  };
  UserServiceUserMixin.prototype.updateNick = function (nick, defer) {
    qlib.promise2defer(this.__service.updateNick(nick), defer);
  };
  UserServiceUserMixin.prototype.updateLocation = function (browsergeoposition, defer) {
    qlib.promise2defer(this.__service.updateLocation(browsergeoposition), defer);
  };

  UserServiceUserMixin.addMethods = function (klass) {
    lib.inheritMethods(klass, UserServiceUserMixin
      ,'updateProfile'
      ,'getUserProfile'
      ,'updateNick'
      ,'updateLocation'
    );
  };

  UserServiceUserMixin.visiblefields = ['profile_picture', 'pictureUploadURL'];

  return UserServiceUserMixin;
}

module.exports = createUserMixin;
