Template.treeForm.onCreated(function() {
	var template = this;
	template.rootFormId = template.data.id + "_root";
	template.childFormId = template.data.id + "_child";
	template.normFormId = template.data.id + "_norm";
	AutoForm.addHooks(template.data.id, {
		formToDoc: function(doc) {
			var item = Local[template.data.id].findOne({}, {
				fields: {
					value: 1
				}
			});
			if (item && item.hasOwnProperty("value")) {
				doc.value = item.value;
			} else {
				doc.value = "";
			}
			return doc;
		},
	});
	AutoForm.addHooks(template.data.id, {
		onSubmit: function(doc) {
			Local[template.data.id].remove({});
			var old = Inputs[template.data.id].findOne({
				owner: Meteor.userId(),
				value: doc.value
			});
			if (!old) {
				Inputs[template.data.id].insert(doc);
			}
			this.done();
			return false;
		}
	}, true);
	Local[template.data.id] = new Mongo.Collection(null);
	Local[template.data.id].attachSchema(new SimpleSchema({
		value: {
			type: String,
			autoform: {
				label: false,
				type: "selectize",
				template: "bootstrap3-inline",
				afFormGroup: {
					'formgroup-class': "float-left"
				},
				afFieldInput: {
					placeholder: function() {
						return getTxt(template.data.id, "placeholder")
					},
					class: "float-left",
				},
			}
		},
		parents: {
			type: String,
			autoValue: function() {
				var value = this.field('value')
					.value;
				var datatype = template.data.datatype;
				var res = Data[datatype].findOne({
					_id: value
				}, {
					fields: {
						parentNames: 1
					}
				});
				return res && res.hasOwnProperty('parentNames') ? res.parentNames : false;
			}
		},
		hasChildren: {
			type: Boolean,
			autoValue: function() {
				var value = this.field('value')
					.value;
				if (!value) return false
				var datatype = template.data.datatype;
				var res = Data[datatype].findOne({
					_id: value
				}, {
					fields: {
						isParent: 1
					}
				})
				if (res) return res.isParent;
				return false;
			}
		},
		parentNames: {
			type: String,
			autoValue: function() {
				var value = this.field('value')
					.value;
				var datatype = template.data.datatype;
				return Data[datatype].findOne({
						_id: value
					}, {
						fields: {
							parentNames: 1
						}
					})
					.parentNames;
			}
		},
		parentValue: {
			type: String,
			autoValue: function() {
				var value = this.field('value')
					.value;
				var datatype = template.data.datatype;
				var res = Data[datatype].findOne({
					_id: value
				}, {
					fields: {
						parent: 1
					}
				})
				var root = Data[datatype].findOne({
					isRoot: true
				}, {
					fields: {
						_id: 1
					}
				})
				return res.parent === root._id ? "" : res.parent
			}
		},
	}));
});
Template.treeForm.helpers({
	doc: function() {
		var template = Template.instance();
		AutoForm.resetForm(template.normFormId)
		AutoForm.resetForm(template.childFormId)
		return Local[template.data.id].findOne({}) || false
	},
	parents: function() {
		var template = Template.instance();
		var res = Local[template.data.id].findOne({})
		if (res) return res.parents;
		return "";
	},
	normalForm: function() {
		var doc = this;
		var template = Template.instance();
		var res = {
			id: template.normFormId,
			doc: Local[template.data.id].findOne({}),
			collection: "Local" + "." + template.data.id,
			type: "update",
			autosave: true,
			template: "bootstrap3-inline",
			resetOnSuccess: false,
			preserveForm: false,
			class: "form-inline"
		}
		return res;
	},
	rootForm: function() {
		var template = Template.instance();
		return {
			id: template.rootFormId,
			collection: "Local" + "." + template.data.id,
			type: "insert",
			autosave: true,
			template: "bootstrap3-inline",
			resetOnSuccess: false,
			preserveForm: false,
			class: "form-inline float-left "
		}
	},
	childForm: function() {
		var template = Template.instance();
		return {
			id: template.childFormId,
			collection: "Local" + "." + template.data.id,
			doc: Local[template.data.id].findOne({}),
			type: "update",
			autosave: true,
			template: "bootstrap3-inline",
			resetOnSuccess: false,
			preserveForm: false,
			class: "form-inline float-left "
		}
	},
	hasChildren: function() {
		var template = Template.instance();
		var res = Local[template.data.id].findOne({}, {
			fields: {
				hasChildren: 1
			}
		});
		if (res) return res.hasChildren;
		return false;
	},
	rootOpts: function() {
		var template = Template.instance();
		var datatype = template.data.datatype;
		var rootId = Data[datatype].findOne({
				isRoot: true
			}, {
				fields: {
					_id: 1
				}
			})
			._id;
		return Data[datatype].find({
				parent: rootId
			}, {
				fields: {
					name: 1
				}
			})
			.map(function(doc) {
				return {
					label: doc.name,
					value: doc._id
				};
			});
	},
	normOpts: function() {
		var value = this.value;
		var template = Template.instance();
		var datatype = template.data.datatype;
		var parent = Data[datatype].findOne({
				_id: value
			}, {
				fields: {
					parent: 1
				}
			})
			.parent;
		return Data[datatype].find({
				parent: parent
			})
			.map(function(doc) {
				return {
					label: doc.name,
					value: doc._id
				};
			});
	},
	childOpts: function() {
		var template = Template.instance();
		var datatype = template.data.datatype;
		return Data[datatype].find({
				parent: Local[template.data.id].findOne({})
					.value
			})
			.map(function(doc) {
				return {
					label: doc.name,
					value: doc._id
				};
			});
	},
	parentValue: function() {
		var template = Template.instance();
		var res = Local[template.data.id].findOne({});
		if (res) return res.parentValue;
		return false;
	},
	getName: function() {
		return Template.instance()
			.data.id;
	},
	showData: function() {
		var template = Template.instance();
		return this.showdata === template.data.id
	},
});
Template.treeForm.events({
	"click [data-action='remove/last']": function(event, template) {
		var obj = Local[template.data.id].findOne({});
		AutoForm.resetForm(template.normFormId)
		AutoForm.resetForm(template.childFormId)
		Local[template.data.id].update({
			_id: obj._id
		}, {
			$set: {
				value: obj.parentValue
			}
		});
		if (template.find("input")
			.value) {
			template.find('button[type=submit]')
				.classList = "btn btn-block btn-success"
		}
	},
	"change select": function(event, template) {
		template.find('button[type=submit]')
			.classList = "btn btn-block btn-success"
	},
	"reset select": function(event, template) {
		template.find('button[type=submit]')
			.classList = "btn btn-block btn-success"
	},
	"blur select": function(event, template) {
		template.find('button[type=submit]')
			.classList = "btn btn-block btn-success"
	},
	"mouseup button[type='submit']": function(event, template) {
		template.find('button[type=submit]')
			.classList = "btn btn-block btn-default"
	},
});
