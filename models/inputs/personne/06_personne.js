var personne_infoSchema = new SimpleSchema({
    'nom': {
        type: String,

        autoform: {
            label: function(){ return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),"nom")},
            afFieldInput: {
                placeholder: function(){ return Meteor.isServer ||  getPlaceholder(AutoForm.getCurrentDataForForm(),"nom")}
            },
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            }
        }
    },
    'prenom': {
        type: String,

        autoform: {
            label: function(){ return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),"prenom")},
            afFieldInput: {
                placeholder: function(){ return Meteor.isServer ||  getPlaceholder(AutoForm.getCurrentDataForForm(),"prenom")}
            },
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
        }
    },
    'naissence': {
        type: String,
        optional: true,

        autoform: {
            label: function(){ return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),"naissence")},
            type: "universe-select",
            options: function () {
                var year = (Math.floor((new Date()).getFullYear().valueOf() / 10) * 10) - 80;
                var years = Array.apply(0, Array(7)).map(function (x, y) {
                    var res = year + (y * 10);
                    return {
                        'label': res.toString() + "-" + (res + 9).toString(),
                        'value': res.toString() + "-" + (res + 9).toString()
                    };
                });
                return years;
            },
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
            afFieldInput: {
                class: 'col-sm-12',
                closeAfterSelect: true,
                hideSelected: true,
                uniPlaceholder: function(){ return Meteor.isServer ||  getPlaceholder(AutoForm.getCurrentDataForForm(),"naissence")}
            }
        }

    },
    'status': {
        type: String,
        autoform: {
            label: function(){ return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),'status')},
            afFormGroup: {
                'formgroup-class': 'col-sm-6'
            },
            afFieldInput: {
                uniPlaceholder: function(){ return Meteor.isServer ||  getPlaceholder(AutoForm.getCurrentDataForForm(),"status")}
            }
        }
    },
    'anonymat': {
        type: Boolean,
        defaultValue: false,
        autoform: {
            type: "boolean-radios",
            label: function(){ return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),"anonymat")},
            trueLabel: function () {
                return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),"anonymat2")
            },
            falseLabel: function () {
                return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),"anonymat1")
            },
            afFormGroup: {
                'formgroup-class': 'col-sm-12'
            },
        }
    },
});


InputTypes.addInputType('personne', new SimpleSchema([DefaultSchema.ownedUnique,
    personne_infoSchema
]))
