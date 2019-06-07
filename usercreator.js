function createUserMixin (execlib) {
  'use strict';

  var lib = execlib.lib,
    qlib = lib.qlib;

  function UserServiceUserMixin () {
  }
  UserServiceUserMixin.prototype.destroy = function () {
  };

  UserServiceUserMixin.prototype.updateLocation = function (browsergeoposition, defer) {
    qlib.promise2defer(this.__service.updateLocation(browsergeoposition), defer);
  };

  UserServiceUserMixin.addMethods = function (klass) {
    lib.inheritMethods(klass, UserServiceUserMixin
      ,'updateLocation'
    );
  };

  UserServiceUserMixin.visiblefields = ['profile_picture', 'pictureUploadURL'];

  return UserServiceUserMixin;
}

module.exports = createUserMixin;
