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
      throw new lib.Error('INVALID_CGI_SERVICE_NAME', 'UserServiceServiceMixin needs the uploadsdirservicename property in the '+this.constructor.name+' prototype');
    }
    if (!this.profilePictureImageSizes) {
      throw new lib.Error('INVALID_PROFILE_PICTURE_IMAGE_SIZES', 'UserServiceServiceMixin needs the profilePictureImageSizes property in the '+this.constructor.name+' prototype');
    }
    this.pictureUploadHandler = this.createProfilePictureUploadHandler('pictureUploadURL', 'picture', this.profilePictureImageSizes);
    this.hotelLastSocialProfileUpdateFollowerTask = taskRegistry.run('readState', {
      state: this.__hotel.state,
      name: 'lastSocialProfileUpdate',
      cb: onHotelLastSocialProfileUpdate.bind(null, this)
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

  UserServiceServiceMixin.prototype.createProfilePictureUploadHandler = function (urlstatename, picturename, imagesizes) {
    var ret = new usercgiapilib.UploadImageHandler(
        this,
        this.socialUserService_CGIServiceName,
        this.socialUserService_UploadsDirServiceName,
        null,
        null,
        imagesizes,
        urlstatename,
        onPictureUploaded.bind(null, this, picturename)
      );
    ret.activate();
    return ret;
  };

  UserServiceServiceMixin.prototype.createProfilePictureArrayUploadHandler = function (urlstatename, picturename, imagesizes) {
    var ret = new usercgiapilib.UploadImageArrayElementHandler(
        this,
        this.socialUserService_CGIServiceName,
        this.socialUserService_UploadsDirServiceName,
        null,
        null,
        imagesizes,
        urlstatename,
        onPictureArrayElementUploaded.bind(null, this, picturename)
      );
    ret.activate();
    return ret;
  };

  UserServiceServiceMixin.prototype.updateProfile = function (propname, propval) {
    var prof = {};
    prof[propname] = propval;
    return this.__hotel.updateUserProfile(this.name, prof);
  };
  
  UserServiceServiceMixin.prototype.updateProfileFromHash = function (prophash) {
    return this.__hotel.updateUserProfileFromHash(this.name, prophash);
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
      ,'createProfilePictureArrayUploadHandler'
      ,'updateProfile'
      ,'updateProfileFromHash'
      ,'updateNick'
      ,'updateLocation'
    );
  }


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
    that.updateProfile(picturename, picture); /*.then(
      that.set.bind(that, statefieldname, picture)
    );*/
    that = null;
    picturename = null;
    picture = null;
  }

  function onPictureArrayElementUploaded (that, picturename, uploadeddata) {
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
    that.updateProfile(picturename+'.'+uploadeddata.data.imageIndex, picture); /*.then(
      that.set.bind(that, statefieldname, picture)
    );*/
    that = null;
    picturename = null;
    picture = null;
  }

  function onHotelLastSocialProfileUpdate (that, update, prevupdate) {
    if (!(that && that.destroyed)) {
      that = null;
      return;
    }
    if (lib.isArray(update) && update.length===2 && update[0] === that.name) { //this update is on ME
      lib.traverseShallow(update[1], that.profileItemToState.bind(that));
    }
    that.state.set('lastSocialProfileUpdate', update);
  }


  return UserServiceServiceMixin;
}

module.exports = createUserServiceServiceMixin;

