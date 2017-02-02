function loadUser(user) {
  var userAlreadyExists = typeof Meteor.users.findOne({ username : user.username }) === 'object';

  if (!userAlreadyExists) {
    Accounts.createUser(user);
  }
}

var yaml = require('js-yaml');

Meteor.startup(function () {
  try {
  var users =  yaml.safeLoad(Assets.getText('users.yml'));

  for (key in users) if (users.hasOwnProperty(key)) {
    loadUser(users[key]);
  }
} catch (err) {
  console.log("No special users defined");
}
});
