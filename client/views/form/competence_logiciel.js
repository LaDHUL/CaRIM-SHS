var wNumb = require('wnumb');
Template.lc.onCreated(function() {
	var template = this;
	template.buttonColor = new ReactiveVar("btn btn-block btn-default");
	template.schema = new SimpleSchema([
		InputSchema.competence_niveaus,
		InputSchema.competence_logiciels.pick("value")
	]);
	Local.competence_niveaus = new Mongo.Collection(null);
	Local.competence_niveaus.attachSchema(template.schema);
	AutoForm.addHooks('competence_niveaus', {
		onSubmit: function(insertDoc, updateDoc, currentDoc) {
			var competenceId = template.data.competenceId;
			Inputs.competence_logiciels.insert({
				value: insertDoc.value,
				competence: competenceId
			})
			var niveau = Inputs.competence_niveaus.findOne({
				value: insertDoc.value
			}, {
				fields: {
					_id: 1
				}
			})
			if (niveau) {
				Inputs.competence_niveaus.update({
					_id: niveau._id
				}, {
					$set: insertDoc
				});
			} else {
				Inputs.competence_niveaus.insert(insertDoc);
			}
			this.done();
			return false;
		}
	}, true);
});
Template.lc.helpers({
	logicielIsSet: function() {
		return AutoForm.getFieldValue("value")
	},
	schema: function() {
		return Template.instance()
			.schema;
	},
	doc: function() {
		return Local.competence_niveaus.findOne({})
	},
	buttonC: function() {
		return Template.instance()
			.buttonColor.get()
	},
});
Template.lc.events({
	"change input": function(event, template) {
		template.buttonColor.set("btn btn-block btn-success")
	},
	"select input": function(event, template) {
		template.buttonColor.set("btn btn-block btn-success")
	},
	"blur input": function(event, template) {
		template.buttonColor.set("btn btn-block btn-success")
	},
	"mouseup button[type='submit']": function(event, template) {
		template.buttonColor.set("btn btn-block btn-default")
	},
})
