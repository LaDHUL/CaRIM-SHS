/* global AutoForm SimpleSchema */
Template.quickForm_carim.onCreated(function() {
	var template = this;
	if (template.data.hasOwnProperty("atts") && template.data.atts.hasOwnProperty("buttonColor") && template.data.atts.buttonColor !== undefined) {
		template.buttonColor = template.data.atts.buttonColor;
	} else {
		template.buttonColor = new ReactiveVar("btn btn-block btn-default");
	}
});
Template.quickForm_carim.helpers({
	qfAutoFormCarim: function() {
		return Template.instance()
			.data;
	},
	fieldGroupLabel: function() {
		var name = this.name;
		// if field group name is of the form XY_abcde where "XY" is a number, remove prefix
		if (!isNaN(parseInt(name.substr(0, 2), 10)) && name.charAt(2) === "_") {
			name = name.substr(3);
		}
		// if SimpleSchema.defaultLabel is defined, use it
		if (typeof SimpleSchema.defaultLabel === "function") {
			return SimpleSchema.defaultLabel(name);
		} else {
			// else, just capitalise name
			return name.charAt(0)
				.toUpperCase() + name.slice(1);
		}
	},
	quickFieldsAtts: function() {
		// These are the quickForm attributes that we want to forward to
		// the afQuickFields component.
		return _.pick(this.atts, 'fields', 'id-prefix', 'input-col-class', 'label-class');
	},
	disableButton: function() {
		var qfAtts = this.atts;
		var atts = {};
		if (typeof qfAtts.buttonClasses === 'string') {
			atts['class'] = qfAtts.buttonClasses;
		} else {
			atts['class'] = 'btn btn-primary';
		}
		return atts;
	},
	getName: function() {
		return AutoForm.getFormId();
	},
	renderButton: function() {
		return !this.atts.hasOwnProperty("autosave")
	},
	buttonC: function() {
		return Template.instance()
			.buttonColor.get();
	}
});
Template.quickForm_carim.events({
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
});
