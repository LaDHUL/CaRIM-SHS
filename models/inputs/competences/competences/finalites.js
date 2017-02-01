var finalite_activitesSchema = activitesSchema;

competence_finaliteSchema = finaliteSchema;

InputTypes.addInputType('competence_finalites', new SimpleSchema([
    DefaultSchema.owned,
    competence_finaliteSchema,
    finalite_activitesSchema, {
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
        },
    }
]));
