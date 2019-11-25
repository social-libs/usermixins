function createUserServiceServiceMixin (execlib, usercgiapilib) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib,
    execSuite = execlib.execSuite,
    taskRegistry = execSuite.taskRegistry;

  function UserServiceServiceMixin (prophash) {
    if (!prophash.__hotel) {
      throw new lib.Error('INVALID_PROPERTY_HASH', 'UserServiceServiceMixin needs the __hotel property the property hash');
    }
    if (!prophash.__hotel.userprophash) {
      throw new lib.Error('INVALID_HOTEL', 'UserServiceServiceMixin needs the userprophash in the __hotel property of the property hash');
    }
    this.socialUserService_CGIServiceName = prophash.__hotel.userprophash.cgiservicename;
    if (!this.socialUserService_CGIServiceName) {
      throw new lib.Error('INVALID_CGI_SERVICE_NAME', 'UserServiceServiceMixin needs the cgiservicename property in the property hash __hotel');
    }
    this.socialUserService_UploadsDirServiceName = prophash.__hotel.userprophash.uploadsdirservicename;
    if (!this.socialUserService_UploadsDirServiceName) {
      throw new lib.Error('INVALID_CGI_SERVICE_NAME', 'UserServiceServiceMixin needs the uploadsdirservicename property in the property hash __hotel');
    }
    this.pictureUploadHandler = this.createProfilePictureUploadHandler('pictureUploadURL', 'picture');
    this.hotelLastSocialProfileUpdateFollowerTask = taskRegistry.run('readState', {
      state: this.__hotel.state,
      name: 'lastSocialProfileUpdate',
      cb: this.state.set.bind(this.state, 'lastSocialProfileUpdate')
    });
  }
  UserServiceServiceMixin.prototype.destroy = function () {
    if (this.hotelLastSocialProfileUpdateFollowerTask) {
      this.hotelLastSocialProfileUpdateFollowerTask.destroy();
    }
    this.hotelLastSocialProfileUpdateFollowerTask = null;
    if (this.pictureUploadHandler) {
      this.pictureUploadHandler.destroy();
    }
    this.pictureUploadHandler = null;
    this.socialUserService_UploadsDirServiceName = null;
    this.socialUserService_CGIServiceName = null;
  };

  UserServiceServiceMixin.prototype.createProfilePictureUploadHandler = function (urlstatename, picturename) {
    var picturestatename = 'profile_'+picturename,
      ret = new usercgiapilib.UploadUniqueHandler(
        this,
        this.socialUserService_CGIServiceName,
        this.socialUserService_UploadsDirServiceName,
        null,
        null,
        urlstatename,
        onPictureUploaded.bind(null, this, picturename)
      );
    ret.activate();
    return ret;
  };

  function onPictureUploaded (that, picturename, uploadeddata) {
    var statefieldname, picture, updatehash;
    if (!lib.isVal(uploadeddata) && uploadeddata.remotefilepath) {
      that = null;
      picturename = null;
      return;
    }
    if (!(that && that.destroyed)) {
      that = null;
      picturename = null;
      return;
    }
    statefieldname = 'profile_'+picturename;
    picture = uploadeddata.remotefilepath;
    that.updateProfile(picturename, picture).then(
      that.set.bind(that, statefieldname, picture)
    );
    that = null;
    picturename = null;
    picture = null;
  };

  UserServiceServiceMixin.prototype.updateProfile = function (propname, propval) {
    var prof = {};
    prof[propname] = propval;
    return this.__hotel.updateUserProfile(this.name, prof);
  };
  
  UserServiceServiceMixin.prototype.updateNick = function (nick) {
    return this.__hotel.updateUserProfile(this.name, {
      nick: nick
    });
  };
  
  UserServiceServiceMixin.prototype.updateLocation = function (browsergeoposition) {
    return this.__hotel.updateUserProfile(this.name, {
      location: {
        type: "Point",
        coordinates: [browsergeoposition.longitude, browsergeoposition.latitude]
      }
    });
  };
  
  UserServiceServiceMixin.addMethods = function (klass) {
    lib.inheritMethods(klass, UserServiceServiceMixin
      ,'createProfilePictureUploadHandler'
      ,'updateProfile'
      ,'updateNick'
      ,'updateLocation'
    );
  }

  return UserServiceServiceMixin;
}

module.exports = createUserServiceServiceMixin;

