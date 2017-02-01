"use strict;";
/* global Template, Textes, Data, Inputs, Form */
Meteor.startup(function () {
    Template.registerHelper("Textes", Textes);

    Template.registerHelper('getTxt', getTxt);
    Template.registerHelper("Data", Data);
    Template.registerHelper("Local", Local);

    Template.registerHelper("Inputs", Inputs);

     AutoForm.setDefaultTemplateForType('quickForm', 'carim');

});
