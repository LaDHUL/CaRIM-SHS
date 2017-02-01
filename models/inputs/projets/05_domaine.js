"use strict;";

var projet_domainesSchema = domaineSchema;

InputTypes.addInputType('projet_domaines',
    new SimpleSchema([
        DefaultSchema.owned,
        projet_domainesSchema, {
            projet: {
                type: String,
                autoform: {
                    omit: true,
                    afFieldInput: {
                        type: "hidden"
                    },
                    afFormGroup: {
                        label: false
                    }
                }
            }
        }
    ]));
