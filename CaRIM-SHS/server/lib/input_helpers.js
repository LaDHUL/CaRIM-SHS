Meteor.methods({
    add: function(coll, value) {
        check(coll, String)
        check(value, String)
        var datadoc = Data[coll].findOne({_id: val}, {fields: {_id:1}});
        if (datadoc){
            return datadoc._id
        } else {
            return Data[coll].insert({name: value, createdAt: new Date()});
        }

    },
    addLogiciel: function(label, value) {
        check(label, String);
        check(value, String);
        var id = Data.logiciels.findOne({name: label})
        if (id) {
            return id._id;
        } else {
            return Data.logiciels.insert({name: label, createdAt: new Date()})
        }
    },
});
