var projet_unitesSchema = uniteSchema;


InputTypes.addInputType('projet_unites',
    new SimpleSchema([
        DefaultSchema.owned, projet_unitesSchema, {
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
);
