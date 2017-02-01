"use strict;";
/* global
Data,
Textes,
*/

Meteor.publish('data', function(coll) {
    check(coll,  String)
    return Data[coll].find({}, {
        sort: {
            completeName: 1,
            name: 1
        },
        fields: {
            orig: 0
        }
    });
});

Meteor.publish('pages', function() {
    var data = Textes.find({}, {reactive: false});
    return data;
});
