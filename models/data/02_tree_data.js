"use strict;";
/* global
Data,
SimpleSchema,
DefaultSchemaOpts,
*/
DataTypeSchema.tree = new SimpleSchema([
    DefaultSchema.base, {
        'name': {
            type: String,
            index: true,
            unique: false,
        },
        'alias': {
            type: [String],
            optional: true,
            index: false,
        },
        'completeName': {
            type: String,
            index: true,
            unique: true,
            optional: true,
            autoValue: function () {
                if (this.field('isRoot').isSet && this.field('isRoot').value)
                    return '';
                var item = Data[this.field('type').value].findOne({
                    _id: this.field('parent').value,
                });
                var items = [this.field('name').value];
                while (!item.isRoot) {
                    items.push(item.name);
                    item = Data[this.field('type').value].findOne({
                        _id: item.parent
                    });
                }
                items.reverse();
                return items.join(" > ")
            }
        },
        parentNames: {
            type: String,
            index: true,
            optional: true,
            autoValue: function () {
                if (this.field('isRoot').isSet && this.field('isRoot').value)
                    return '';
                var item = Data[this.field('type').value].findOne({
                    _id: this.field('parent').value,
                });
                var items = [];
                while (!item.isRoot) {
                    items.push(item.name);
                    item = Data[this.field('type').value].findOne({
                        _id: item.parent
                    });
                }
                if (items.length >0){
                    items.reverse();
                    return items.join(" > ")
                }
                return "";
        }
    },
        'description': {
            type: String,
            optional: true,
            autoform: {
                afFieldInput: {
                    type: "hidden"
                },
                afFormGroup: {
                    label: false
                }
            }
        },
        'parent': {
            type: String,
            index: true,
            unique: false,
            optional: true,
            custom: function () {
                if (!(this.field('isRoot').isSet && this.field('isRoot').value)) {
                    if (!this.operator) {
                        if (!this.isSet || this.value === null || this.value === "")
                            return "required";
                    } else if (this.isSet) {
                        if (this.operator === "$set" && this.value === null || this.value ===
                            "") return "required";
                        if (this.operator === "$unset") return "required";
                        if (this.operator === "$rename") return "required";
                    }
                }
            },
            autoform: {
                afFieldInput: {
                    type: "hidden"
                },
                afFormGroup: {
                    label: false
                }
            }
        },
        'isRoot': {
            type: Boolean,
            index: true,
            unique: true,
            optional: true,
            autoform: {
                afFieldInput: {
                    type: "hidden"
                },
                afFormGroup: {
                    label: false
                }
            }
        },
        'isParent': {
            type: Boolean,
            index: true,
            autoform: {
                afFieldInput: {
                    type: "hidden"
                },
                afFormGroup: {
                    label: false
                }
            }
        },
        'orig': {
            blackbox: true,
            type: Object,
            optional: true,
            autoform: {
                afFieldInput: {
                    type: "hidden"
                },
                afFormGroup: {
                    label: false
                }
            }
        },
        sort: {
          type: Number,
          optional: true,
          autoform: {
              afFieldInput: {
                  type: "hidden"
              },
              afFormGroup: {
                  label: false
              }
          }
        }
    }
]);
