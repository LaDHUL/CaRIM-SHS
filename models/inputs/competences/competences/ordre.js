var competences_ordreSchema = new SimpleSchema({
    ordre: {
        type: Array,
        minCount: 3,
        maxCount: 3,
        defaultValue: [
            'logiciels',
            'finalites',
            'objets'
        ],
    },
    'ordre.$': {
        type: String
    },
});


InputTypes.addInputType('competences_ordre',
    new SimpleSchema([DefaultSchema.ownedUnique, competences_ordreSchema]));
