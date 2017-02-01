"use strict;";

Meteor.loginWithLdap = function(username, password, callback) {
    check(username, String);
    check(password, String);
    if ((/@/g.test(username))) {
        var i = username.indexOf("@");
        if ((/\./g.test(username.substring(0, i)))) {
            username = Capitalise(username.substring(0, i)) + username.slice(i).toLowerCase();
            login(username, password, callback);
        } else {
            username = username.substring(0, i).toLowerCase();
        }
    }
    var args = [username];

    Meteor.apply('getLdapEmail', args, {
        wait: true
    }, function(error, result) {
        if (result) {
            username = result;
            login(username, password, callback);
        }
        if (error) {
            throw new Meteor.Error(403, "Invalid username");
        }
    });
};

var login = function(username, password, callback) {
    if (Match.test(username, String) && username.length > 0) {
        var methodArguments = {
            username: username,
            pwd: password,
            ldap: true,
            data: LDAP.data()
        };
        Accounts.callLoginMethod({
            methodArguments: [methodArguments],
            userCallback: function() {
                FlowRouter.go('formulaire');
            }
        });
    } else {
        throw new Meteor.Error(403, "Invalid credentials: " + username);
    }
};
Accounts.onLogin(function() {

    Session.set('isActive', false);
    setTimeout(function() {
        Session.set('showLogin', false);
    }, 20);

    FlowRouter.path('formulaire');

});
