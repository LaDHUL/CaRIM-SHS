projets_questionSchema = new SimpleSchema({
    'question': {
        type: Boolean,
        index: true,
        defaultValue: false,
        autoform: {
            type: "boolean-radios",
            label: function () {
                return Meteor.isServer || getTxt("projets", "question")
            },
            trueLabel: 'Oui',
            falseLabel: 'Non',
            template: 'bootstrap3-inline',
        }
    },
});
var projetsSchema = new SimpleSchema([
    DefaultSchema.ownedUnique,
    projets_questionSchema
]);
InputTypes.addInputType('projets', projetsSchema)
