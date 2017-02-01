if (Meteor.isClient) {
    Session.set("jsonData", Fake.user());
    Template.hello.events({
        'click .btn-update-json': function () {
            Session.set("jsonData", Fake.user());
        }
    });
    Template.hello.helpers({
        jsonData: function () {
            return Session.get("jsonData");
        },

        options: function () {
            return {
                collapsed: false
            };
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
