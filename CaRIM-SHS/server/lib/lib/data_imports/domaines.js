if (Meteor.isServer) {
  Import.domaines = function() {
    var count = Data['domaines'].find({}).count();
    if (count === 0) {
      try {
      	var classes = [];
	      var groups = [];
        var disciplines = JSON.parse(Assets.getText("data/disciplines.json"));
        disciplines = new Set(disciplines);
        disciplines.forEach(function(objet) {
    	  if (objet.classe) classes.push({
    		  name: Capitalise(objet.classe),
      		classe: Capitalise(objet.classe),
    		  createdAt: new Date()
    	  });
    	  if (objet.groupe) groups.push({
    		      name:Capitalise(objet.groupe),
    		      classe: Capitalise(objet.classe),
              groupe:Capitalise(objet.groupe),
    	  	    createdAt: new Date()
    	 	 });
          objet.name = Capitalise(objet.name).toString();
          objet.classe = Capitalise(objet.classe).toString();
          objet.groupe = Capitalise(objet.groupe).toString();
          Data['domaines'].insert(objet);
        });
      } catch (err) {
        console.log("Error in disciplines.json\n", err);
      }
    }
  };

  Import.domaine_motscles = function() {
    try {
      var count = Data["domaine_motscles"].find({}).count()
      if (count === 0) {
        objets = JSON.parse(Assets.getText("data/domainesKeywords.json"));
        _.each(objets, function(objet) {
          objet.name = Capitalise(objet.name.toString());
          objet.createdAt = new Date();
          Data["domaine_motscles"].insert(objet);
        });
      }
    } catch (err) {
      console.log("Error in domainesKeywords.json\n", err);
    }
  };

}
