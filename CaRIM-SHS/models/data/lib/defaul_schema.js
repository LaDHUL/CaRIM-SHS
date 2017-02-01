DefaultSchema = {};


DefaultSchema.base = new SimpleSchema({
    type: {
        type: String,
    },
    createdAt: {
        type: Date,
        denyUpdate: true,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: new Date()
                };
            } else {
                this.unset();
            }
        },
        autoform: {
            omit: true,
            afFieldInput: {
                type: "hidden"
            },
            afFormGroup: {
                label: false
            }
        }
    },
    updatedAt: {
        type: Date,

        optional: true,
        autoValue: function () {
            if (this.isUpdate) {
                return new Date();
            }
        },
        denyInsert: true,
        autoform: {
            omit: true,
            afFieldInput: {
                type: "hidden"
            },
            afFormGroup: {
                label: false
            }
        }
    }
});

DefaultSchema.userCreated = new SimpleSchema({
    createdBy: {
        type: String,
        denyUpdate: true,
        autoValue: function () {
            var user;
            if (Meteor.isServer) {
                user = this.userId || 'data-admin';
            } else if (Meteor.isClient) {
                user = this.userId;
            }
            if (this.isInsert) {
                return user;
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: user
                };
            } else {
                this.unset();
            }
        },
        autoform: {
            omit: true,
            afFieldInput: {
                type: "hidden"
            },
            afFormGroup: {
                label: false
            }
        }
    },
    modifiedBy: {
        type: String,
        optional: true,
        autoValue: function () {
            var user;
            if (Meteor.isServer) {
                user = this.userId || 'data-admin';
            } else if (Meteor.isClient) {
                user = this.userId;
            }
            if (this.isUpdate) {
                return user;
            }
        },
        denyInsert: true,
        autoform: {
            omit: true,
            afFieldInput: {
                type: "hidden"
            },
            afFormGroup: {
                label: false
            }
        }
    }
});

var typeSchema = new SimpleSchema({
    type: {
        type: String,
        autoform: {
            omit: true,
            afFieldInput: {
                type: "hidden"
            },
            afFormGroup: {
                label: false
            }
        }
    }
});

DefaultSchema.owned = new SimpleSchema([
    typeSchema,
    DefaultSchema.base, {
        'owner': {
            type: String,
            index: true,
            denyUpdate: true,
            autoValue: function () {
                if (Meteor.isClient) {
                    if (this.isInsert) {
                        return this.userId;
                    } else if (this.isUpsert) {
                        return {
                            $setOnInsert: this.userId
                        };
                    } else {
                        this.unset();
                    }
                } else if (Meteor.isServer) {
                    if (this.isInsert) {
                        return this.value || 'data-admin';
                    }
                }
            },
            autoform: {
                omit: true,
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

DefaultSchema.ownedUnique = new SimpleSchema([
    typeSchema,
    DefaultSchema.base, {
        'owner': {
            type: String,
            unique: true,
            index: true,
            denyUpdate: true,
            autoValue: function () {
                if (Meteor.isClient) {
                    if (this.isInsert) {
                        return this.userId;
                    } else if (this.isUpsert) {
                        return {
                            $setOnInsert: this.userId
                        };
                    } else {
                        this.unset();
                    }
                } else if (Meteor.isServer) {
                    if (this.isInsert) {
                        return this.value || 'data-admin';
                    }
                }
            },
            autoform: {
                omit: true,
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
