remarqueSchema = new SimpleSchema([
    DefaultSchema.owned, {
        'remarque': {
            type: String,
            optional: true,
            dataCollection: "remarques",
            autoform: {
                rows: 6,
                label:  function(){ return getTxt("remarques", "label")},
                afFieldInput: {
                    'input-col-class': "colxs-12",
                    placeholder:  function(){ return getTxt("remarques", "placeholder")},
                }
            }
        },
        'aProposDe': {
            type: String,
            optional: true,
            autoform: {
                afFieldInput: {
                    type: "hidden",
                },
                afFormGroup: {
                    label: false
                }
            }
        }
    }
]);

InputTypes.addInputType('remarques', remarqueSchema)
