Template.remarques.helpers({
    doc: function () {
        var self = Template.instance().data.toString();
        if (Template.instance().subscriptionsReady()) {
            var doc = Inputs.remarques.findOne({
                aProposDe: self
            }, {
                fields: {
                    remarques: 1,
                    field: 1
                }
            });
            if (!doc) {
                doc = {
                    aProposDe: self
                };
                doc._id = Inputs.remarques.insert(doc);
            }
            return Inputs.remarques.findOne({
                aProposDe: self
            });
        }
    },
});
