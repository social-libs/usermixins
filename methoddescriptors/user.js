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
  getUserProfileNotifications: true,
  updateNick: [{
    name: 'Nick',
    type: 'string'
  }],
  updateLocation: [{
    name: 'GeoLocation',
    type: 'object'
  }]
};
