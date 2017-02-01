var personne_uniteSchema = uniteSchema

InputTypes.addInputType('personne_unites', new SimpleSchema([
    DefaultSchema.owned,
    personne_uniteSchema,
]));
