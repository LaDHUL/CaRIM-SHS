var competence_objetSchema = objetSchema;

InputTypes.addInputType('competence_objets',
    new SimpleSchema([
        DefaultSchema.owned, competence_objetSchema, {
            competence: {
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
