if (Meteor.isServer) {
  function reorderFinalites(inputFinalites) {
    function process(key, value) {
      var tmpobjs;
      var tmpobj;
      var tmp = _.clone(value);
      if (typeof(tmp) === "object" && !Array.isArray(tmp)) {
        delete tmp.children;
        return [tmp];
      } else if (Array.isArray(tmp)) {
        tmpobjs = [];
        _.each(tmp, function(obj) {
          tmpobj = _.clone(obj);
          delete tmpobj.children;
          tmpobjs.push(tmpobj);
        });
        return tmpobjs;
      }
    }

    function traverse(o, func) {
      res = [];
      for (var i in o) {
        if (o[i] !== undefined) {
          var tmp = func.apply(this, [i, o[i]]);
          if (tmp) res = res.concat(tmp);
          if (o[i] !== null && typeof(o[i]) === "object") {
            res = res.concat(traverse(o[i], func));
          }
        }
      }
      if (res) return res;
    }

    var tmpres = traverse(inputFinalites, process);
    var ids = [];
    var res = [];
    for (var i = 0; i < tmpres.length; i++) {
      var obj = _.clone(tmpres[i]);
      var id = parseInt(obj.Id);
      if (!(_.contains(ids, id))) {
        ids.push(id);
        res.push(obj);
      }
    }
    ids = [];
    return res;
  }


  Import.finalites = function() {
    var count = Data['finalites'].find({}).count()
    if (count === 0) {
      var rootfinalite = {
        name: "Finalites",
        description: "La racine de l'arbre",
        createdAt: new Date(),
        isRoot: true,
        isParent: true
      };
      var rootId = Data['finalites'].insert(rootfinalite);
      try {
        var finalites = JSON.parse(Assets.getText("data/finalites.json"));
        while (finalites.length > 0) {
          var orig = finalites.shift();
          var isParent = false;
          if(orig.hasOwnProperty("children")){
            finalites = finalites.concat(orig.children);
            delete orig.children;
            isParent = true;
          }
          var finalite = {
            'name': orig.Name || orig.Label_EN,
            'alias': orig.Name ? [orig.Label_EN] : [],
            'description': orig.Definition,
            'orig': orig,
            'createdAt': new Date(),
            'isParent': isParent,
          };
          finalite.name = finalite.name.toString();
          var pid;
          if(orig.Parent === "" || orig.Parent === undefined || orig.Parent === null){
            pid = rootId
          } else {
            parent = Data.finalites.findOne({
              'orig.Id': orig.Parent
            }, {fields: {_id: 1}});
            if(parent){
              pid = parent._id
            }
          }
          finalite.parent = pid;
          Data['finalites'].insert(finalite);
        }
      } catch (err) {
        console.log("Error in finalites.json\n", err);
      }
    }
  };
}
