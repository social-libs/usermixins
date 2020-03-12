function createUserMixin (execlib) {
  'use strict';

  var lib = execlib.lib,
    qlib = lib.qlib;

  function UserServiceUserMixin () {
  }
  UserServiceUserMixin.prototype.destroy = function () {
  };

  UserServiceUserMixin.prototype.updateProfile = function (propname, propval, defer) {
    qlib.promise2defer(this.__service.updateProfile(propname, propval), defer);
  };
  UserServiceUserMixin.prototype.updateProfileFromHash = function (prophash, defer) {
    qlib.promise2defer(this.__service.updateProfileFromHash(prophash), defer);
  };
  UserServiceUserMixin.prototype.getUserProfile = function (username, defer) {
    qlib.promise2defer(this.__service.__hotel.getUserProfile(username), defer);
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
      ,'updateProfileFromHash'
      ,'getUserProfile'
      ,'updateNick'
      ,'updateLocation'
    );
  };

  UserServiceUserMixin.visiblefields = ['lastSocialProfileUpdate', 'profile_nick', 'profile_picture', 'profile_location', 'profile_allow_notifications', 'pictureUploadURL'];

  return UserServiceUserMixin;
}

module.exports = createUserMixin;
