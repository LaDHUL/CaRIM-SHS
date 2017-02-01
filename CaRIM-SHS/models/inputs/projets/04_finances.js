var projet_financementsSchema = new SimpleSchema({
    financements: {
        type: Array,
        dataCollection: "projet_financements",
        autoform: {
            label: function(){ return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),"financements")},
            type: "universe-select",
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
            
            uniPlaceholder: function(){ return Meteor.isServer ||  getPlaceholder(AutoForm.getCurrentDataForForm(),"financements")},

        }
    },
    'financements.$': {
        type: String,
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



InputTypes.addInputType('projet_financements',
    new SimpleSchema([
        DefaultSchema.owned, projet_financementsSchema
    ]))
