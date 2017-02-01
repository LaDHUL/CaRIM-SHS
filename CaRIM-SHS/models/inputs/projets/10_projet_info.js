var projet_activitesSchema = activitesSchema;

var projet_infoSchema = new SimpleSchema([
    projet_activitesSchema, {
        'nom': {
            type: String,
            index: true,
            autoform: {
                type: "text",
                label: function () {
                    return Meteor.isServer || getLabel(AutoForm.getCurrentDataForForm(), "nom")
                },
                afFormGroup: {
                    'formgroup-class': "col-xs-5"
                },
                afFieldInput: {
                    placeholder: function () {
                        return Meteor.isServer || getPlaceholder(AutoForm.getCurrentDataForForm(), "nom")
                    }
                }
            },

        },
        'debut': {
            type: SimpleSchema.Integer,
            optional: true,
            min: 1960,
            max: 2050,
            autoform: {
                label: function () {
                    return Meteor.isServer || getLabel(AutoForm.getCurrentDataForForm(), "duree.debut")
                },
                afFormGroup: {
                    'formgroup-class': "col-xs-2"
                },
                afFieldInput: {
                    placeholder: function () {
                        return Meteor.isServer || getPlaceholder(AutoForm.getCurrentDataForForm(), "duree.debut")
                    }
                }
            }
        },
        'fin': {
            type: SimpleSchema.Integer,
            optional: true,
            min: 1960,
            max: 2050,
            autoform: {
                label: function () {
                    return Meteor.isServer || getLabel(AutoForm.getCurrentDataForForm(), "duree.fin")
                },
                afFormGroup: {
                    'formgroup-class': "col-xs-2"
                },
                afFieldInput: {
                    placeholder: function () {
                        return Meteor.isServer || getPlaceholder(AutoForm.getCurrentDataForForm(), "duree.fin")
                    }
                }
            }
        },
        idFNS: {
            type: String,
            optional: true,
            autoform: {
                label: function () {
                    return Meteor.isServer || getLabel(AutoForm.getCurrentDataForForm(), "idFNS")
                },
                afFormGroup: {
                    'formgroup-class': "col-xs-3"
                },
                afFieldInput: {
                    placeholder: function () {
                        return Meteor.isServer || getPlaceholder(AutoForm.getCurrentDataForForm(), "idFNS")
                    }
                }
            }
        },
        'motscles': {
            type: Array,
            defaultValue: [],
            optional: true,
            dataCollection: 'projet_motscles',
            autoform: {
                type: "universe-select",
                label: function () {
                    return Meteor.isServer || getLabel(AutoForm.getCurrentDataForForm(), "motscles")
                },
                afFieldInput: {
                    create: true,
                    options: function () {
                        return Data.projet_motscles.find({}).map(
                            function (doc) {
                                return {
                                    label: doc.name,
                                    value: doc._id
                                };
                            }
                        );
                    },
                    multiple: true,
                    uniDisabled: false,
                    createSlug: false,
                    removeButton: false,
                    closeAfterSelect: true,
                    hideSelected: true,

                    uniPlaceholder: function () {
                        return Meteor.isServer || getPlaceholder(AutoForm.getCurrentDataForForm(), "motscles")
                    },
                },
                afFormGroup: {
                    'formgroup-class': "col-xs-12"
                },
            }
        },
        'motscles.$': {
            type: String,
            autoform: {
                label: false,
                afFieldInput: {
                    createMethod: 'addMotCleProjet',
                }
            }
        },
        'activites': {
            defaultValue: function () {
                return ["r"];
            },
            autoform: {
                label: function () {
                    return Meteor.isServer || getLabel(AutoForm.getCurrentDataForForm(), "activites")
                },
                type: "select-checkbox-inline",
                options: [{
                    label: "Recherche",
                    value: "r"
                }, {
                    label: "Enseignement",
                    value: "e"
                }, {
                    label: "Support",
                    value: "s"
                }],

            },
        },
        collaborateurs: {
            type: Array,
            defaultValue: [],
            optional: true,
            autoform: {
                label: function () {
                    return getTxt("collegues", "label")
                },
                type: "universe-select",
                afFieldInput: {
                    create: false,
                    optionsMethod: 'getLdapPerson',
                    multiple: true,
                    closeAfterSelect: true,
                    hideSelected: true,
                    uniPlaceholder: function () {
                        return getTxt("collegues", "placeholder")
                    },
                },
            },
        },
        'collaborateurs.$': {
            type: String,
            optional: true,
        },
        financements: {
            type: Array,
            defaultValue: [],
            optional: true,
            autoform: {
                type: "universe-select",
                label: function () {
                    return Meteor.isServer || getLabel(AutoForm.getCurrentDataForForm(), "financements")
                },
                create: true,
                options: function () {
                    return Data.projet_financements.find({}).map(
                        function (doc) {
                            return {
                                label: doc.name,
                                value: doc._id
                            };
                        }
                    );
                },
                multiple: true,
                uniDisabled: false,
                createSlug: false,
                removeButton: false,
                closeAfterSelect: true,
                hideSelected: true,

                uniPlaceholder: function () {
                    return Meteor.isServer || getPlaceholder(AutoForm.getCurrentDataForForm(), "financements")
                },
            }
        },
        'financements.$': {
            type: String,
            dataCollection: 'projet_financements',
        },
    }
]);

var projet_baseSchema = new SimpleSchema([
    DefaultSchema.owned,
    projet_infoSchema, , {
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
]);
InputTypes.addInputType('projet_info', projet_baseSchema)
