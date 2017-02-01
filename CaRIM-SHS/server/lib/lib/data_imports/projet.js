if (Meteor.isServer) {
  Import.projet_financements = function() {
    var obj = {
      name: "Fonds national suisse ( FNS )",
    };
    var dbFNSname = Data['projet_financements'].findOne(obj);
    if (!dbFNSname) {
      Data['projet_financements'].insert(obj);
    }
  };
}
