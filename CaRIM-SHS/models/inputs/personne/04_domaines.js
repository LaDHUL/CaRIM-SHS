var personne_activitesSchema = activitesSchema

personne_domainesSchema = new SimpleSchema([
    domaineSchema,
    personne_activitesSchema, {
        'activites': {
            minCount: 1,
            defaultValue: function () {
                return Inputs.personne_activites.findOne({
                    owner: Meteor.userId()
                }, {
                    fields: {
                        activites: 1
                    }
                }).activites || ["r", "e"];
            },
            autoform: {
                type: "select-checkbox-inline",
                label: function(){ return Meteor.isServer || getLabel(AutoForm.getCurrentDataForForm(), "domaines_activites")},
                options: function () {
                    var def = {
                        r: "Recherche",
                        e: "Enseignement",
                        s: "Support",
                    };
                    try {
                        return Inputs.personne_activites.findOne({
                            owner: Meteor.userId()
                        }, {
                            fields: {
                                activites: 1
                            }
                        }).activites.map(function (type) {
                            return {
                                label: def[type],
                                value: type
                            }
                        })
                    } catch (err) {
                        return [{
                            label: "Recherche",
                            value: "r"
                        }, {
                            label: "Enseignement",
                            value: "e"
                        }, {
                            label: "Support",
                            value: "s"
                        }];
                    }
                },
            },
        },
    }
])

InputTypes.addInputType('personne_domaines', new SimpleSchema([
    DefaultSchema.owned,
    personne_domainesSchema
]));
