"use strict;";
/* global
Data,
SimpleSchema,
DefaultSchemaOpts,
*/

DataTypeSchema.variable = new SimpleSchema([
  DefaultSchema.userCreated, {
    'name': {
      type: String,
      index: true,
      unique: true,
    },
    'alias': {
      type: [String],
      index: true,
      optional: true
    },
    'locked': {
      type: Boolean,
      defaultValue: false,
    }
  }
]);
