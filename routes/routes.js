"use strict;";

FlowRouter.notFound = {
  action: function() {
    redirect('/');
  }
};

FlowRouter.route('/', {
  name: 'accueil',
  action: function(params, queryParams) {
    BlazeLayout.render('formLayout', {
      header: 'header',
      menu: 'menu',
      content: 'pages',
      footer: 'footer'
    });
  }
});

FlowRouter.route('/formulaire', {
  name: 'formulaire',
  action: function(params, queryParams) {
    BlazeLayout.render('formLayout', {
      header: 'header',
      menu: 'menu',
      content: 'pages',
      form: 'formulaire',
      footer: 'footer'
    });
  }
});

FlowRouter.route('/le-projet', {
  name: 'le-projet',
  action: function(params, queryParams) {
    BlazeLayout.render('formLayout', {
      header: 'header',
      menu: 'menu',
      content: 'pages',
      footer: 'footer'
    });
  }
});

FlowRouter.route('/en-savoir-plus', {
  name: 'en-savoir-plus',
  action: function(params, queryParams) {
    BlazeLayout.render('formLayout', {
      header: 'header',
      menu: 'menu',
      content: 'pages',
      footer: 'footer'
    });
  }
});

FlowRouter.route('/finalites', {
  name: 'finalites',
  action: function(params, queryParams) {
    BlazeLayout.render('basicLayout', {
      content: 'showData',
      footer: 'footer'
    });
  }
});

FlowRouter.route('/domaines', {
  name: 'domaines',
  action: function(params, queryParams) {
    BlazeLayout.render('basicLayout', {
      content: 'showData',
      footer: 'footer'
    });
  }
});
