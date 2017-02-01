Object.keys(Inputs).forEach(function (key) {
    if (Meteor.isServer) {
        Inputs[key].allow({
            insert: function () {
                return true;
            },
            update: function () {
                return true;
            },
            remove: function () {
                return true;
            }
        });
    }
    if (Meteor.isClient) {
        Inputs[key].allow({
            insert: function (userId, doc) {
                // the user must be logged in, and the document must be owned by the user
                return (userId && doc.owner === userId);
            },
            update: function (userId, doc, fields, modifier) {
                // can only change your own documents
                return doc.owner === userId;
            },
            remove: function (userId, doc) {
                // can only remove your own documents
                return doc.owner === userId;
            },
            fetch: ['owner']
        });
        Inputs[key].deny({
            update: function (userId, doc, fields, modifier) {
                // can't change owners
                return _.contains(fields, 'owner');
            },
            remove: function (userId, doc) {
                // can't remove locked documents
                return doc.locked;
            },
            fetch: ['locked'] // no need to fetch 'owner'
        });
    }
});
