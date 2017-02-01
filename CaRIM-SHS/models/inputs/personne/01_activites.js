var personne_activitesSchema = new SimpleSchema({
    'activites': {
        type: Array,
        autoValue: function () {
            if (!this.isSet) return ["r", "e"]
        },
        minCount: 1,
        autoform: {
            label: function(){ return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),"activites")},
            type: "select-checkbox-inline",
            options: function () {
                var options = false;
                var def = [{
                    label: "Recherche",
                    value: "r"
                }, {
                    label: "Enseignement",
                    value: "e"
                }, {
                    label: "Support",
                    value: "s"
                }];
                if (options) {
                    var i;
                    var res = [];
                    var filter = function (obj) {
                        return obj.value === options[i];
                    };
                    for (i = 0; i < options.length; i++) {
                        res.push(def.filter(filter)[0]);
                    }
                    return res;
                } else {
                    return def;
                }
            },
        },
    },
    'activites.$': {
        type: String,
    }
});


InputTypes.addInputType('personne_activites', new SimpleSchema([DefaultSchema.ownedUnique,
    personne_activitesSchema
]))
