

Meteor.publish('form', function (coll) {
    check(coll, String)
    return Inputs[coll].find({
            owner: this.userId
        });
});
