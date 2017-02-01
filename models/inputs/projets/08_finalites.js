var projet_finaliteSchema = finaliteSchema


InputTypes.addInputType('projet_finalites',
    new SimpleSchema([
        DefaultSchema.owned,
        projet_finaliteSchema, {
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
)
