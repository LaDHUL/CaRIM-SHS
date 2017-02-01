"use strict;";

objetSchema = new SimpleSchema({
    value: {
        type: String,
        dataCollection: "objets",
        autoform: {
            type: "universe-select",
            label: function(){ return Meteor.isServer || getLabel(AutoForm.getCurrentDataForForm(), "objets")},
            options: function () {
                return Data.objets.find({}, {
                    filter: {
                        name: 1
                    },
                    sort: {
                        name: 1
                    }
                }).map(function (doc) {
                    return {
                        label: doc.name,
                        value: doc._id
                    };
                });
            },
            afFieldInput: {
                closeAfterSelect: true,
                hideSelected: true,
                
                uniPlaceholder: function(){ return Meteor.isServer || getPlaceholder(AutoForm.getCurrentDataForForm(), "objets")}
            },
        }
    }
});
