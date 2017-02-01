activitesSchema = new SimpleSchema({
    'activites': {
        type: Array,
        defaultValue: [],
        minCount: 1,
        autoform: {
            label: function(){ return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),"activites")},
            type: "select-checkbox-inline",
            options: [{
                label: "Recherche",
                value: "r"
            }, {
                label: "Enseignement",
                value: "e"
            }, {
                label: "Support",
                value: "s"
            }],
        },
    },
    'activites.$': {
        type: String,
    }
});
