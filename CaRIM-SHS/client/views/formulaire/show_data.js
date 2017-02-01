  Template.showData.onCreated(function() {
  	this.subscribe('pages')
  	this.subscribe('data', FlowRouter.getRouteName())
  })
  Template.showData.helpers({
  	title: function() {
  		if (Template.instance()
  			.subscriptionsReady()) {
  			var dataType = FlowRouter.getRouteName();
  			return ("finalites" === dataType ? Textes.findOne({
  					name: "projet." + dataType + ".titre"
  				})
  				.value : Textes.findOne({
  					name: "personne." + dataType + ".titre"
  				})
  				.value) + ":"
  		}
  	},
  	jsonData: function() {
  		if (Template.instance()
  			.subscriptionsReady()) {
  			var dataType = FlowRouter.getRouteName();
  			var res;
  			if (dataType == "finalites") {
  				function getTreeData(type, rootId) {
  					function getChildren(id, type) {
  						return Data[type].find({
  								parent: id
  							}, {
  								fields: {
  									name: 1,
  									description: 1,
  									parentNames: 1,
  									isParent: 1,
  								}
  							})
  							.map(function(doc) {
  								delete doc.__proto__.toDisplay
  								doc.nom = doc.name;
  								delete doc.name;
  								doc.chemin = doc.parentNames;
  								delete doc.parentNames;
  								tmp = doc.description;
  								delete doc.description;
  								doc.description = tmp;
  								if (doc.isParent) doc["sous-finalités"] = getChildren(doc._id, type);
  								delete doc._id
  								delete doc.isParent
  								return doc
  							});
  					}
  					var tree = Data["finalites"].findOne({
  						_id: rootId
  					}, {
  						fields: {
  							name: 1,
  							description: 1,
  							name: 1,
  							isParent: 1
  						}
  					})
            tree.nom = tree.name
            delete tree.name;
            tmp = tree.description
            delete  tree.description
            tree.description = tmp
  					tree["sous-finalités"] = getChildren(rootId, type);
  					delete tree._id;
  					delete tree.completeName
  					delete tree.isParent
  					delete tree.__proto__.toDisplay
  					return tree;
  				}
  				rootId = Data["finalites"].findOne({
  						isRoot: true
  					}, {
  						fields: {
  							_id: 1
  						}
  					})
  					._id;
  				res = getTreeData('finalites', rootId);
  				if (res) return res;
  			} else if (dataType == "domaines") {
  				return Data["domaines"].find({
  						name: {
  							$ne: "Autre"
  						}
  					}, {
  						fields: {
  							name: 1,
  							classe: 1,
  							groupe: 1
  						},
  						sort: {
  							sort: 1
  						}
  					})
  					.map(function(doc) {
  						res = {}
  						res['nom'] = doc.name
  						if (doc.classe && doc.classe != doc.name) res['discipline'] = doc.classe
  						if (doc.groupe) res['sous-discipline'] = doc.groupe
  						return res
  					});
  			}
  		}
  	},
  	options: function() {
  		return {
  			recursive_collapser: true
  		}
  	}
  })
