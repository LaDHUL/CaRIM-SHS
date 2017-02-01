if (Meteor.isServer) {
  Import.objets = function() {
    var count = Data['objets'].find({}).count()
    if (count === 0) {
      try {
        objets = JSON.parse(Assets.getText("data/objets.json"));

        _.each(objets, function(objet) {
          objet.createdAt = new Date();
          objet.type = 'objet';
          objet.name = objet.name.toString();
          Data['objets'].insert(objet);
        });

      } catch (err) {
        console.log("Error in objets.json\n", err);
      }
    }

  };
}
