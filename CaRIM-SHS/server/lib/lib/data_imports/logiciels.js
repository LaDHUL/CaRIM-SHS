if (Meteor.isServer) {


  Import.logiciels = function() {
    var count = Data['logiciels'].find({}).count();
    if (count === 0) {
      try {
        objets = JSON.parse(Assets.getText("data/logiciels.json"));
        _.each(objets, function(objet) {
          objet.createdAt = new Date();
          objet.type = 'logiciel';
          objet.name = objet.name.toString();
          Data['logiciels'].insert(objet);
        });

      } catch (err) {
        console.log("Error in logiciels.json\n", err);
      }
    }
  };
}
