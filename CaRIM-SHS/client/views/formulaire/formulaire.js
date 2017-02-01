"use strict;";
Template.formulaire.onCreated(function() {
	if (!Meteor.userId()) FlowRouter.go('/')
	var template = this;
	template.showData = new ReactiveVar();
	template.done = new ReactiveDict();
	template.goTo = new ReactiveVar();
	Object.keys(Data)
	.forEach(function(dataType) {
		template.subscribe('data', dataType);
	});
	Object.keys(Inputs)
	.forEach(function(coll) {
		template.subscribe("form", coll);
		template.done.set(coll, false);
		AutoForm.addHooks(coll, {
			onSuccess: function(res, err) {
				if (res) {
					template.done.set(coll, true);
				}
			}
		});
	});
	template.currentCompetence = new ReactiveVar();
	template.currentProjet = new ReactiveVar();
});
Template.formulaire.onRendered(function() {
	AutoForm.addHooks("personne_domaines", {
		before: {
			insert: function(doc) {
				if (doc.motscles) {
					doc.motscles = doc.motscles.map(function(doc) {
						if (Data.domaine_motscles.find({
							_id: doc
						})
						.count() === 0) {
							return Data.domaine_motscles.insert({
								name: doc,
								createdAt: new Date(),
								createdBy: Meteor.userId()
							})
						} else {
							return doc
						}
					})
				}
				return doc
			}
		}
	});
	AutoForm.addHooks("projet_info", {
		before: {
			update: function(doc) {
				if (doc.$set && doc.$set.motscles) {
					doc.$set.motscles = doc.$set.motscles.map(function(doc) {
						if (Data.projet_motscles.find({
							_id: doc
						})
						.count() === 0) {
							return Data.projet_motscles.insert({
								name: doc,
								createdAt: new Date(),
								createdBy: Meteor.userId()
							})
						} else {
							return doc
						}
					})
				}
				return doc
			},
			insert: function(doc) {
				if (doc && doc.motscles) {
					doc.motscles = doc.motscles.map(function(doc) {
						if (Data.projet_motscles.find({
							_id: doc
						})
						.count() === 0) {
							return Data.projet_motscles.insert({
								name: doc,
								createdAt: new Date(),
								createdBy: Meteor.userId()
							})
						} else {
							return doc
						}
					})
				}
				return doc
			}
		}
	});
	AutoForm.addHooks("projet_financements", {
		before: {
			update: function(doc) {
				if (doc.$set && doc.$set.financements) {
					doc.$set.financements = doc.$set.financements.map(function(doc) {
						if (Data.projet_financements.find({
							_id: doc
						})
						.count() === 0) {
							return Data.projet_financements.insert({
								name: doc,
								createdAt: new Date(),
								createdBy: Meteor.userId()
							})
						} else {
							return doc
						}
					})
				}
				return doc
			},
			insert: function(doc) {
				if (doc && doc.financements) {
					doc.financements = doc.financements.map(function(doc) {
						if (Data.projet_financements.find({
							_id: doc
						})
						.count() === 0) {
							return Data.projet_financements.insert({
								name: doc,
								createdAt: new Date(),
								createdBy: Meteor.userId()
							})
						} else {
							return doc
						}
					})
				}
				return doc
			}
		}
	});
	AutoForm.addHooks("projets", {
		after: {
			insert: function(doc) {
				if (this.currentDoc.question && Inputs.projets_projet.find()
				.count() === 0) Inputs.projets_projet.insert({});
				if ((!this.currentDoc.question) && Inputs.projets_projet.find()
				.count() > 1) {
					var projetIds = Inputs.projets_projet.find({}, {
						fields: {
							_id: 1
						}
					})
					.map(function(projet) {
						return projet._id
					});
					projetIds.forEach(function(projetId) {
						Object.keys(Inputs)
						.filter(function(key) {
							return key.includes("projet_")
						})
						.forEach(function(key) {
							var id = Inputs[key].find({
								projet: projetId
							})
							.forEach(function(doc) {
								Inputs[key].remove({
									_id: doc._id
								})
							})
						});
						if (Inputs.projets_projet.find()
						.count() > 1) Inputs.projets_projet.remove(projetId)
					});
				}
			},
			update: function(doc) {
				if (this.currentDoc.question && Inputs.projets_projet.find()
				.count() === 0) Inputs.projets_projet.insert({});
				if ((!this.currentDoc.question) && Inputs.projets_projet.find()
				.count() > 1) {
					var projetIds = Inputs.projets_projet.find({}, {
						fields: {
							_id: 1
						}
					})
					.map(function(projet) {
						return projet._id
					});
					projetIds.forEach(function(projetId) {
						Object.keys(Inputs)
						.filter(function(key) {
							return key.includes("projet_")
						})
						.forEach(function(key) {
							var id = Inputs[key].find({
								projet: projetId
							})
							.forEach(function(doc) {
								Inputs[key].remove({
									_id: doc._id
								})
							})
						});
						if (Inputs.projets_projet.find()
						.count() > 1) Inputs.projets_projet.remove(projetId)
					});
				}
			}
		}
	});
});
Template.formulaire.onRendered(function() {
	var template = this;
	template.autorun(function() {
		var divId = template.goTo.get()
		setTimeout(function() {
			if (divId) {
				$('html, body')
				.animate({
					scrollTop: $(divId)
					.offset()
					.top
				}, 100);
			}
		}, 200);
	});
})
Template.formulaire.helpers({
	ready: function() {
		return (Meteor.userId() && Template.instance()
		.subscriptionsReady() && Inputs.personne.find({
			owner: Meteor.userId()
		})
		.count() > 0 && Inputs.personne_activites.find({
			owner: Meteor.userId()
		})
		.count() > 0 && Inputs.competence.find({
			owner: Meteor.userId()
		})
		.count() > 0 && Inputs.collegues.find({
			owner: Meteor.userId()
		})
		.count() > 0 && Inputs.competences_ordre.find({
			owner: Meteor.userId()
		})
		.count() > 0 && Inputs.projets.find({
			owner: Meteor.userId()
		})
		.count() > 0 && Inputs.projets_projet.find({
			owner: Meteor.userId()
		})
		.count() > 0);
	},
	isDone: function() {
		return Template.instance()
		.done.get(this.type);
	},
	remarques: function() {
		return Inputs.remarques.find({
			owner: Meteor.userId()
		})
		.fetch();
	},
	collegues: function() {
		return Inputs.collegues.findOne({});
	},
	personne_unites: function() {
		return Inputs.personne_unites.find({
			owner: Meteor.userId()
		})
		.fetch();
	},
	personne_activites: function() {
		return Inputs.personne_activites.findOne({
			owner: Meteor.userId()
		});
	},
	personne_domaines: function() {
		return Inputs.personne_domaines.find({
			owner: Meteor.userId()
		})
		.fetch();
	},
	personne: function() {
		return Inputs.personne.findOne({
			owner: Meteor.userId()
		});
	},
	competences_ordre: function() {
		return Inputs.competences_ordre.findOne({
			owner: Meteor.userId()
		});
	},
	competences: function() {
		return Inputs.competences.findOne({
			owner: Meteor.userId()
		});
	},
	competence: function() {
		var competenceId;
		if (Inputs.competence.find({
			owner: Meteor.userId()
		})
		.count() === 0) {
			competenceId = Inputs.competence.insert({
				owner: Meteor.userId()
			});
			Template.instance()
			.currentCompetence.set(competenceId);
			return [{
				_id: competenceId
			}];
		}
		else if (Inputs.competence.find({
			owner: Meteor.userId()
		})
		.count() === 1) {
			competenceId = Inputs.competence.findOne({
				owner: Meteor.userId()
			})
			._id;
			Template.instance()
			.currentCompetence.set(competenceId);
			return [{
				_id: competenceId
			}];
		} else {
			Inputs.competence.find({
				owner: Meteor.userId()
			}).forEach(function(doc){
				competenceId = doc._id
				if (Inputs.competence_objets.find({
					competence: competenceId
				}).count() + Inputs.competence_logiciels.find({
					competence: competenceId
				}).count() + Inputs.competence_finalites.find({
					competence: competenceId
				}).count() === 0){
					Template.instance()
					.currentCompetence.set(competenceId);
				}
			})
		}
		return Inputs.competence.find({
			owner: Meteor.userId()
		}, {
			fields: {
				_id: 1
			}
		})
		.fetch()
	},
	competence_objets: function() {
		var competenceId = this.competenceId
		return Inputs.competence_objets.find({
			competence: competenceId
		})
		.fetch();
	},
	competence_logiciels: function() {
		var competenceId = this.competenceId
		return Inputs.competence_logiciels.find({
			competence: competenceId
		})
		.fetch();
	},
	competence_finalites: function() {
		var competenceId = this.competenceId
		return Inputs.competence_finalites.find({
			competence: competenceId
		})
		.fetch();
	},
	competences_niveaus: function() {
		var logicielId = this._id
		return Inputs.competences_niveaus.findOne({
			logiclel: logicielId
		});
	},
	competenceIsSelected: function() {
		return this._id === Template.instance()
		.currentCompetence.get();
	},
	prepare_competence: function() {
		var competenceId = Template.instance()
		.currentCompetence.get();
		AutoForm.addHooks(['competence_objets', 'competence_logiciels', 'competence_finalites'], {
			formToDoc: function(doc) {
				doc.competence = competenceId;
				return doc
			}
		});
	},
	competences_ordre: function() {
		var competenceId = this._id.toString();
		var ordre = Inputs.competences_ordre.findOne({
			owner: Meteor.userId()
		}, {
			fields: {
				ordre: 1
			}
		})
		.ordre || ['logiciels', 'finalites', 'objets'];
		return ordre.map(function(type) {
			return {
				type: type,
				competenceId: competenceId
			}
		})
	},
	type_logiciel: function() {
		return this.type === "logiciels"
	},
	type_finalite: function() {
		return this.type === "finalites"
	},
	showCompetencesClose: function() {
		var test = Inputs.competence.find()
		.count() > 1;
		var competenceId;
		Inputs.competence.find()
		.forEach(function(competence) {
			competenceId = competence._id;
			test = test && (Inputs.competence_objets.find({
				competence: competenceId
			})
			.count() + Inputs.competence_logiciels.find({
				competence: competenceId
			})
			.count() + Inputs.competence_finalites.find({
				competence: competenceId
			})
			.count() > 0)
		});
		test = test && Template.instance()
		.currentCompetence.get()
		return test;
	},
	showCompetencesAdd: function() {
		var competenceId;

		var test = Inputs.competence.find()
		.count() > 0;
		Inputs.competence.find()
		.forEach(function(competence) {
			competenceId = competence._id;
			test = test && (Inputs.competence_objets.find({
				competence: competenceId
			})
			.count() + Inputs.competence_logiciels.find({
				competence: competenceId
			})
			.count() + Inputs.competence_finalites.find({
				competence: competenceId
			})
			.count() > 0)
		});
		return test;
	},
	projets: function() {
		var projets = Inputs.projets.findOne({
			owner: Meteor.userId()
		});
		return projets;
	},
	projets_projet: function() {
		var projetId;
		if (Inputs.projets_projet.find({
			owner: Meteor.userId()
		})
		.count() === 0) {
			projetId = Inputs.projets_projet.insert({
				owner: Meteor.userId()
			});
			Template.instance()
			.currentProjet.set(projetId);
			return [{
				_id: projetId
			}];
		}
		if (Inputs.projets_projet.find({
			owner: Meteor.userId()
		})
		.count() === 1) {
			projetId = Inputs.projets_projet.findOne({
				owner: Meteor.userId()
			})
			._id;
			Template.instance()
			.currentProjet.set(projetId);
			return [{
				_id: projetId
			}];
		}
		return Inputs.projets_projet.find({
			owner: Meteor.userId()
		}, {
			fields: {
				_id: 1
			}
		})
	},
	projet_info: function() {
		var projetId = this._id
		return Inputs.projet_info.findOne({
			projet: projetId
		});;
	},
	showIdFNS: function() {
		var fns = Data.projet_financements.findOne({
			name: "Fonds national suisse ( FNS )"
		});
		var projetId = this._id
		var res = Inputs.projet_info.findOne({
			owner: Meteor.userId(),
			projet: projetId
		}, {
			fields: {
				financements: 1
			}
		})
		if (res && res.hasOwnProperty('financements')) return (res.financements.indexOf(fns) >= 0) ? "" : "idFNS";
		return "idFNS"
	},
	projet_unites: function() {
		var projetId = this._id
		return Inputs.projet_unites.find({
			owner: Meteor.userId(),
			projet: projetId
		})
		.fetch();
	},
	projet_logiciels: function() {
		var projetId = this._id
		return Inputs.projet_logiciels.find({
			owner: Meteor.userId(),
			projet: projetId
		})
		.fetch();
	},
	projet_finalites: function() {
		var projetId = this._id
		return Inputs.projet_finalites.find({
			owner: Meteor.userId(),
			projet: projetId
		})
		.fetch();
	},
	projet_objets: function() {
		var projetId = this._id
		return Inputs.projet_objets.find({
			owner: Meteor.userId(),
			projet: projetId
		})
		.fetch();
	},
	projetIsSelected: function() {
		return this._id === Template.instance()
		.currentProjet.get();
	},
	prepare_projet: function() {
		var projetId = Template.instance()
		.currentProjet.get();
		AutoForm.addHooks(['projet_info', 'projet_unites', 'projet_logiciels', 'projet_finalites', 'projet_objets'], {
			formToDoc: function(doc) {
				doc.projet = projetId;
				return doc
			}
		});
	},
	collegues: function() {
		return Inputs.collegues.findOne({
			owner: Meteor.userId()
		});
	},
	InputSchema: function() {
		if (AutoForm.getCurrentDataForForm) {
			return InputSchema;
		}
	},
	showProjets: function() {
		var res = Inputs.projets.findOne({
			owner: Meteor.userId()
		}, {
			fields: {
				question: 1
			}
		})
		.question;
		return res && Inputs.projets_projet.find()
		.count() > 0;
	},
	showProjetsClose: function() {
		return Inputs.projet_info.find()
		.count() > 1;
	},
	showProjetsAdd: function() {
		return Inputs.projet_info.find()
		.count() > 0;
	},
	showdata: function() {
		return Template.instance()
		.showData.get()
	},
});
Template.formulaire.events({
	"click [data-action='showdata']": function(event, template) {
		var current = template.showData.get()
		if (current === this.type) {
			template.showData.set(false);
		} else {
			template.showData.set(this.type);
		}
	},
	"click [data-action='editcompetence']": function(event, template) {
		var id = this._id
		template.currentCompetence.set(id);
		template.goTo.set("#head_competence_" + id)
		Inputs.competence.find({
			owner: Meteor.userId(),
			_id: {$ne: id}
		}).forEach(function(doc){
			competenceId = doc._id
			if (Inputs.competence_objets.find({
				competence: competenceId
			}).count() + Inputs.competence_logiciels.find({
				competence: competenceId
			}).count() + Inputs.competence_finalites.find({
				competence: competenceId
			}).count() === 0){
					Inputs.competence.remove({_id: competenceId});
			}
		})
	},
	"click [data-action='addcompetence']": function(event, template) {
		var id = false;
		Inputs.competence.find({
			owner: Meteor.userId(),
		}).forEach(function(doc){
			competenceId = doc._id
			if (Inputs.competence_objets.find({
				competence: competenceId
			}).count() + Inputs.competence_logiciels.find({
				competence: competenceId
			}).count() + Inputs.competence_finalites.find({
				competence: competenceId
			}).count() === 0){
				if (!id){
					id = competenceId
				} else {
					Inputs.competence.remove({_id: competenceId});
				}
			}
		})

		if (!id){
			id = Inputs.competence.insert({
				owner: Meteor.userId()
			})
		}
		template.currentCompetence.set(id);
		template.goTo.set("#head_competence_" + id)
	},
	"click [data-action='closecompetence']": function(event, template) {
		template.currentCompetence.set(false);
		template.goTo.set("#head_competences")
	},
	"click [data-action='removecompetence']": function(event, template) {
		var competenceId = this._id
		Object.keys(Inputs)
		.filter(function(key) {
			return key.includes("competence_")
		})
		.forEach(function(key) {
			var id = Inputs[key].find({
				competence: competenceId
			})
			.forEach(function(doc) {
				Inputs[key].remove({
					_id: doc._id
				})
			})
		});
		if (Inputs.competence.find()
		.count() > 1) Inputs.competence.remove(competenceId)
		if (template.currentCompetence.get()){
			template.goTo.set("#head_competence_" + template.currentCompetence.get())
		} else {
			template.goTo.set("#head_competences")
		}
	},
	"click [data-action='editprojet']": function(event, template) {
		var id = this.projet
		template.currentProjet.set(id)
		template.goTo.set("#head_projet_" + id)
	},
	"click [data-action='closeprojet']": function(event, template) {
		template.currentProjet.set(false);
		template.goTo.set("#head_projets")
	},
	"click [data-action='addprojet']": function(event, template) {
		var id = Inputs.projets_projet.insert({
			owner: Meteor.userId()
		});
		template.currentProjet.set(id);
		template.goTo.set("#head_projet_" + id)
	},
	"click [data-action='removeprojet']": function(event, template) {
		var projetId = this.projet;
		Object.keys(Inputs)
		.filter(function(key) {
			return key.includes("projet_")
		})
		.forEach(function(key) {
			var id = Inputs[key].find({
				projet: projetId
			})
			.forEach(function(doc) {
				Inputs[key].remove({
					_id: doc._id
				})
			})
		});
		if (Inputs.projets_projet.find()
		.count() > 1) Inputs.projets_projet.remove(projetId)
		template.goTo.set("#head_projets")
	},
	"change div.projet_info input": function(event, template) {
		template.find("div.projet_info button[type=submit]")
		.classList = "btn btn-block btn-success"
	},
	"select div.projet_info input": function(event, template) {
		template.find("div.projet_info button[type=submit]")
		.classList = "btn btn-block btn-success"
	},
	"blur div.projet_info input": function(event, template) {
		template.find("div.projet_info button[type=submit]")
		.classList = "btn btn-block btn-success"
	},
	"mouseup div.projet_info button[type='submit']": function(event, template) {
		template.find("div.projet_info button[type=submit]")
		.classList = "btn btn-block btn-default"
	},
	"change div.projet_collaborateurs input": function(event, template) {
		template.find("div.projet_collaborateurs button[type=submit]")
		.classList = "btn btn-block btn-success"
	},
	"select div.projet_collaborateurs input": function(event, template) {
		template.find("div.projet_collaborateurs button[type=submit]")
		.classList = "btn btn-block btn-success"
	},
	"blur div.projet_collaborateurs input": function(event, template) {
		template.find("div.projet_collaborateurs button[type=submit]")
		.classList = "btn btn-block btn-success"
	},
	"mouseup div.projet_collaborateurs button[type='submit']": function(event, template) {
		template.find("div.projet_collaborateurs button[type=submit]")
		.classList = "btn btn-block btn-default"
	},
	"change div.projet_financements input": function(event, template) {
		template.find("div.projet_financements button[type=submit]")
		.classList = "btn btn-block btn-success"
	},
	"select div.projet_financements input": function(event, template) {
		template.find("div.projet_financements button[type=submit]")
		.classList = "btn btn-block btn-success"
	},
	"blur div.projet_financements input": function(event, template) {
		template.find("div.projet_financements button[type=submit]")
		.classList = "btn btn-block btn-success"
	},
	"mouseup div.projet_financements button[type='submit']": function(event, template) {
		template.find("div.projet_financements button[type=submit]")
		.classList = "btn btn-block btn-default"
	},
});;
