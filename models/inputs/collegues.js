"use strict;";

var colleguesSchema = new SimpleSchema([
    DefaultSchema.ownedUnique, {
        'personne': {
            type: Array,
            defaultValue: [],
            optional: true,
            autoform: {
                label: function(){ return getTxt("collegues", "label")},
                type: "universe-select",
                afFieldInput: {
                    create: false,
                    optionsMethod: 'getLdapPerson',
                    multiple: true,
                    closeAfterSelect: true,
                    hideSelected: true,
                    uniPlaceholder: function(){ return getTxt("collegues", "placeholder")},
                },
            },
        },
        'personne.$': {
            optional: true,
            type: String,
        }
    }
]);


InputTypes.addInputType('collegues', colleguesSchema);
