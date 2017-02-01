"use strict;";
/* global FlowRouter, Textes */
Template.pages.onCreated(function() {
	this.subscribe('pages');
	this.doc = new ReactiveDict(false);
});



Template.pages.helpers({
	doc: function() {
		var template = Template.instance();
		var doc = template.data.doc;
		var pageName = FlowRouter.getRouteName();
		if (!doc) {
			doc = template.doc.get(pageName);
		}
		if (!doc) {
			doc = Textes.findOne({
					name: pageName,
					type: "page"
				})
				.content;
			template.doc.set(pageName, doc);
		}
		if ( Meteor.userId() || pageName !== "formulaire")
			return doc;
	}
});
Template.pages.onRendered(function() {
	this.autorun(function() {
		FlowRouter.watchPathChange();
		_paq.push(['setDocumentTitle', FlowRouter.getRouteName()])
		_paq.push(['enableHeartBeatTimer', 30]);
		setTimeout(function() {
			if (Meteor.userId()) {
				$('html, body')
					.animate({
						scrollTop: $("#menu")
							.offset()
							.top
					}, 100);
			} else {
				$('html, body')
					.animate({
						scrollTop: $("#__blaze-root")
							.offset()
							.top
					}, 100);
			}
		}, 500);
	});
});
