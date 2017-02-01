"use strict;";
// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error("Meteor.App already defined? see client/lib/constants.js");
}

Meteor.App = {
  NAME: 'CaRIM-SHS',
  DESCRIPTION: "Cartographie globale des Ressources Informatiques Mutualisables à l'usage des SHS: outils et compétences à l'UNIL"
};
