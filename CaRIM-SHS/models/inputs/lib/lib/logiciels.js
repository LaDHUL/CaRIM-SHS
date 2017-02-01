"use strict;";
logicielSchema = new SimpleSchema({
    value: {
        type: String,
        dataCollection: "logiciels",
        autoform: {
            label: function(){ return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),"logiciels")},
            type: "universe-select",
            afFieldInput: {
                create: true,
                createOnBlur: false,
                createMethod: 'addLogiciel',
                options: function () {
                    return Data.logiciels.find({}, {
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
                closeAfterSelect: true,
                hideSelected: true,
                
                uniPlaceholder: function(){ return Meteor.isServer ||  getPlaceholder(AutoForm.getCurrentDataForForm(),"logiciels")}
            }
        }
    },
});
