var projet_logicielSchema = new SimpleSchema([
    logicielSchema, {
        cree: {
            type: Boolean,
            defaultValue: false,
            label: function(){ return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(), "cree")},
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
    }
])

InputTypes.addInputType('projet_logiciels',
    new SimpleSchema([
        DefaultSchema.owned, projet_logicielSchema
    ])
)
