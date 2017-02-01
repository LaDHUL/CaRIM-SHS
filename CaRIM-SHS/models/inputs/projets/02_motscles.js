var projet_motsclesSchema = new SimpleSchema({
    'motscles': {
        type: Array,
        autoform: {
            type: "universe-select",
            label: function(){ return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),"motscles")},
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
                
                uniPlaceholder: function(){ return Meteor.isServer ||  getPlaceholder(AutoForm.getCurrentDataForForm(),"motscles")},

            }

        }
    },
    'motscles.$': {
        type: String,
        dataCollection: "projet_motscles",
        autoform: {
            label: false,
            afFieldInput: {
                createMethod: 'addMotCleProjet',

            }
        }
    },
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
});



InputTypes.addInputType('projet_mots_cles',
    new SimpleSchema([DefaultSchema.owned, projet_motsclesSchema]));
