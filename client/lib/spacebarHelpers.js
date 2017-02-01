"use strict;";
Template.registerHelper('constant', function (what) {
    return Meteor.App[what.toUpperCase()];
});
