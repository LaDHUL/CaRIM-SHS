DataTypes.addDataType('domaines', DataTypeSchema.fixed);
DataTypes.addDataType('domaine_motscles', DataTypeSchema.variable);
DataTypes.addDataType('finalites', DataTypeSchema.tree);
DataTypes.addDataType('logiciels', new SimpleSchema([
  DataTypeSchema.variable, {
    'uri': {
      type: String,
      regEx: SimpleSchema.RegEx.Url,
      optional: true,
      autoform: {
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
DataTypes.addDataType('projet_motscles', DataTypeSchema.variable);
DataTypes.addDataType('projet_financements', DataTypeSchema.variable);
DataTypes.addDataType('objets', DataTypeSchema.fixed);
DataTypes.addDataType('unites', DataTypeSchema.tree);


Object.keys(Data).forEach(function(dbName) {
  var db = Data[dbName];

  if (Meteor.isServer) {
    db.allow({
      insert: function() {
        return true;
      },
      update: function() {
        return true;
      },
      remove: function() {
        return true;
      }
    });
  }


  if (Meteor.isClient) {
    db.allow({
      insert: function(userId, doc) {
        // the user must be logged in, and the document must be owned by the user
        return (userId);
      },
      update: function(userId, doc, fields, modifier) {
        // can only change your own documents
        return false;
      },
      remove: function(userId, doc) {
        // can only remove your own documents
        return false;
      },
      fetch: ['owner']
    });
    db.deny({
      update: function(userId, doc, fields, modifier) {
        // can't change owners
        return _.contains(fields, 'owner', 'createdAt', 'createdBy');
      },
      remove: function(userId, doc) {
        // can't remove locked documents
        return doc.locked;
      },
      fetch: ['locked'] // no need to fetch 'owner'
    });
  }
});
