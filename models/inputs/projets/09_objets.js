var projet_objetSchema = objetSchema


InputTypes.addInputType('projet_objets',
    new SimpleSchema([
        DefaultSchema.owned, projet_objetSchema, {
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
