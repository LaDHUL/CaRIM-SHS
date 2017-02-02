"use strict;";
/* global
require,
Import:true,
Textes,
Data,
*/
Import.pages = function() {
	var pageFiles = ["pages/accueil.yaml", "pages/formulaire.yaml", "pages/le-projet.yaml", "pages/en-savoir-plus.yaml", ];
	var pages = [];
	var obj;
	var yaml = require('js-yaml');
	_.each(pageFiles, function(pfile) {

		try {
			obj = yaml.safeLoad(Assets.getText(pfile));
			pages[obj.page] = obj;
		} catch (err) {
			console.log("Error in : " + pfile + " NOT UPDATED!\n", err);
		}
	});
	for (var name in pages) {
		if (pages[name]) {
			var iter = Textes.find({
				name: name,
				type: 'page'
			}, {
				fields: {
					_id: 1,
					name: 1
				}
			});
			if (iter.count() === 0) {
				Textes.insert({
					name: name,
					type: 'page',
					content: pages[name]
				}, {
					selector: {
						type: 'page'
					}
				});
			} else {
				Textes.update({
					_id: iter.fetch()[0]._id
				}, {
					$set: {
						name: name,
						content: pages[name],
						type: 'page'
					}
				});
			}
		}
	}
	return pages;
};
Import.labels = function() {
	var variablesFile = "pages/variables.yaml";
	var variables = {};
	var obj;
	var yaml = require('js-yaml');
	var flatten = require('flat');
	var keys;
	try {
		obj = yaml.safeLoad(Assets.getText(variablesFile));
		obj = flatten(obj);
		keys = Object.keys(obj);
		for (var i = 0; i < keys.length; i++) variables[keys[i]] = obj[keys[i]];
	} catch (err) {
		console.log("Error in : " + variablesFile + " NOT UPDATED!\n", err.message);
		return variables;
	}
	for (var name in variables) {
		if (variables[name] !== undefined) {
			var iter = Textes.find({
				name: name,
				type: 'label'
			}, {
				fields: {
					_id: 1,
					name: 1
				}
			});
			if (iter.count() === 0) {
				Textes.insert({
					name: name,
					value: variables[name],
					type: 'label'
				}, {
					selector: {
						type: 'label'
					}
				});
			} else {
				Textes.update({
					_id: iter.fetch()[0]._id
				}, {
					$set: {
						name: name,
						value: variables[name],
						type: 'label'
					}
				});
			}
		}
	}
};
Meteor.startup(function() {
	Object.keys(Import)
		.forEach(function(datatype) {
			console.log("Import", datatype);
			Import[datatype]();
		});
	console.log("Server Ready!")
});
