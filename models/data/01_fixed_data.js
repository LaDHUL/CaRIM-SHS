"use strict;";
/* global
Data,
SimpleSchema,
DefaultSchemaOpts,
*/
DataTypeSchema.fixed = new SimpleSchema([
	DefaultSchema.base, {
		'name': {
			type: String,
			index: true,
			unique: false,
		},
		'alias': {
			type: [String],
			index: true,
			optional: true
		},
		'groupe': {
			type: String,
			optional: true,
		},
		'classe': {
			type: String,
			optional: true,
		},
		'sort': {
			type: Number,
			optional: true,
		}
	}
]);
