Template.heading.onCreated(function() {
	this.help = new ReactiveVar(false);
	this.comment = new ReactiveVar(false);
});
Template.heading.helpers({
	help: function() {
		return Template.instance()
			.help.get();
	},
	comment: function() {
		return Template.instance()
			.comment.get();
	},
	getId: function() {
		return "head_" + Template.instance()
			.data.type + (Template.instance()
				.data.id ? "_" + Template.instance()
				.data.id : "")
	},
	datatype: function(type){
			return type.split("_")[1]
	}
});
Template.heading.events({
	'click [data-action="help"]': function(event, template) {
		template.help.set(!Template.instance()
			.help.get());
	},
	'click [data-action="comment"]': function(event, template) {
		template.comment.set(!Template.instance()
			.comment.get());
	},
});
