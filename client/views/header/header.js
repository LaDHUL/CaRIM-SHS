Template.header.onCreated = function() {
	template = this;
	Session.set('isActive', !template.currentUser);
	Session.set('showLogin', !template.currentUser);
};
Template.header.onREndered = function() {
	template = this;
	setTimeout(function() {
		Session.set('isActive', !template.currentUser);
		Session.set('showLogin', !template.currentUser);
	}, (showLogin) ? 20 : 80);
};
Template.header.helpers({
	showLogin: function() {
		return (!Template.instance()
			.currentUser || Session.get('showLogin'));
	},
	isActive: function() {
		return (!Template.instance()
			.currentUser || Session.get('isActive')) ? 'active' : '';
	},
	animateClass: function() {
		return Session.get('isActive') ? 'fadeIn' : 'fadeOut';
	},
	iconClass: function() {
		return Meteor.user() ? 'fa fa-user fa-2' : 'fa fa-sign-in fa-2';
	},
	service: function() {
		return [{
			name: 'ldap'
		}];
	}
});
Template.header.events({
	'click #toggle-login': function(event, template) {
		var showLogin = Session.get('showLogin');
		Session.set('isActive', !Session.get('isActive'));
		setTimeout(function() {
			Session.set('showLogin', !Session.get('showLogin'));
		}, (showLogin) ? 20 : 80);
	},
	'click #logout': function(event, template) {
		Meteor.logout(function(err) {
			Session.set('isActive', true);
			Session.set('data', false);
			Object.keys(Session.keys)
				.forEach(function(key) {
					Session.set(key, undefined);
				});
			Session.keys = {}; // remove session keys
		});
		FlowRouter.go('/')
	}
});
Template.ldapLoginButtonsUNIL.helpers(_.extend(LDAP.formHelpers, {
	title: function() {
		return (this.title === undefined) ? 'Login' : this.title;
	},
	loggingIn: function() {
		return Meteor.loggingIn();
	}
}));
Template.ldapLoginButtonsUNIL.events({
	'submit form': function(evt) {
		// Because this is a form elememt, whereas the original "form" wasn't
		// we need to prevent the default behaviour of submitting the form
		evt.preventDefault();
	}
});
Template.ldapLoginButtonsUNIL.events(LDAP.formEvents);
// This is a reactive-var, so needs to be `set`
LDAP.customFormTemplate.set("ldapLoginButtonsUNIL");
AccountsTemplates.configure({
	defaultLayoutType: 'blaze', // Optional, the default is 'blaze'
	defaultTemplate: 'basicLayout',
	defaultLayout: 'basicLayout',
	defaultLayoutRegions: {
		header: 'header',
		menu: 'menu',
		footer: 'footer',
	},
	defaultContentRegion: 'content'
});
