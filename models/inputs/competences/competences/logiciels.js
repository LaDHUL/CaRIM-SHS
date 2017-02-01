var wNumb = require('wnumb');
var competence_niveauSchema = new SimpleSchema({
    'value': {
        type: String,
        dataCollection: "competence_logiciels",
        autoform: {
            afFieldInput: {
                type: "hidden"
            },
            afFormGroup: {
                label: false
            }
        }
    },
    'expertise': {
        type: Number,
        min: 0,
        max: 10,

        optional: true,
        index: true,
        autoform: {
            label: function(){ return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),"expertise")},
            type: "noUiSlider",
            behaviour: "tap-drag",
            connect: "lower",
            density: 10,
            noUiSliderOptions: {
                start: 5,
                format: wNumb({
                    decimals: 0,
                    encode: function (value) {
                        return parseInt(value);
                    }
                })
            },
            afFieldInput: {
                labelLeft: "débutant",
                labelRight: "développeur",
            }
        }
    },
    'frequence': {
        type: Number,
        min: 0,
        max: 10,
        optional: true,
        index: true,
        autoform: {
            label: function(){ return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),"frequence")},
            type: "noUiSlider",
            behaviour: "tap-drag",
            connect: "lower",
            density: 10,
            noUiSliderOptions: {
                start: 5,
                format: wNumb({
                    decimals: 0,
                    encode: function (value) {
                        return parseInt(value);
                    }
                })
            },
            afFieldInput: {
                labelLeft: "jamais",
                labelRight: "quotidien"
            }
        }
    },
});

InputTypes.addInputType('competence_niveaus', new SimpleSchema([
    DefaultSchema.owned,
    competence_niveauSchema
]));
Data.competence_niveaus = Inputs.competence_niveaus;


var competence_logicielSchema = logicielSchema;

InputTypes.addInputType('competence_logiciels', new SimpleSchema([
    DefaultSchema.owned,
    competence_logicielSchema, {
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
]));
